import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './empty-message.css';

export default function EmptyMessage({
  testId,
  icon,
  message,
  className,
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  const classes = classnames({
    [styles.emptyMessage]: true,
    className: !!className,
  });

  return (
    <div className={classes} {...attrs}>
      {icon && (
        icon
      )}
      <div className={styles.message}>{message}</div>
    </div>
  );
}

EmptyMessage.propTypes = {
  testId: PropTypes.string,
  icon: PropTypes.node,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};
