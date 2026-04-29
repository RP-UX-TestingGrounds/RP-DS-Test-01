import React from 'react';
import { Button as MuiButtonBase, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledButton = styled(MuiButtonBase, {
  shouldForwardProp: (prop) => prop !== 'nowrap',
})(({ nowrap }) => ({
  textTransform: 'none',
  fontFamily: 'inherit',
  fontWeight: 'var(--font-weight-regular)',
  ...(nowrap && { whiteSpace: 'nowrap' }),
  '&.MuiButtonBase-root': {
    padding: 'var(--button-padding-y) var(--button-padding-x)',
    fontSize: 'var(--button-font-size)',
    lineHeight: 'var(--button-line-height)',
  },
  '&.MuiButton-contained': {
    boxShadow: 'var(--button-shadow)',
  },
  '&.Mui-disabled .MuiButton-icon': {
    color: 'inherit',
  },
  '&.Mui-disabled .MuiButton-icon svg, &.Mui-disabled .MuiButton-icon svg path': {
    fill: 'currentColor',
  },
  '&.MuiButton-sizeLarge': {
    '--button-padding-y': 'var(--button-padding-y-large)',
    '--button-padding-x': 'var(--button-padding-x-large)',
    '--button-font-size': 'var(--button-font-size-large)',
  },
  '&.MuiButton-sizeMedium': {
    '--button-padding-y': 'var(--button-padding-y-medium)',
    '--button-padding-x': 'var(--button-padding-x-medium)',
    '--button-font-size': 'var(--button-font-size-medium)',
  },
  '&.MuiButton-sizeSmall': {
    '--button-padding-y': 'var(--button-padding-y-small)',
    '--button-padding-x': 'var(--button-padding-x-small)',
    '--button-font-size': 'var(--button-font-size-small)',
  },
  '&.MuiButton-text&.MuiButton-sizeMedium': {
    '--button-padding-x': 'calc(var(--button-padding-x-medium) / 2)',
  },
  '&.MuiButton-text&.MuiButton-sizeSmall': {
    '--button-padding-x': 'calc(var(--button-padding-x-small) / 2)',
  },
  '&.MuiButton-text&.MuiButton-sizeLarge': {
    '--button-padding-x': 'calc(var(--button-padding-x-large) / 2)',
  },
  '&:not(.MuiButton-contained):not([disabled])': {
    borderColor: 'var(--color-main)',
    color: 'var(--on-color-white)',
  },
  '.MuiButton-icon .MuiSvgIcon-root': {
    color: 'inherit',
  },
}));

export const BUTTON_COLORS = ['primary', 'secondary', 'error', 'warning', 'success', 'inherit'];
export const BUTTON_VARIANTS = ['contained', 'outlined', 'text'];
export const BUTTON_SIZES = ['small', 'medium', 'large'];

const Button = React.forwardRef(({
  testId,
  variant = 'contained',
  color = 'inherit',
  children,
  className,
  disabled = false,
  onClick,
  icon,
  iconPosition = 'start',
  size = 'medium',
  fullWidth = false,
  nowrap = false,
  ...other
}, ref) => {
  const attrs = {
    'data-test-id': testId,
    startIcon: icon && iconPosition === 'start' ? icon : undefined,
    endIcon: icon && iconPosition === 'end' ? icon : undefined,
  };

  const isGreyscale = ['default', 'inherit'].includes(color);
  const style = {
    '--color-main': `var(--${color}-main)`,
    '--color-light': `var(--${color}-light)`,
    '--color-dark': `var(--${color}-dark)`,
    '--on-color': `var(--on-${color})`,
    '--on-color-light': `var(--on-${color}-light)`,
    '--on-color-white': `var(--on-${color}-white)`,
    '--action-base': `var(--color-main)`,
    '--action-filled-base': `var(--color-main)`,
    '--is-greyscale': isGreyscale ? '1' : '0',
  };

  const classes = cx('actionable', className, {
    filled: variant === 'contained',
  });

  return (
    <StyledButton
      ref={ref}
      color={color}
      disableRipple
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      size={size}
      className={classes}
      nowrap={nowrap}
      style={style}
      {...attrs}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;

Button.propTypes = {
  testId: PropTypes.string,
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  color: PropTypes.oneOf(BUTTON_COLORS),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  size: PropTypes.oneOf(BUTTON_SIZES),
  fullWidth: PropTypes.bool,
  nowrap: PropTypes.bool,
};
