import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, isFunction } from 'lodash';

import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
} from '@mui/material';

import {
  mapColumns,
  sort,
  getPageRows,
  ROW_HEIGHTS,
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
} from './table-utils';

import styles from './table.css';

import Dimmer from '../dimmer';
import Spinner from '../spinner';
import TableHead from './table-head';
import TableRow from './table-row';
import TableCell from './table-cell';
import TablePagination from './table-pagination';

function BaseNoRowMessage({
  columnCount,
  noRowsMessage,
}) {
  const emptyRowClasses = {
    [styles.tableRow]: true,
    [styles.emptyRow]: true,
  };

  const emptyCellClasses = {
    [styles.noDataCell]: true,
  };

  return (
    <MuiTableRow className={classnames(emptyRowClasses)} style={{ height: ROW_HEIGHTS.md }}>
      <TableCell className={classnames(emptyCellClasses)} colSpan={columnCount}>
        {noRowsMessage}
      </TableCell>
    </MuiTableRow>
  );
}

BaseNoRowMessage.propTypes = {
  columnCount: PropTypes.number,
  noRowsMessage: PropTypes.node,
};

function BaseEmptyRow({
  columnCount,
  emptyRowCount,
}) {
  const emptyRowClasses = {
    [styles.tableRow]: true,
    [styles.emptyRow]: true,
  };

  const emptyCellClasses = {
    [styles.tableCell]: true,
    [styles.emptyCell]: true,
  };

  return !!emptyRowCount && (
    <MuiTableRow className={classnames(emptyRowClasses)} style={{ height: ROW_HEIGHTS.md * emptyRowCount }}>
      <TableCell className={classnames(emptyCellClasses)} colSpan={columnCount} />
    </MuiTableRow>
  );
}

BaseEmptyRow.propTypes = {
  columnCount: PropTypes.number,
  emptyRowCount: PropTypes.number,
};

const defaultTableSort = (rows, columns, sortByKey, sortByDirection) => {
  const isSortNumeric = sortByKey
    ? columns.find((col) => col.key === sortByKey)?.numeric === true
    : false;

  return sort(rows, sortByKey, sortByDirection, isSortNumeric);
};

function BaseTable({
  rows: inputRows,
  columns: inputColumns,
  onRowClick,
  onCellClick,
  onSortClick,
  sortDirection = SORT_DIRECTION_ASCENDING,
  sortBy,
  noRowsMessage,
  paginate,
  rowsPerPageOptions,
  rowsPerPage = 25,
  showEmptyRow,
  page: inputPage,
  templates,
  loading,
  onChangePage,
  onChangeRowsPerPage,
  multiSelect,
  selectedRowIds,
  onSelectedChange,
  totalRowCount,
  overridePage,
  tableClassName,
  testId = 'table',
  multiSelectDropdownOptions,
  scrollToTopOnPagination = true,
  ...rest
}) {
  const tableWrapperRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [sortByDirection, setSortByDirection] = useState(sortDirection);
  const [sortByKey, setSortByKey] = useState(sortBy);

  const [currentPage, setCurrentPage] = useState(inputPage || 0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);

  // when input parameters that we maintain are changed from parents, update
  useEffect(() => { setCurrentPage(inputPage); }, [inputPage]);

  useEffect(() => {
    setColumns(mapColumns(inputColumns));
    if (!sortByKey && inputColumns[0]) {
      setSortByKey(inputColumns[0].key);
    }
  }, [inputColumns, sortByKey]);

  useEffect(() => {
    if (!isFunction(onSortClick) && columns?.length && inputRows?.length) {
      setRows(defaultTableSort(inputRows, columns, sortByKey, sortByDirection));
    } else {
      setRows(inputRows);
    }
  }, [inputRows, columns, sortByDirection, sortByKey, onSortClick]);

  useEffect(() => {
    // Set Default Values if paginate is false
    setCurrentPage(paginate && currentPage ? currentPage : 0);
  }, [currentPage, paginate]);

  useEffect(() => {
    // Sync rowsPerPage prop changes to local state
    setCurrentRowsPerPage(paginate && rowsPerPage ? rowsPerPage : get(rows, 'length'));
  }, [paginate, rows, rowsPerPage]);

  const columnCount = multiSelect
    ? columns.length + 1
    : columns.length;

  let emptyRowCount = 0;

  // Maintain Table Height If number or rows is less than the rowsPerpage. Keeps the table from resizing and pagination from jumping up and down
  if (overridePage) {
    // When using API calls to browse, we don't need to worry about the current page number
    emptyRowCount = currentRowsPerPage - rows.length;
  } else {
    emptyRowCount = currentRowsPerPage - Math.min(currentRowsPerPage, rows.length - (currentPage * currentRowsPerPage));
  }

  useEffect(() => {
    if (selectedRowIds) {
      setSelected(selectedRowIds);
    }

    if (!get(selectedRowIds, 'length')) {
      setHeaderCheckboxSelected(false);
    }
  }, [selectedRowIds]);

  function handleRequestSort({
    sortBy: targetSortBy,
  }) {
    if (isFunction(onSortClick)) {
      onSortClick({ targetSortBy });
    } else {
      setSortByKey(targetSortBy);
      if (targetSortBy === sortByKey) {
        const direction = sortByDirection.toLowerCase() === SORT_DIRECTION_ASCENDING
          ? SORT_DIRECTION_DESCENDING
          : SORT_DIRECTION_ASCENDING;
        setSortByDirection(direction);
      } else {
        setSortByDirection(SORT_DIRECTION_ASCENDING);
      }
    }
  }

  const handleSelectedUpdate = useCallback((newSelected) => {
    setSelected(newSelected);
    if (isFunction(onSelectedChange)) {
      onSelectedChange(newSelected);
    }
  }, [onSelectedChange]);

  const handleSelectAllClick = useCallback(() => {
    // Selection supports an intermediate state.
    // If no rows or some rows are selected select all, other wise clear selected array
    const shouldSelectAllRows = selected.length < rows.length;
    const newSelected = shouldSelectAllRows ? rows.map((n) => n.id) : [];
    setHeaderCheckboxSelected(shouldSelectAllRows);
    handleSelectedUpdate(newSelected);
  }, [handleSelectedUpdate, rows, selected.length]);

  const handleRowClick = useCallback((event, rowData) => {
    if (isFunction(onRowClick)) {
      onRowClick(event, rowData);
    }
  }, [onRowClick]);

  const handleChangePage = useCallback((event, newPage) => {
    if (isFunction(onChangePage)) {
      onChangePage(event, newPage);
    } else {
      setCurrentPage(newPage);
    }

    if (scrollToTopOnPagination && tableWrapperRef.current) {
      tableWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onChangePage, scrollToTopOnPagination]);

  const handleChangeRowsPerPage = useCallback((event) => {
    if (isFunction(onChangeRowsPerPage)) {
      onChangeRowsPerPage(event, parseInt(event.target.value, 10));
    } else {
      setCurrentRowsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0);
    }
  }, [onChangeRowsPerPage]);

  const getCellTemplate = useCallback((dataKey) => {
    return templates?.[dataKey] || null;
  }, [templates]);

  const handleSelectClick = useCallback((event, rowData) => {
    const { id } = rowData;

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    handleSelectedUpdate(newSelected);
  }, [handleSelectedUpdate, selected]);

  const handleCellClick = useCallback((event, cellData) => {
    if (isFunction(onCellClick)) {
      onCellClick(event, cellData);
    }
  }, [onCellClick]);

  const isSelected = useCallback((id) => {
    return selected.includes(id);
  }, [selected]);

  const displayEmptyTable = !rows.length && !!noRowsMessage && !loading;

  const tableClasses = {
    [styles.emptyTable]: displayEmptyTable,
    [styles.tableWrapper]: true,
    [tableClassName]: !!tableClassName,
  };

  const rowsCount = totalRowCount || rows.length;
  const pageRows = overridePage ? rows : getPageRows(rows, currentPage, currentRowsPerPage);

  const attrs = {
    'data-test-id': testId,
  };

  return (
    <div className={classnames(tableClasses)} ref={tableWrapperRef}>
      <Dimmer
        active={loading}
        spinner={<Spinner size="large" />}
      >
        <MuiTable
          className={styles.table}
          {...attrs}
          {...rest}
        >
          <colgroup>
            {multiSelect && (
              <col key="column-checkbox" />
            )}
            {columns.map((column) => {
              const colStyles = {};
              if (column.width) {
                colStyles.width = column.width;
              }
              return (
                <col key={`column-${column.id}`} style={colStyles} />
              );
            })}
          </colgroup>
          <TableHead
            columns={columns}
            handleRequestSort={handleRequestSort}
            handleSelectAllClick={handleSelectAllClick}
            headerCheckboxValue={headerCheckboxSelected}
            multiSelect={multiSelect}
            multiSelectDropdownOptions={multiSelectDropdownOptions}
            rowCount={rows.length}
            selectedCount={selected.length}
            sortBy={sortByKey}
            sortDirection={sortByDirection}
            testId={`${testId}-head`}
          />
          <MuiTableBody>
            {displayEmptyTable && (
              <BaseNoRowMessage
                columnCount={columnCount}
                noRowsMessage={noRowsMessage}
              />
            )}
            {pageRows.map((row, index) => {
              const isItemSelected = !row.isRowDisabled && isSelected(row.id);
              return (
                <TableRow
                  key={`table-row-key-${row.id}-${index}`}
                  row={row}
                  className={row.rowClassName}
                  columns={columns}
                  disabled={row.isRowDisabled}
                  getCellTemplate={getCellTemplate}
                  handleCellClick={handleCellClick}
                  handleRowClick={handleRowClick}
                  handleSelectClick={handleSelectClick}
                  onRowClick={onRowClick}
                  isSelected={isItemSelected}
                  multiSelect={multiSelect}
                  testId={`${testId}-row-${row.id}`}
                />
              );
            })}
            {paginate && showEmptyRow && (
              <BaseEmptyRow
                columnCount={columnCount}
                emptyRowCount={emptyRowCount}
              />
            )}
          </MuiTableBody>
        </MuiTable>
        {paginate && (
          <TablePagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            rowsPerPage={currentRowsPerPage}
            page={currentPage}
            totalRowCount={rowsCount}
            testId={`${testId}-pagination`}
          />
        )}
      </Dimmer>
    </div>
  );
}

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  multiSelect: PropTypes.bool,
  multiSelectDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    onClick: PropTypes.func,
    testId: PropTypes.string.isRequired,
    isDisable: PropTypes.bool,
  })),
  noRowsMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onCellClick: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectedChange: PropTypes.func,
  onSortClick: PropTypes.func,
  overridePage: PropTypes.bool,
  page: PropTypes.number,
  paginate: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  scrollToTopOnPagination: PropTypes.bool,
  selectedRowIds: PropTypes.arrayOf(PropTypes.number),
  showEmptyRow: PropTypes.bool,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  tableClassName: PropTypes.string,
  templates: PropTypes.object,
  testId: PropTypes.string,
  totalRowCount: PropTypes.number,
};

export default BaseTable;
