import React, { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import PropTypes from 'prop-types';
import {
  styled,
} from '@mui/material';

import CheckboxField from '../checkbox-field';
import DataGridToolbar from './data-grid-toolbar';
import IconButton from '../icon-button';

const StyledDataGrid = styled(DataGridPro)({
  borderColor: 'transparent',
  '& .MuiDataGrid-cell': {
    '&:focus': {
      outline: 'none',
    },
  },
  '& .MuiTablePagination-selectLabel ,& .MuiTablePagination-displayedRows': {
    margin: 0,
  },
});

export const FILTER_MODES = {
  client: 'client',
  server: 'server',
};

const defaultTranslation = (key) => {
  return `—${key}—`;
};

const DataGrid = ({
  columns: columnDefinitions,
  rows,
  multiSelect = false,
  onSelectedChange,
  testId,
  paginate = false,
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  loading = false,
  showToolbar = false,
  disableToolbarFilterButton = false,
  showToolbarButtonLabels = true,
  toolbarActionItems = [],
  onToolbarActionItemClick = () => {},
  translate = defaultTranslation,
  // Props below handle server-side filtering capabilities
  filterMode = FILTER_MODES.client,
  onFilterModelChange = null,
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedChange = (selectionModel) => {
    const selectedRowIds = Array.from(selectionModel?.ids);
    setSelectedRows(selectedRowIds);

    if (typeof onSelectedChange === 'function') {
      onSelectedChange(selectedRowIds);
    }
  };

  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  // Column Definitions
  const columns = columnDefinitions.map(({
    flex: flexDefinition,
    width,
    ...col
  }) => {
    // default flex based on whether width is defined
    let flex = flexDefinition;
    if (!flex) {
      flex = width ? 0 : 1;
    }

    return {
      flex,
      width,
      ...col,
    };
  });

  const initialState = {};
  if (paginate) {
    initialState.pagination = {
      paginationModel: { pageSize: rowsPerPage },
    };
  }

  const paginateProps = paginate ? {
    initialState,
    pagination: true,
    pageSizeOptions: rowsPerPageOptions,
  } : {
    initialState,
    pagination: false,
  };

  const multiSelectProps = multiSelect ? {
    checkboxSelection: true,
    disableRowSelectionOnClick: true,
    // disable row selection exclude model for simplicity (for now)
    disableRowSelectionExcludeModel: true,
    onRowSelectionModelChange: handleSelectedChange,
  } : {
    disableRowSelectionOnClick: true,
  };

  const filterProps = {
    filterMode,
    ...(filterMode === FILTER_MODES.server && onFilterModelChange && {
      onFilterModelChange,
    }),
  };

  const toolbarProps = {
    selectedRows,
    actionItems: toolbarActionItems,
    onActionItemClick: onToolbarActionItemClick,
    testId,
    disableToolbarFilterButton,
    showToolbarButtonLabels,
    translate,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledDataGrid
        columns={columns}
        rows={rows}
        showToolbar={showToolbar}
        slots={{
          baseCheckbox: CheckboxField,
          baseIconButton: IconButton,
          toolbar: DataGridToolbar,
        }}
        slotProps={{
          toolbar: {
            ...toolbarProps,
          },
          baseIconButton: {
            color: 'primary',
          },
        }}
        hideFooterRowCount={true}
        loading={loading}
        {...filterProps}
        {...multiSelectProps}
        {...paginateProps}
        {...attrs}
        {...props}
      />
    </div>
  );
};

DataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  multiSelect: PropTypes.bool,
  onSelectedChange: PropTypes.func,
  testId: PropTypes.string,
  paginate: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  loading: PropTypes.bool,
  showToolbar: PropTypes.bool,
  toolbarActionItems: PropTypes.array,
  onToolbarActionItemClick: PropTypes.func,
  translate: PropTypes.func,
  filterMode: PropTypes.oneOf(Object.values(FILTER_MODES)),
  onFilterModelChange: PropTypes.func,
  disableToolbarFilterButton: PropTypes.bool,
  showToolbarButtonLabels: PropTypes.bool,
};

export default DataGrid;
