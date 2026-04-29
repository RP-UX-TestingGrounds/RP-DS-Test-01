import React from 'react';
import PropTypes from 'prop-types';

import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@mui/material';

import HeaderCell from './header-cell';
import Checkbox from '../checkbox';

import {
  CELL_ALIGNMENT_DIRECTIONS,
  CHECKBOX_HEADER_CELL_DATA,
} from './table-utils';

import styles from './table.css';

function TableHead({
  columns,
  handleRequestSort,
  handleSelectAllClick,
  headerCheckboxValue,
  multiSelect,
  multiSelectDropdownOptions,
  rowCount,
  selectedCount,
  sortBy,
  sortDirection,
  testId = 'table-head',
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  return (
    <MuiTableHead {...attrs}>
      <MuiTableRow className={styles.tableRow}>
        {multiSelect && (
          <HeaderCell
            cellData={CHECKBOX_HEADER_CELL_DATA}
            align={CELL_ALIGNMENT_DIRECTIONS.center}
          >
            {multiSelectDropdownOptions ? (
              // @todo: Handle multiselect options when we have a dropdown element
              <Checkbox
                testId={'enhanced-table-header-checkbox-dropdown'}
                checked={headerCheckboxValue}
                className={styles.tableCheckbox}
                indeterminate={selectedCount > 0 && selectedCount < rowCount}
                onChange={handleSelectAllClick}
              />
            ) : (
              <Checkbox
                testId={'enhanced-table-header-checkbox'}
                checked={headerCheckboxValue}
                className={styles.tableCheckbox}
                indeterminate={selectedCount > 0 && selectedCount < rowCount}
                onChange={handleSelectAllClick}
              />
            )}
          </HeaderCell>
        )}
        {columns.map((headerCell) => (
          <HeaderCell
            key={headerCell.id}
            cellData={headerCell}
            sortDirection={sortDirection}
            sortBy={sortBy}
            onClick={handleRequestSort}
            align={headerCell.alignHeader}
          >
            {headerCell.label}
          </HeaderCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      disablePadding: PropTypes.bool,
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
      disableSort: PropTypes.bool,
    }),
  ).isRequired,
  handleRequestSort: PropTypes.func,
  handleSelectAllClick: PropTypes.func,
  headerCheckboxValue: PropTypes.bool,
  multiSelect: PropTypes.bool,
  multiSelectDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    onClick: PropTypes.func,
    testId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  rowCount: PropTypes.number,
  selectedCount: PropTypes.number,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  testId: PropTypes.string,
};

export default TableHead;
