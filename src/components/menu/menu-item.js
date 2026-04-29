import { MenuItem as MuiMenuItemBase, styled } from '@mui/material';
import PropTypes from 'prop-types';

export const MENU_ITEM_COLORS = ['default', 'primary', 'danger'];

const StyledMenuItem = styled(MuiMenuItemBase)(({ color = 'default' }) => {
  const colors = {
    default: 'var(--text-primary)',
    primary: 'var(--interactive-color)',
    danger: 'var(--error-main)',
  };

  return {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--body-font-size)',
    fontWeight: 'var(--font-weight-regular)',
    color: colors[color] || colors.default,
    padding: '12px 16px',
    margin: 0,
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    '&:hover': {
      backgroundColor: 'var(--surface-hover-color)',
      color: colors[color] || colors.primary,
    },

    '&.Mui-selected': {
      backgroundColor: 'var(--action-hover)',
      color: colors[color] || colors.primary,
      '&:hover': {
        backgroundColor: 'var(--action-hover)',
        color: colors[color] || colors.primary,
      },
    },

    '& .menu-item-icon-start': {
      display: 'flex',
      alignItems: 'center',
      order: -1,
    },

    '& .menu-item-icon-end': {
      display: 'flex',
      alignItems: 'center',
      order: 1,
    },
  };
});

const MenuItem = ({
  children,
  optionIcon = false,
  iconPosition = 'start',
  icon,
  color = 'default',
  ...other
}) => (
  <StyledMenuItem
    disableRipple
    color={color}
    {...other}
  >
    {optionIcon && icon && iconPosition === 'start' && (
      <div className="menu-item-icon-start">{icon}</div>
    )}

    {children}

    {optionIcon && icon && iconPosition === 'end' && (
      <div className="menu-item-icon-end">{icon}</div>
    )}
  </StyledMenuItem>
);

MenuItem.propTypes = {
  children: PropTypes.node,
  optionIcon: PropTypes.bool,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  icon: PropTypes.node,
  color: PropTypes.oneOf(MENU_ITEM_COLORS),
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
