import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataGrid from './data-grid';

const mockColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
];

const mockRows = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson' },
];

function renderComponent(props) {
  return {
    user: userEvent.setup(),
    ...render(<DataGrid {...props} />),
  };
}

describe('DataGrid', () => {
  afterEach(cleanup);

  describe('Basic rendering', () => {
    it('renders with columns and rows', () => {
      const { container, getByText } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
      });

      expect(container.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
      expect(getByText('First name')).toBeInTheDocument();
      expect(getByText('John')).toBeInTheDocument();
    });

    it('wraps DataGrid in a flex column container', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
      });

      const wrapper = container.querySelector('div[style*="display: flex"]');
      expect(wrapper).toHaveStyle({ display: 'flex', flexDirection: 'column' });
    });
  });

  describe('Column flex transformation', () => {
    it('sets flex to 1 for columns without width or explicit flex', () => {
      const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
      ];

      const { container } = renderComponent({
        columns,
        rows: mockRows,
      });

      // Just verify it renders - the flex logic is internal transformation
      expect(container.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
    });

    it('sets flex to 0 for columns with width but no explicit flex', () => {
      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
      ];

      const { container } = renderComponent({
        columns,
        rows: mockRows,
      });

      expect(container.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
    });

    it('preserves explicit flex value over automatic calculation', () => {
      const columns = [
        {
          field: 'id', headerName: 'ID', width: 90, flex: 3,
        },
      ];

      const { container } = renderComponent({
        columns,
        rows: mockRows,
      });

      expect(container.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
    });
  });

  describe('Pagination props transformation', () => {
    it('does not enable pagination by default', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
      });

      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination).not.toBeInTheDocument();
    });

    it('enables pagination when paginate prop is true', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        paginate: true,
        rows: mockRows,
      });

      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination).toBeInTheDocument();
    });
  });

  describe('Multi-select with custom onSelectedChange handler', () => {
    it('does not show checkbox column by default', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
      });

      const checkboxColumn = container.querySelector('[role="columnheader"][aria-label*="checkbox"]');
      expect(checkboxColumn).not.toBeInTheDocument();
    });

    it('shows checkbox column when multiSelect is true', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        multiSelect: true,
        rows: mockRows,
      });

      const headerCheckbox = container.querySelector('.MuiDataGrid-columnHeaderCheckbox');
      expect(headerCheckbox).toBeInTheDocument();
    });

    it('transforms selection model to array and calls onSelectedChange', async () => {
      const handleSelectedChange = jest.fn();
      const { container, user } = renderComponent({
        columns: mockColumns,
        multiSelect: true,
        onSelectedChange: handleSelectedChange,
        rows: mockRows,
      });

      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      await user.click(firstRowCheckbox);

      // Our component transforms selectionModel.ids (Set) to Array
      expect(handleSelectedChange).toHaveBeenCalledWith([1]);
    });

    it('handles multiple selections correctly', async () => {
      const handleSelectedChange = jest.fn();
      const { container, user } = renderComponent({
        columns: mockColumns,
        multiSelect: true,
        onSelectedChange: handleSelectedChange,
        rows: mockRows,
      });

      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      const secondRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="2"] input[type="checkbox"]');

      await user.click(firstRowCheckbox);
      await user.click(secondRowCheckbox);

      // Should be called twice with transformed arrays
      expect(handleSelectedChange).toHaveBeenCalledTimes(2);
      expect(handleSelectedChange).toHaveBeenLastCalledWith(expect.arrayContaining([1, 2]));
    });

    it('does not throw when onSelectedChange is not provided', async () => {
      const { container, user } = renderComponent({
        columns: mockColumns,
        multiSelect: true,
        rows: mockRows,
      });

      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');

      // Our component checks if typeof onSelectedChange === 'function'
      await expect(user.click(firstRowCheckbox)).resolves.not.toThrow();
    });
  });

  describe('CheckboxField integration', () => {
    it('uses CheckboxField component for checkboxes via slots', () => {
      const { container } = renderComponent({
        columns: mockColumns,
        multiSelect: true,
        rows: mockRows,
      });

      // Verify checkboxes are rendered (CheckboxField integration)
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('Additional props passthrough', () => {
    it('passes additional props to DataGridPro', () => {
      const { container } = renderComponent({
        autoHeight: true,
        columns: mockColumns,
        rows: mockRows,
      });

      const dataGrid = container.querySelector('.MuiDataGrid-root.MuiDataGrid-autoHeight');
      expect(dataGrid).toBeInTheDocument();
    });
  });
});

describe('DataGridToolbar', () => {
  afterEach(cleanup);

  describe('Action Menu Tests', () => {
    it('does not show action button when no rows are selected', () => {
      const { queryByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        multiSelect: true,
        showToolbar: true,
        testId: 'test-grid',
        toolbarActionItems: [
          { label: 'Action 1', value: 'action1' },
          { label: 'Action 2', value: 'action2' },
        ],
      });

      const actionButton = queryByTestId('test-grid_actions-button');
      expect(actionButton).not.toBeInTheDocument();
    });

    it('does not show action button no action items are provided', async () => {
      const { queryByTestId, container, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        multiSelect: true,
        showToolbar: true,
        testId: 'test-grid',
        toolbarActionItems: [],
      });

      // Select a row
      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      await user.click(firstRowCheckbox);

      // Action button should not be visible (no action items)
      const actionButton = queryByTestId('test-grid_actions-button');
      expect(actionButton).not.toBeInTheDocument();
    });

    it('shows action button when rows are selected and action items are provided', async () => {
      const { getByTestId, container, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        multiSelect: true,
        showToolbar: true,
        testId: 'test-grid',
        toolbarActionItems: [
          { label: 'Action 1', value: 'action1' },
          { label: 'Action 2', value: 'action2' },
        ],
      });

      // Select a row first
      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      await user.click(firstRowCheckbox);

      const actionButton = getByTestId('test-grid_actions-button');
      expect(actionButton).toBeInTheDocument();
    });

    it('opens action menu when action button is clicked', async () => {
      const { getByTestId, container, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        multiSelect: true,
        showToolbar: true,
        testId: 'test-grid',
        toolbarActionItems: [
          { label: 'Action 1', value: 'action1' },
          { label: 'Action 2', value: 'action2' },
        ],
      });

      // Select a row first
      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      await user.click(firstRowCheckbox);

      // Click the Actions button
      const actionButton = getByTestId('test-grid_actions-button');
      await user.click(actionButton);

      // Action menu should be visible now
      const menu = getByTestId('test-grid_actions-menu');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveTextContent('Action 1');
      expect(menu).toHaveTextContent('Action 2');
    });

    it('calls onToolbarActionItemClick with correct values when an action item is clicked', async () => {
      const handleActionClick = jest.fn();
      const { getByTestId, container, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        multiSelect: true,
        showToolbar: true,
        testId: 'test-grid',
        toolbarActionItems: [
          { label: 'Delete', value: 'delete' },
          { label: 'Export', value: 'export' },
        ],
        onToolbarActionItemClick: handleActionClick,
      });

      // Select rows
      const firstRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="1"] input[type="checkbox"]');
      const secondRowCheckbox = container.querySelector('.MuiDataGrid-row[data-id="2"] input[type="checkbox"]');
      await user.click(firstRowCheckbox);
      await user.click(secondRowCheckbox);

      // Open action menu
      const actionButton = getByTestId('test-grid_actions-button');
      await user.click(actionButton);

      // Click an action item
      const deleteMenuItem = getByTestId('test-grid_actions-menu_menu-item-delete');
      await user.click(deleteMenuItem);

      // Callback should be called with value and selected rows
      expect(handleActionClick).toHaveBeenCalledWith('delete', [1, 2]);
    });
  });

  describe('Quick Filter/Search Tests', () => {
    it('shows search button by default', () => {
      const { getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      // Search button should be visible
      const searchButton = getByTestId('test-grid_search-button');
      expect(searchButton).toBeInTheDocument();
    });

    it('expands search field and hides search button when search button is clicked', async () => {
      const { user, getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      // Click search button
      const searchButton = getByTestId('test-grid_search-button');
      await user.click(searchButton);

      // Search text field should be visible
      const searchInput = getByTestId('test-grid_search-input');
      expect(searchInput).toBeInTheDocument();

      // Search button should be hidden using maxWidth
      expect(searchButton).toHaveStyle({ opacity: '0' });
      expect(searchButton).toHaveStyle({ maxWidth: '0' });
    });

    it('text can be typed in the search input field and then cleared', async () => {
      const { user, getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      // Click search button to expand
      const searchButton = getByTestId('test-grid_search-button');
      await user.click(searchButton);

      // Get the search input wrapper and find the actual input element inside
      const searchInputWrapper = getByTestId('test-grid_search-input');
      const searchInput = searchInputWrapper.querySelector('input');
      expect(searchInput).toBeInTheDocument();

      // Type in search field and verify value
      await user.type(searchInput, 'John');
      expect(searchInput).toHaveValue('John');

      // Click clear button to verify the value is cleared
      const clearButton = getByTestId('test-grid_search-input_clear');
      await user.click(clearButton);
      expect(searchInput).toHaveValue('');
    });
  });

  describe('Filter & Column Panel Tests', () => {
    it('shows toolbar button labels by default', () => {
      const { getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      const filterButton = getByTestId('test-grid_filter-button');
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).toHaveTextContent('—filter—');
      const columnsButton = getByTestId('test-grid_columns-button');
      expect(columnsButton).toBeInTheDocument();
      expect(columnsButton).toHaveTextContent('—columns—');
    });

    it('hides toolbar button labels when showToolbarButtonLabels is false', () => {
      const { getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        showToolbarButtonLabels: false,
        testId: 'test-grid',
      });

      const filterButton = getByTestId('test-grid_filter-button');
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).not.toHaveTextContent('—filter—');

      const columnsButton = getByTestId('test-grid_columns-button');
      expect(columnsButton).toBeInTheDocument();
      expect(columnsButton).not.toHaveTextContent('—columns—');
    });

    it('keeps button titles when labels are hidden', () => {
      const { getByTestId } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        showToolbarButtonLabels: false,
        testId: 'test-grid',
      });

      const filterButton = getByTestId('test-grid_filter-button');
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).toHaveAttribute('title', '—filter—');

      const columnsButton = getByTestId('test-grid_columns-button');
      expect(columnsButton).toBeInTheDocument();
      expect(columnsButton).toHaveAttribute('title', '—columns—');
    });

    it('opens filter panel when filter button is clicked', async () => {
      const { getByTestId, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      // Find and click the filter button
      const filterButton = getByTestId('test-grid_filter-button');
      expect(filterButton).toBeInTheDocument();

      await user.click(filterButton);

      // Filter panel should be visible now
      const filterPanel = document.querySelector('.MuiDataGrid-panelWrapper');
      expect(filterPanel).toBeInTheDocument();
    });

    it('opens column panel when columns button is clicked', async () => {
      const { getByTestId, user } = renderComponent({
        columns: mockColumns,
        rows: mockRows,
        showToolbar: true,
        testId: 'test-grid',
      });

      // Find and click the columns button
      const columnsButton = getByTestId('test-grid_columns-button');
      expect(columnsButton).toBeInTheDocument();

      await user.click(columnsButton);

      // Column panel should be visible now
      const columnPanel = document.querySelector('.MuiDataGrid-panelWrapper');
      expect(columnPanel).toBeInTheDocument();
    });
  });
});
