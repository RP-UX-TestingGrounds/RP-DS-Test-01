import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, isFunction } from 'lodash';

import {
  TableRow as MuiTableRowBase,
  styled,
} from '@mui/material';

import TableCell from './table-cell';
import Checkbox from '../checkbox';

import {
  CELL_ALIGNMENT_DIRECTIONS,
  ROW_HEIGHTS,
} from './table-utils';

import styles from './table.css';

const StyledTableRow = styled(MuiTableRowBase)({
  height: ROW_HEIGHTS.md,
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: 'inherit',
  },
  '&.MuiTableRow-selected': {
    backgroundColor: 'inherit',
  },
});

function CheckboxCellWrapper({ children, className }) {
  const handleCellClick = useCallback((event) => {
    if (typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
  }, []);

  return (
    <TableCell
      className={className}
      align={CELL_ALIGNMENT_DIRECTIONS.center}
      onClick={handleCellClick}
    >
      {children}
    </TableCell>
  );
}

CheckboxCellWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function TableRow({
  row,
  className,
  columns,
  disabled,
  handleCellClick,
  handleRowClick,
  handleSelectClick,
  isSelected,
  multiSelect,
  onRowClick,
  getCellTemplate,
  testId = 'table-row',
}) {
  const rowClasses = {
    [styles.tableRow]: true,
    [styles.tableRowHover]: isFunction(onRowClick),
    [className]: !!className,
    [styles.highlight]: !!get(row, 'highlight'),
  };

  const multiSelectClasses = classnames({
    [styles.tableCell]: true,
    [styles.multiSelectCell]: true,
  });

  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledTableRow
      hover={isFunction(onRowClick)}
      onClick={disabled ? null : (event) => handleRowClick(event, row)}
      selected={isSelected}
      className={classnames(rowClasses)}
      {...attrs}
    >
      {multiSelect && (
        <CheckboxCellWrapper className={multiSelectClasses}>
          <Checkbox
            className={styles.tableCheckbox}
            testId={`${testId}-checkbox`}
            id={`enhanced-table-checkbox-${testId}`}
            checked={isSelected}
            onChange={(event) => handleSelectClick(event, row)}
            disabled={disabled}
          />
        </CheckboxCellWrapper>
      )}
      {columns.map((col) => (
        <TableCell
          key={`${col.dataKey}-${row.key}`}
          cellTemplate={getCellTemplate(col.dataKey)}
          align={col.align}
          noClick={onRowClick === null}
          onClick={(event) => handleCellClick(event, row[col.dataKey])}
          rowData={row}
        >
          {row[col.dataKey]}
        </TableCell>
      ))}
    </StyledTableRow>
  );
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
    }),
  ).isRequired,
  row: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleCellClick: PropTypes.func,
  handleRowClick: PropTypes.func,
  handleSelectClick: PropTypes.func,
  multiSelect: PropTypes.bool,
  onRowClick: PropTypes.func,
  getCellTemplate: PropTypes.func,
  isSelected: PropTypes.bool,
  testId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TableRow;
