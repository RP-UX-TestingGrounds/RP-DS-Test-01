import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isFunction } from 'lodash';

import {
  TableCell as MuiTableCellBase,
  TableSortLabel as MuiTableSortLabelBase,
  styled,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

// Constants
import {
  CELL_ALIGNMENT_DIRECTIONS,
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  CHECKBOX_HEADER_CELL_DATA,
} from './table-utils';

import styles from './table.css';

const StyledTableCell = styled(MuiTableCellBase)({
  padding: '0rem',
  backgroundColor: 'var(--card-color)',
  color: 'var(--on-surface-color)',
  fontFamily: 'var(--font-family)',
  fontSize: '1.4rem',
  fontWeight: 600,
  borderBottom: '2px solid #ccc',
});

const StyledTableSortLabel = styled(MuiTableSortLabelBase)({
  '& .MuiTableSortLabel-icon': {
    fontSize: '2.3rem',
  },
  padding: '0.8rem 1.6rem',
});

function HeaderCell({
  cellData,
  sortBy,
  sortDirection = SORT_DIRECTION_ASCENDING,
  align = CELL_ALIGNMENT_DIRECTIONS.left,
  children,
  onClick,
  ...props
}) {
  const direction = {
    [SORT_DIRECTION_ASCENDING]: 'asc',
    [SORT_DIRECTION_DESCENDING]: 'desc',
  };

  const cellClasses = {
    [styles.noClick]: true,
  };

  const handleOnHeaderClick = useCallback(() => {
    if (isFunction(onClick)) {
      onClick({ sortBy: cellData.key });
    }
  }, [cellData, onClick]);

  const cellContent = cellData.label || children;

  const unsortedContentClasses = classnames({
    [styles.tableHeadUnsorted]: true,
    [styles.checkboxHeader]: cellData.key === CHECKBOX_HEADER_CELL_DATA.key,
  });

  return (
    <StyledTableCell
      key={cellData.id}
      variant="head"
      className={classnames(cellClasses)}
      align={align}
      {...props}
    >
      {!cellData.disableSort ? (
        <StyledTableSortLabel
          active={cellData.key === sortBy}
          direction={direction[sortDirection.toLowerCase()]}
          onClick={handleOnHeaderClick}
          IconComponent={ArrowDropDown}
        >
          {cellContent}
        </StyledTableSortLabel>
      ) : (
        <div className={unsortedContentClasses}>
          {cellContent}
        </div>
      )}
    </StyledTableCell>
  );
}

HeaderCell.propTypes = {
  label: PropTypes.string,
  dataKey: PropTypes.string,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  align: PropTypes.oneOf(Object.values(CELL_ALIGNMENT_DIRECTIONS)),
  cellData: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    numeric: PropTypes.bool,
    disableSort: PropTypes.bool,
    label: PropTypes.string,
    alignRight: PropTypes.bool,
    tooltip: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
};

export default HeaderCell;
