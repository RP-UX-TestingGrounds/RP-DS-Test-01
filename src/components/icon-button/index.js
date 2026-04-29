import React from 'react';
import { IconButton as MuiIconButtonBase, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledIconButton = styled(MuiIconButtonBase)(() => ({
  color: 'var(--color-main)',
  transition: 'color 0.2s ease-in-out, background-color 0.4s ease-in-out',
  '&:hover': {
    color: 'var(--color-dark)',
  },
  '&:active': {
    color: 'var(--color-dark)',
    backgroundColor: 'var(--color-light)',
  },
  '& .MuiSvgIcon-root': {
    color: 'inherit',
  },
}));

export const ICON_BUTTON_COLORS = ['default', 'error', 'primary', 'success', 'warning'];
export const ICON_BUTTON_SIZES = ['large', 'medium', 'small'];

const IconButton = React.forwardRef(({
  'aria-label': ariaLabel,
  testId,
  color = 'default',
  children,
  className,
  disabled = false,
  onClick,
  size = 'medium',
  title,
}, ref) => {
  const attrs = {
    'aria-label': ariaLabel,
    'data-test-id': testId,
    title,
  };

  const style = {
    '--color-main': `var(--${color}-main)`,
    '--color-light': `var(--${color}-light)`,
    '--color-dark': `var(--${color}-dark)`,
  };

  const classes = cx(className);

  return (
    <StyledIconButton
      ref={ref}
      color={color}
      disableRipple
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={classes}
      style={style}
      {...attrs}
    >
      {children}
    </StyledIconButton>
  );
});

IconButton.displayName = 'IconButton';
export default IconButton;

IconButton.propTypes = {
  'aria-label': PropTypes.string,
  testId: PropTypes.string,
  color: PropTypes.oneOf(ICON_BUTTON_COLORS),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(ICON_BUTTON_SIZES),
  title: PropTypes.string,
};
