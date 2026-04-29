import React from 'react';
import { TextField as MuiTextFieldBase, InputAdornment, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledTextField = styled(MuiTextFieldBase)({
  '& .MuiInputBase-root:not(.Mui-focused):not(.Mui-disabled):hover:after ': {
    borderBottomColor: 'var(--text-primary)',
    transform: 'scaleX(1) translateX(0)',
  },
  // Helper Text
  '& .MuiFormHelperText-root': {
    fontSize: '.857em',
  },
  // Label
  '& .MuiInputLabel-filled:not(.MuiInputLabel-shrink)': {
    color: 'var(--text-secondary)',
  },
  // Icon
  '& .MuiInputBase-root.MuiFilledInput-adornedEnd .MuiSvgIcon-root': {
    fontSize: '1.5em',
  },
  // Without Label
  '&.without-label .MuiFilledInput-input': {
    padding: '1em 0.8em 1em',
  },
  // Filled variant styles
  '& .MuiFilledInput-root': {
    backgroundColor: 'var(--input-field-filled-bg)',
    borderRadius: 'var(--radius-button-field)',
    border: '1px solid transparent',

    '&::before, &::after': {
      borderBottom: 'none',
      display: 'none',
    },

    '&.Mui-focused': {
      borderColor: 'var(--primary-main)',
    },

    // Disabled state
    '&.Mui-disabled': {
      backgroundColor: 'var(--input-field-filled-disabled-bg)',
    },
  },
  // browser autofill styles
  '& .MuiFilledInput-input': {
    '&:-webkit-autofill': {
      WebkitTextFillColor: 'var(--text-primary)',
      WebkitBoxShadow: '0 0 0 30px var(--input-field-filled-bg) inset',
    },
  },
  '& .MuiOutlinedInput-input': {
    '&:-webkit-autofill': {
      WebkitTextFillColor: 'var(--text-primary)',
      WebkitBoxShadow: '0 0 0 30px var(--input-field-outlined-bg) inset',
    },
  },
  // Outlined variant styles
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--input-field-outlined-bg)',

    // Keep the border color consistent across states (default, hover, focused)
    '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--input-field-outlined-border)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--input-field-outlined-border)',
    },
    // Disabled state
    '&.Mui-disabled': {
      backgroundColor: 'var(--input-field-outlined-disabled-bg)',

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  },
});

export default function TextField({
  autoComplete = 'off',
  autoFocus = false,
  defaultValue = '',
  disabled = false,
  error = false,
  helperText,
  icon,
  id,
  label,
  name,
  onClear,
  placeholder,
  required = false,
  startIcon,
  testId,
  type,
  value,
  variant = 'filled',
  size = 'normal',
  className,
  slotProps,
  ...other
}) {
  const InputProps = {};

  if (startIcon) {
    InputProps.startAdornment = (
      <InputAdornment position="start">
        {startIcon}
      </InputAdornment>
    );
  }

  if (icon) {
    InputProps.endAdornment = (
      <InputAdornment position="end">
        {onClear ? (
          <div
            // Prevent this onClear click from stealing focus from the input field
            onMouseDown={(e) => e.preventDefault()}
            data-test-id={`${testId}_clear`}
            onClick={onClear}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {icon}
          </div>
        ) : (
          icon
        )}
      </InputAdornment>
    );
  }

  const InputLabelProps = {};
  if (type === 'date' || type === 'time') {
    InputLabelProps.shrink = true;
  }

  const attrs = {
    'data-test-id': testId,
  };

  const classes = cx(className, {
    'without-label': !label,
  });

  const mergedSlotProps = {};

  if (slotProps?.select) {
    mergedSlotProps.select = slotProps.select;
  }

  if (testId || slotProps?.htmlInput) {
    mergedSlotProps.htmlInput = {
      ...(testId ? { 'data-test-id': `${testId}__input-field` } : {}),
      ...slotProps?.htmlInput,
    };
  }

  if (InputProps) {
    mergedSlotProps.input = {
      ...slotProps?.input,
      ...InputProps,
    };
  }
  if (InputLabelProps) {
    mergedSlotProps.inputLabel = {
      ...slotProps?.inputLabel,
      ...InputLabelProps,
    };
  }

  if (value !== undefined && value !== null) {
    attrs.value = value;
  } else if (defaultValue) {
    attrs.defaultValue = defaultValue;
  }

  return (
    <StyledTextField
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={classes}
      disabled={disabled}
      error={error}
      fullWidth={true}
      helperText={helperText}
      id={id}
      slotProps={mergedSlotProps}
      label={label}
      multiline={false}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      variant={variant}
      size={size}
      {...attrs}
      {...other}
    />
  );
}

TextField.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small']),
  slotProps: PropTypes.shape({
    select: PropTypes.object,
    htmlInput: PropTypes.object,
    input: PropTypes.object,
    inputLabel: PropTypes.object,
  }),
  startIcon: PropTypes.node,
  testId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['date', 'number', 'password', 'text', 'time', 'email']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};
