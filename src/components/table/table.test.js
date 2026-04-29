import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

import Table from './table';

const columns = [
  {
    label: 'Id',
    key: 'id',
    disableSort: true,
  },
  {
    label: 'Name',
    key: 'name',
    disableSort: true,
  },
  {
    label: 'Steps',
    key: 'steps',
    numeric: true,
    disableSort: true,
  },
  {
    label: 'Kingdom',
    key: 'kingdom',
    disableSort: true,
  },
  {
    label: 'Weapon',
    key: 'weapon',
    disableSort: true,
  },
  {
    label: 'Race',
    key: 'race',
    disableSort: true,
  }];

const data = [{
  id: 1323,
  key: 'test-1',
  name: 'Frodo',
  steps: 1879202,
  kingdom: 'The Shire',
  weapon: 'Sting',
  race: 'Hobbit',
  filterKey: 'Frodo 1879202 The Shire Sting Hobbit',
},
{
  id: 2434,
  key: 'test-2',
  name: 'Aragorn',
  steps: 32211,
  kingdom: 'Gondor',
  weapon: 'Anduril',
  race: 'Man',
  filterKey: 'Aragorn 32211 Gondor Anduril Man',
},
{
  id: 3424,
  key: 'test-3',
  name: 'Galadriel',
  steps: 0,
  kingdom: 'Lothlorien',
  weapon: 'Knowledge',
  race: 'Elf',
  filterKey: 'Galadriel 0 Lothlorien Knowledge Elf',
},
{
  id: 45454,
  key: 'test-4',
  name: 'Gandalf',
  steps: 1289300,
  kingdom: '',
  weapon: 'Magic',
  race: 'Wizard',
  filterKey: 'Gandalf 1289300 Magic Wizard',
}];

function formatNumber(value) {
  return value.toLocaleString();
}

function setup(props) {
  return render(
    <Table
      testId={'test-table'}
      columns={columns}
      rows={data}
      height={400}
      {...props}
    />,
  );
}

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: jest.fn((fn) => fn), // debounce implementation can lead to unreliable timer behavior
}));

describe('Table', () => {
  afterEach(cleanup);

  // Base Table Renders
  it('renders columns', () => {
    const { getByText } = setup();
    getByText(/id/i);
    getByText(/name/i);
    getByText(/steps/i);
    getByText(/kingdom/i);
    getByText(/race/i);
  });

  it('renders row data', () => {
    const { getByText } = setup();
    getByText(/frodo/i);
    getByText(/Aragorn/i);
    getByText(/Galadriel/i);
    getByText(/Gandalf/i);

    const rows = document.querySelectorAll('tr').length;
    expect(rows).toEqual(5); // 4 rows of data + Header Row
  });

  it('renders simple string column templates', () => {
    const templates = {
      steps: formatNumber,
    };

    const { getByText } = setup({ templates });
    getByText(/32,211/);
  });

  it('render column template nodes', () => {
    const templates = {
      // eslint-disable-next-line react/display-name
      weapon: (val) => <span> {`Template Text ${val} Overrride`} </span>,
    };

    const { getByText } = setup({ templates });
    getByText(/Template Text Sting Overrride/);
  });
});

describe('Table Select', () => {
  afterEach(cleanup);

  it('clicking on a row should return row data if handler is present', () => {
    // subset of Event Interface properties
    const mockOnClick = jest.fn((event, value) => {
      expect(value).toEqual(data[1]);
    });

    const { getByText } = setup({
      onRowClick: mockOnClick,
    });
    const row = getByText(/Aragorn/i).closest('tr');

    expect(mockOnClick).not.toHaveBeenCalled();
    fireEvent.click(row);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('displays header checkbox if multiSelect flag is set', () => {
    setup({ multiSelect: true });
    const checkboxes = document.querySelectorAll('thead tr input[type="checkbox"]').length;
    expect(checkboxes).toEqual(1);
  });

  it('displays checkboxes if multiSelect flag is set', () => {
    setup({ multiSelect: true });
    const checkboxes = document.querySelectorAll('tbody tr input[type="checkbox"]').length;
    expect(checkboxes).toEqual(4);
  });

  it('returns selected row if checkbox checked', () => {
    const mockOnSelectedChange = jest.fn();

    const { getByTestId } = setup({
      multiSelect: true,
      onSelectedChange: mockOnSelectedChange,
    });
    const checkboxContainer = getByTestId('test-table-row-2434-checkbox');
    const checkboxInput = checkboxContainer.querySelector('input');

    expect(mockOnSelectedChange).not.toHaveBeenCalled();
    fireEvent.click(checkboxInput);
    expect(mockOnSelectedChange).toHaveBeenCalledWith([2434]);
  });
});

describe('Table Pagination', () => {
  let scrollIntoViewMock;

  beforeEach(() => {
    scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  const paginationProps = {
    paginate: true,
    rowsPerPageOptions: [2, 4],
    page: 0,
    rowsPerPage: 2,
  };

  // Filter and Search Works
  it('displays pagination', () => {
    const { getByText } = setup(paginationProps);
    const pagination = document.querySelector('.MuiTablePagination-root');

    expect(pagination).toBeTruthy();

    getByText('Rows per page:');
  });

  it('displays rows per page drop down', () => {
    const { getByText } = setup(paginationProps);
    getByText('2');
  });

  it('visible out of total rows text', () => {
    const { getByText } = setup(paginationProps);
    getByText('1-2 of 4');
  });

  it('displays 1st set of paged data', () => {
    setup(paginationProps);
    const rows = document.querySelectorAll('tbody tr').length;

    expect(rows).toEqual(2);
  });

  it('clicking on next and previous page buttons returns page number if handler provided', () => {
    const mockOnClick = jest.fn((event, value) => {
      expect(value).toEqual(1 || 0);
    });

    paginationProps.onChangePage = mockOnClick;

    setup(paginationProps);
    const buttons = document.querySelectorAll('.MuiTablePagination-actions button');

    expect(mockOnClick).not.toHaveBeenCalled();

    // On 'Previous' click should not be called if on page 0 (first page)
    fireEvent.click(buttons[0]);
    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(buttons[1]);
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[0]);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('scrolls to top when pagination changes by default', () => {
    setup(paginationProps);
    const buttons = document.querySelectorAll('.MuiTablePagination-actions button');

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    // Click next page button
    fireEvent.click(buttons[1]);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('does not scroll to top when scrollToTopOnPagination is false', () => {
    setup({
      ...paginationProps,
      scrollToTopOnPagination: false,
    });
    const buttons = document.querySelectorAll('.MuiTablePagination-actions button');

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    // Click next page button
    fireEvent.click(buttons[1]);

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  it('scrolls to top when page changes with custom onChangePage handler', () => {
    const mockOnChangePage = jest.fn();

    setup({
      ...paginationProps,
      onChangePage: mockOnChangePage,
    });
    const buttons = document.querySelectorAll('.MuiTablePagination-actions button');

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    expect(mockOnChangePage).not.toHaveBeenCalled();

    // Click next page button
    fireEvent.click(buttons[1]);

    expect(mockOnChangePage).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('calculates empty row count correctly when overridePage is true', () => {
    // When overridePage is true, emptyRowCount should be currentRowsPerPage - rows.length
    // regardless of current page number
    const limitedData = [data[0], data[1]];
    const { container } = setup({
      ...paginationProps,
      rows: limitedData,
      rowsPerPage: 4,
      overridePage: true,
      paginate: true,
      showEmptyRow: true,
    });

    // With overridePage=true, rowsPerPage=4, and 2 rows, emptyRowCount = 4 - 2 = 2
    // Should have 2 data rows + 1 empty row (with the height of 2 rows) = 3 total rows
    const tbodyRows = container.querySelectorAll('tbody tr');
    expect(tbodyRows.length).toBe(3);

    // The last row should be the empty row with calculated height
    const emptyRow = tbodyRows[tbodyRows.length - 1];
    expect(emptyRow).toBeTruthy();
    // Verify it has a style attribute with height (empty rows have calculated height)
    expect(emptyRow.getAttribute('style')).toContain('height');
  });

  it('calculates empty row count correctly when overridePage is false', () => {
    // When overridePage is false, emptyRowCount should account for current page
    const limitedData = [data[0], data[1], data[2]];

    const { container } = setup({
      ...paginationProps,
      rows: limitedData,
      rowsPerPage: 2,
      page: 2,
      overridePage: false,
      paginate: true,
      showEmptyRow: true,
    });

    // With overridePage=false, page=1, rowsPerPage=2, and 4 rows
    // emptyRowCount = 1 - Math.min(3, 2 - (1 * 3)) = 3 - Math.min(3, 2) = 3 - 2 = 1
    const tbodyRows = container.querySelectorAll('tbody tr');
    // Should have 1 data row + 1 empty row (with the height of 2 rows) = 2 total rows
    expect(tbodyRows.length).toBe(1);

    const emptyRow = tbodyRows[tbodyRows.length - 1];
    expect(emptyRow).toBeTruthy();
    expect(emptyRow.getAttribute('style')).toContain('height');
  });

  it('does not render empty rows when overridePage is true and rows fill the page', () => {
    // When we have exactly rowsPerPage rows, no empty rows should be shown
    const fullPageData = [data[0], data[1], data[2], data[3]];
    const { container } = setup({
      ...paginationProps,
      rows: fullPageData,
      rowsPerPage: 4,
      overridePage: true,
      paginate: true,
      showEmptyRow: true,
    });

    // With 4 rows and rowsPerPage=4, emptyRowCount = 4 - 4 = 0
    // So no empty row should be rendered, only 4 data rows
    const tbodyRows = container.querySelectorAll('tbody tr');
    expect(tbodyRows.length).toBe(4);

    // Verify none of the rows have a style attribute (empty rows have style with height)
    tbodyRows.forEach((row) => {
      expect(row.getAttribute('style')).toBeNull();
    });
  });

  it('maintains rowsPerPage when navigating pages', async () => {
    // Tests the fix for the bug where rowsPerPage was reset when changing pages
    const moreData = [
      ...data,
      {
        id: 5,
        key: 'test-5',
        name: 'Legolas',
        steps: 500000,
        kingdom: 'Mirkwood',
        weapon: 'Bow',
        race: 'Elf',
        filterKey: 'Legolas 500000 Mirkwood Bow Elf',
      },
      {
        id: 6,
        key: 'test-6',
        name: 'Gimli',
        steps: 300000,
        kingdom: 'Erebor',
        weapon: 'Axe',
        race: 'Dwarf',
        filterKey: 'Gimli 300000 Erebor Axe Dwarf',
      },
      {
        id: 7,
        key: 'test-7',
        name: 'Boromir',
        steps: 250000,
        kingdom: 'Gondor',
        weapon: 'Horn',
        race: 'Man',
        filterKey: 'Boromir 250000 Gondor Horn Man',
      },
      {
        id: 8,
        key: 'test-8',
        name: 'Sam',
        steps: 1879202,
        kingdom: 'The Shire',
        weapon: 'Frying Pan',
        race: 'Hobbit',
        filterKey: 'Sam 1879202 The Shire Frying Pan Hobbit',
      },
    ];

    const { getByText, queryByText, container } = setup({
      ...paginationProps,
      rows: moreData,
      rowsPerPage: 2,
    });

    getByText('1-2 of 8');
    let tbodyRows = container.querySelectorAll('tbody tr');
    expect(tbodyRows.length).toBe(2);

    // Changing the 'Rows per page' option to 4
    const selectDiv = container.querySelector('[role="combobox"]');
    fireEvent.mouseDown(selectDiv);
    const option4 = document.querySelector('[data-value="4"]');
    expect(option4).toBeInTheDocument();
    fireEvent.click(option4);

    // Let's validate the 4 rows per page action triggered
    await waitFor(() => {
      expect(queryByText('1-4 of 8')).toBeInTheDocument();
    });
    tbodyRows = container.querySelectorAll('tbody tr');
    expect(tbodyRows.length).toBe(4);

    // Navigate to next page
    const nextButton = container.querySelectorAll('.MuiTablePagination-actions button')[1];
    fireEvent.click(nextButton);

    // Now, let's verify that the second page is shown with the last 4 rows
    await waitFor(() => {
      tbodyRows = container.querySelectorAll('tbody tr');
      expect(tbodyRows.length).toBe(4);
      expect(container.querySelector('[data-test-id="test-table-row-5"]')).toBeInTheDocument();
    });

    getByText('Legolas');
    getByText('Gimli');
    getByText('Boromir');
    getByText('Sam');
  });
});
