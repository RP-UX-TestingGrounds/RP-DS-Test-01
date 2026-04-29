import { Tab as MuiTab } from '@mui/material';
import cx from 'classnames';
import PropTypes from 'prop-types';

// Styles
import styles from './tab.css';

export default function Tab({
  index,
  label,
  testId,
  badge,
  className,
  ...other
}) {
  const classes = cx(styles.tab, className, 'actionable');

  return (
    <MuiTab
      data-test-id={testId || `tab-${index}`}
      data-badge={badge || null}
      className={classes}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      index={index}
      label={label}
      {...other}
    />
  );
}

Tab.propTypes = {
  index: PropTypes.number,
  badge: PropTypes.string,
  label: PropTypes.string,
  testId: PropTypes.string,
  className: PropTypes.string,
};
