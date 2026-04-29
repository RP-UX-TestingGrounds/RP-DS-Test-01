import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isFunction } from 'lodash';

import { TableCell as MuiTableCell } from '@mui/material';

// Constants
import { CELL_ALIGNMENT_DIRECTIONS } from './table-utils';

import styles from './table.css';

export function Template({
  format,
  children,
  rowData,
}) {
  const content = useMemo(() => {
    return isFunction(format) ? format(children, rowData) : children;
  }, [children, format, rowData]);

  return (
    <Fragment>
      {content}
    </Fragment>
  );
}

Template.propTypes = {
  format: PropTypes.func,
  rowData: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object,
    PropTypes.bool,
  ]),
};

function TemplatedTableCell({
  cellTemplate,
  className,
  noClick,
  children,
  rowData,
  align = CELL_ALIGNMENT_DIRECTIONS.left,
  ...rest
}) {
  const cellClasses = useMemo(() => classnames({
    [styles.tableCell]: true,
    [styles.noClick]: noClick,
    [className]: !!className,
  }), [className, noClick]);

  return (
    <MuiTableCell
      className={cellClasses}
      variant="body"
      align={align}
      {...rest}
    >
      <Template
        format={cellTemplate}
        rowData={rowData}
      >
        {children}
      </Template>
    </MuiTableCell>
  );
}

TemplatedTableCell.propTypes = {
  className: PropTypes.string,
  cellData: PropTypes.string,
  numeric: PropTypes.bool,
  align: PropTypes.oneOf(Object.values(CELL_ALIGNMENT_DIRECTIONS)),
  cellTemplate: PropTypes.func,
  noClick: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object,
    PropTypes.bool,
  ]),
  rowData: PropTypes.object,
};

export default TemplatedTableCell;
