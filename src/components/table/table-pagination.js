import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  TablePagination as MuiTablePaginationBase,
  styled,
} from '@mui/material';

import styles from './table.css';
import defaultTranslate from '../../utils/translation';

const StyledTablePagination = styled(MuiTablePaginationBase)({
  '& .MuiTablePagination-toolbar': {
    flexShrink: 0,
    fontSize: 'var(--body-font-size)',
    '& .MuiTypography-root': {
      fontFamily: 'var(--font-family)',
      fontSize: '.8em',
    },
  },
  '& .MuiTablePagination-select': {
    fontSize: 'var(--body-font-size)',
  },
  '& .MuiTablePagination-selectIcon': {
    top: 'inherit',
  },
  '& p': {
    margin: 0,
  },
});

const defaultTranslation = (key, data) => {
  const translations = {
    labelRowsPerPage: 'Rows per page:',
    labelDisplayedRows: '{{from}}-{{to}} of {{count}}',
  };
  return defaultTranslate(translations, key, data);
};

const usePaginationVisibility = (currentPage, rowsLength, rowsPerPage) => {
  const [isNextPageVisible, setIsNextPageVisible] = useState(true);
  const [isPrevPageVisible, setIsPrevPageVisible] = useState(true);

  useEffect(() => {
    const totalPages = Math.ceil(rowsLength / rowsPerPage);

    setIsPrevPageVisible(currentPage > 0);
    setIsNextPageVisible(currentPage < totalPages - 1);
  }, [currentPage, rowsLength, rowsPerPage]);

  return { isNextPageVisible, isPrevPageVisible };
};

function TablePagination({
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  rowsPerPage = 25,
  page,
  totalRowCount,
  translate = defaultTranslation,
  testId = 'table-pagination',
}) {
  const {
    isNextPageVisible,
    isPrevPageVisible,
  } = usePaginationVisibility(page, totalRowCount, rowsPerPage);

  const visibilityStyle = (isVisible) => ({
    visibility: isVisible ? 'visible' : 'hidden',
  });

  const classes = {
    [styles.pagination]: true,
  };

  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledTablePagination
      {...attrs}
      component="div"
      className={classnames(classes)}
      count={totalRowCount}
      rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={<span>{translate('labelRowsPerPage')}</span>}
      labelDisplayedRows={(data) => {
        return translate('labelDisplayedRows', data);
      }}
      backIconButtonProps={{
        style: visibilityStyle(isPrevPageVisible),
        disableRipple: true,
      }}
      nextIconButtonProps={{
        style: visibilityStyle(isNextPageVisible),
        disableRipple: true,
      }}
    />
  );
}

TablePagination.propTypes = {
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  totalRowCount: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  translate: PropTypes.func,
  testId: PropTypes.string,
};

export default TablePagination;
