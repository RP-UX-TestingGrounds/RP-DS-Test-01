import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import cx from 'classnames';

import PropTypes from 'prop-types';

// Styles
import styles from './subnav-chip.css';

export default function SubnavChip({
  index,
  label,
  testId,
  badge,
  selected,
  className,
  ...other
}) {
  const classes = cx(styles.chip, className, {
    [styles.selected]: selected,
    actionable: true,
  });

  return (
    <MuiChip
      data-test-id={testId || `chip-${index}`}
      data-badge={badge || null}
      className={classes}
      variant="outlined"
      clickable
      disableRipple
      disableTouchRipple
      index={index}
      label={label}
      {...other}
    />
  );
}

SubnavChip.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  badge: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  testId: PropTypes.string,
  className: PropTypes.string,
};
