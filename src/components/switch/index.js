import React from 'react';
import { Switch as MuiSwitch, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledSwitch = styled(MuiSwitch)(() => ({
  // Only override for 'primary' color (default) to use the custom variable
  '& .MuiSwitch-switchBase.MuiSwitch-colorPrimary.Mui-checked': {
    color: 'var(--switch-checked-color)',
    '&:hover': {
      backgroundColor: 'var(--action-hover)',
    },
  },
  '& .MuiSwitch-switchBase.MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'var(--switch-checked-color)',
  },
}));

export default function Switch({
  checked,
  defaultChecked,
  disabled = false,
  color = 'primary',
  id,
  onChange,
  size = 'large',
  testId,
  value,
  inputProps,
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  const muiSize = size === 'large' ? 'medium' : size;

  const handleOnChange = (event, checkedValue) => {
    if (!disabled && onChange) {
      onChange(event, checkedValue);
    }
  };

  return (
    <StyledSwitch
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      color={color}
      id={id}
      onChange={handleOnChange}
      size={muiSize}
      value={value}
      slotProps={{ input: inputProps }}
      {...attrs}
      {...other}
    />
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default']),
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  testId: PropTypes.string.isRequired,
  value: PropTypes.any,
  inputProps: PropTypes.object,
};
