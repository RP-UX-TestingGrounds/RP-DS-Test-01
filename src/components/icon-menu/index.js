import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MoreHoriz } from '@mui/icons-material';
import IconButton, { ICON_BUTTON_COLORS, ICON_BUTTON_SIZES } from '../icon-button';
import Menu from '../menu';

/**
 * IconMenu combines an IconButton with a Menu dropdown to provide a
 * convenient way to trigger a menu from an icon.
 */
export default function IconMenu({
  anchorOrigin,
  buttonColor = 'default',
  buttonDisabled = false,
  buttonSize = 'medium',
  icon: TargetIcon = MoreHoriz,
  iconPosition = 'start',
  items = [],
  onItemClick,
  testId,
  transformOrigin,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        testId={`${testId}-button`}
        color={buttonColor}
        onClick={handleMenuOpen}
        disabled={buttonDisabled}
        size={buttonSize}
      >
        <TargetIcon />
      </IconButton>
      <Menu
        anchorElement={anchorRef.current}
        anchorOrigin={anchorOrigin}
        iconPosition={iconPosition}
        items={items}
        onClose={handleMenuClose}
        onItemClick={onItemClick}
        open={menuOpen}
        optionIcon={true}
        testId={`${testId}-menu`}
        transformOrigin={transformOrigin}
      />
    </>
  );
}

IconMenu.propTypes = {
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']),
    vertical: PropTypes.oneOf(['bottom', 'center', 'top']),
  }),
  buttonColor: PropTypes.oneOf(ICON_BUTTON_COLORS),
  buttonDisabled: PropTypes.bool,
  buttonSize: PropTypes.oneOf(ICON_BUTTON_SIZES),
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['end', 'start']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
  ),
  onItemClick: PropTypes.func,
  testId: PropTypes.string,
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']),
    vertical: PropTypes.oneOf(['bottom', 'center', 'top']),
  }),
};
