import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import styles from './subnav-chips.css';

export default function SubnavChips({
  testId,
  onChange,
  children,
  defaultSelectedIndex,
  defaultMargins = true,
  selectedIndex: controlledSelectedIndex,
  className,
}) {
  // Use controlled or uncontrolled state
  const isControlled = controlledSelectedIndex !== undefined;
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
  const selectedIndex = isControlled ? controlledSelectedIndex : internalSelectedIndex;

  const handleChipChange = useCallback((newSelectedIndex) => {
    let changedIndex = newSelectedIndex;
    if (newSelectedIndex === selectedIndex) {
      changedIndex = null;
    }
    if (!isControlled) {
      setInternalSelectedIndex(changedIndex);
    }
    if (onChange) {
      onChange(changedIndex);
    }
  }, [isControlled, onChange, selectedIndex]);

  const enhancedChildren = React.Children.map(children, (child, index) => {
    const idx = child.props.index || index;
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        selected: selectedIndex === idx,
        onClick: (event) => {
          // Call the original onClick if it exists
          if (child.props.onClick) {
            child.props.onClick(event);
          }
          // Call our onChange handler
          handleChipChange(idx);
        },
      });
    }
    return child;
  });

  const classes = cx(styles.container, className, {
    [styles.containerMargins]: defaultMargins,
  });

  return (
    <div
      className={classes}
      data-test-id={testId || 'subnav-chips-container'}
    >
      {enhancedChildren}
    </div>
  );
}

SubnavChips.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
  defaultSelectedIndex: PropTypes.number,
  selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  testId: PropTypes.string,
  defaultMargins: PropTypes.bool,
};
