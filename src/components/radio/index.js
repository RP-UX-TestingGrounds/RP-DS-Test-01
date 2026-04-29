import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MuiRadio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  padding: 'var(--spacing-6)',
  '&.MuiRadio-colorPrimary.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'var(--action-hover)',
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    },
  },
}));

const sizeMap = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const Radio = forwardRef(
  (
    {
      size = 'small',
      testId,
      disableRipple = true,
      inputProps = {},
      ...props
    },
    ref,
  ) => {
    const mergedInputProps = {
      ...inputProps,
      ...(testId ? { 'data-test-id': testId } : {}),
    };

    return (
      <StyledRadio
        ref={ref}
        size={sizeMap[size] || 'medium'}
        disableRipple={disableRipple}
        inputProps={mergedInputProps}
        {...props}
      />
    );
  },
);

Radio.displayName = 'Radio';

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
    'default',
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  testId: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disableRipple: PropTypes.bool,
  inputProps: PropTypes.object,
};

export default Radio;
