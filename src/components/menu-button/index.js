import React, {
  useMemo, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '../button';
import Menu from '../menu';
import './menu-button.css';

export default function MenuButton({
  testId,
  groups,
  items = [],
  variant = 'text',
  color = 'primary',
  size = 'medium',
  disabled = false,
  className,
  onChange,
  selectedValue,
  placeholder,
  defaultSelectedValue,
  optionIcon = false,
  iconPosition = 'start',
}) {
  const [internalSelectedValue, setInternalSelectedValue] = useState(defaultSelectedValue);
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  // Sync internal state with defaultSelectedValue when it changes
  useEffect(() => {
    if (selectedValue === undefined && defaultSelectedValue !== undefined) {
      setInternalSelectedValue(defaultSelectedValue);
    }
  }, [defaultSelectedValue, selectedValue]);

  const handleItemClick = (item) => {
    // Only update internal selected value if onChange is provided (selection mode)
    // and no external selectedValue is controlled
    if (onChange) {
      if (selectedValue === undefined) {
        setInternalSelectedValue(item.value);
      }
      onChange(item);
    }
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const currentSelectedValue = selectedValue !== undefined ? selectedValue : internalSelectedValue;

  const allItems = useMemo(
    () => (groups?.length > 0 ? groups.flatMap((g) => g.items || []) : items),
    [groups, items],
  );
  const selectedItem = allItems.find((item) => item.value === currentSelectedValue);
  const displayLabel = selectedItem ? selectedItem.label : placeholder;

  const classes = cx('menuButton', className);

  return (
    <div data-test-id={testId}>
      <Button
        ref={buttonRef}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        className={classes}
        onClick={handleMenuOpen}
        data-menu-open={menuOpen ? 'true' : 'false'}
        testId={testId ? `${testId}-button` : undefined}
        icon={
          <ExpandMoreIcon
            className="menu-button-icon"
          />
        }
        iconPosition="end"
      >
        {displayLabel}
      </Button>
      <Menu
        anchorElement={buttonRef.current}
        groups={groups}
        items={items}
        onItemClick={handleItemClick}
        onClose={handleMenuClose}
        open={menuOpen}
        selectedValue={currentSelectedValue}
        optionIcon={optionIcon}
        iconPosition={iconPosition}
        testId={testId ? `${testId}-menu` : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
    </div>
  );
}

const menuItemShape = PropTypes.shape({
  disabled: PropTypes.bool,
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

MenuButton.propTypes = {
  // Extend Button PropTypes
  ...Button.propTypes,

  // MenuButton specific props
  defaultSelectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  groups: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(menuItemShape),
    label: PropTypes.string.isRequired,
  })),
  iconPosition: PropTypes.oneOf(['start', 'end']),
  items: PropTypes.arrayOf(menuItemShape),
  onChange: PropTypes.func,
  optionIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
