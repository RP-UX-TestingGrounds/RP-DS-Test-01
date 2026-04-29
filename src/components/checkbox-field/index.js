import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import HelperTextBase from '../helper-text';
import Checkbox from '../checkbox';
import FormControlLabel, { FORM_CONTROL_LABEL_PLACEMENT } from '../form-control-label';

const HelperText = styled(HelperTextBase)({
  marginLeft: 'var(--spacing-28)',
  marginTop: `calc(-1 * var(--spacing-4))`,
});

export default function CheckboxField({
  checked,
  color = 'primary',
  disabled = false,
  error = false,
  fullWidth = false,
  helperText,
  id,
  indeterminate = false,
  label,
  labelPlacement = 'end',
  name,
  onBlur,
  onChange,
  testId,
  value,
  ...other
}) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const checkbox = (
    <Checkbox
      checked={checked}
      color={color}
      disabled={disabled}
      id={id}
      indeterminate={indeterminate}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      testId={testId ? `${testId}-checkbox` : undefined}
      value={value}
      {...other}
    />
  );

  return (
    <>
      <FormControlLabel
        control={checkbox}
        fullWidth={fullWidth}
        label={label}
        labelPlacement={labelPlacement}
        testId={testId}
        value={value}
      />
      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </>
  );
}

CheckboxField.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(FORM_CONTROL_LABEL_PLACEMENT),
  margin: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  size: PropTypes.string,
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
