import React from 'react';
import { ToggleButton as MuiToggleButton, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledToggleButton = styled(MuiToggleButton)(() => ({
  fontFamily: 'var(--font-family)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--button-font-size-medium)',
  lineHeight: 'var(--button-line-height)',
  borderRadius: 'var(--radius-button-field)',
  '&.MuiToggleButton-root': {
    padding: 'var(--button-padding-y-medium) var(--button-padding-x-medium)',
    borderColor: 'var(--border-primary)',
    color: 'var(--text-primary)',
    textTransform: 'none',
    '& svg': {
      color: 'var(--text-secondary)',
    },
  },
  '&.MuiToggleButton-sizeSmall': {
    '--button-padding-y': 'var(--button-padding-y-small)',
    '--button-padding-x': 'var(--button-padding-x-small)',
    '--button-font-size': 'var(--button-font-size-small)',
    padding: 'var(--button-padding-y) var(--button-padding-x)',
  },
  '&.MuiToggleButton-sizeMedium': {
    '--button-padding-y': 'var(--button-padding-y-medium)',
    '--button-padding-x': 'var(--button-padding-x-medium)',
    '--button-font-size': 'var(--button-font-size-medium)',
    padding: 'var(--button-padding-y) var(--button-padding-x)',
  },
  '&.MuiToggleButton-sizeLarge': {
    '--button-padding-y': 'var(--button-padding-y-large)',
    '--button-padding-x': 'var(--button-padding-x-large)',
    '--button-font-size': 'var(--button-font-size-large)',
    padding: 'var(--button-padding-y) var(--button-padding-x)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--information-color) !important',
    color: 'var(--primary-color) !important',
    '&:hover': {
      backgroundColor: 'var(--information-color) !important',
      color: 'var(--primary-color) !important',
    },
    '& svg': {
      color: 'var(--primary-color) !important',
    },
  },
  '&:hover:not(.Mui-selected)': {
    backgroundColor: 'var(--color-light)',
  },
  '&.Mui-disabled': {
    color: 'var(--disabled-color)',
    borderColor: 'var(--disabled-border-color)',
    '& svg': {
      color: 'var(--disabled-color) !important',
    },
  },
}));

export default function ToggleButton({
  testId,
  value,
  selected,
  disabled = false,
  size = 'medium',
  children,
  className,
  onChange,
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  const classes = cx('actionable', className);

  return (
    <StyledToggleButton
      value={value}
      selected={selected}
      disabled={disabled}
      size={size}
      className={classes}
      onChange={onChange}
      disableRipple
      {...attrs}
      {...other}
    >
      {children}
    </StyledToggleButton>
  );
}

ToggleButton.propTypes = {
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

ToggleButton.displayName = 'ToggleButton';
