import { Chip as MuiChipBase, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledChip = styled(MuiChipBase)(() => ({
  fontFamily: 'inherit',
  fontWeight: 'var(--chip-font-weight)',
  fontSize: 'var(--chip-font-size)',
  lineHeight: 'var(--chip-line-height)',
  borderRadius: 'var(--radius-button-field)',
  letterSpacing: '0.012em',
  height: 'fit-content',
  '&.MuiChip-root': {
    borderColor: `var(--color-main)`,
    color: `var(--on-color-white)`,
    padding: 'var(--chip-padding-y) var(--chip-padding-x)',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 'var(--chip-inner-gap, 0.6rem)',
  },
  '&.MuiChip-root.MuiChip-filled': {
    color: 'var(--on-color-light)',
    backgroundColor: 'var(--color-light)',
    border: '1px solid transparent',
  },
  '&.MuiChip-root.MuiChip-filled.contained': {
    color: 'var(--on-color)',
    backgroundColor: 'var(--color-main)',
  },
  '&.MuiChip-sizeSmall': {
    '--chip-padding-y': 'var(--chip-padding-y-small)',
    '--chip-padding-x': 'var(--chip-padding-x-small)',
    padding: 'var(--chip-padding-y) var(--chip-padding-x)',
  },
  '&.chip-menu-item': {
    fontSize: '1.3rem',
    lineHeight: '1.4rem',
    color: 'var(--text-secondary)',
    fontWeight: 'var(--font-weight-normal)',
    backgroundColor: 'var(--white)',
    padding: '0.5rem 1.0rem',
  },
  '& .MuiChip-label, & .MuiChip-deleteIcon, & .MuiChip-icon': {
    padding: '0',
    margin: '0',
  },
  '& .MuiChip-icon, & .MuiChip-deleteIcon': {
    color: 'inherit',
  },
  '& .MuiChip-deleteIcon.MuiSvgIcon-root': {
    margin: '0 -0.1rem 0 0',
  },
}));

export default function Chip({
  testId,
  variant = 'filled',
  color = 'default',
  label,
  className,
  disabled = false,
  onClick,
  icon,
  size = 'medium',
  onDelete,
}) {
  let chipVariant = variant;
  let filledVariantLight = true;
  if (variant === 'contained') {
    chipVariant = 'filled';
    filledVariantLight = false;
  }

  const attrs = {
    'data-test-id': testId,
  };

  // For greyscale colors, use a different approach to avoid hue shifts when darkening
  const isGreyscale = ['default', 'inherit'].includes(color);
  const style = {
    '--color-main': `var(--${color}-main)`,
    '--color-light': `var(--${color}-light)`,
    '--color-dark': `var(--${color}-dark)`,
    '--on-color': `var(--on-${color})`,
    '--on-color-light': `var(--on-${color}-light)`,
    '--on-color-white': `var(--on-${color}-white)`,
    '--action-base': `var(--color-main)`,
    '--action-filled-base': filledVariantLight ? `var(--color-light)` : `var(--color-main)`,
    '--is-greyscale': isGreyscale ? '1' : '0',
  };

  const classes = cx(className, {
    actionable: onClick || onDelete,
    contained: variant === 'contained',
    filled: chipVariant === 'filled',
  });

  // if onDelete is provided, we use it as the onClick action
  let handleClick = onClick;
  if (onDelete) {
    handleClick = onDelete;
  }
  // disable ripple if there is an onClick handler
  if (typeof handleClick === 'function') {
    attrs.disableRipple = true;
  }

  return (
    <StyledChip
      color={color}
      deleteIcon={<Close />}
      variant={chipVariant}
      label={label}
      icon={icon}
      disabled={disabled}
      onClick={handleClick}
      onDelete={onDelete}
      size={size}
      className={classes}
      style={style}
      {...attrs}
    />
  );
}

Chip.propTypes = {
  testId: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'contained']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success']),
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium']),
  onDelete: PropTypes.func,
};
