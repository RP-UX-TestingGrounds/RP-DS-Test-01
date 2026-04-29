import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '../form-control-label';
import Switch from '../switch';
import Tooltip from '../tooltip';

const containerStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-8)',
};

export default function SwitchField({
  checked,
  disabled = false,
  id,
  label,
  labelPlacement = 'end',
  name,
  onChange,
  size = 'large',
  testId,
  value,
  tooltip,
  ...other
}) {
  const valueChecked = typeof value === 'boolean' ? value : false;
  const isChecked = checked !== undefined ? checked : valueChecked;

  const labelContent = tooltip ? (
    <span style={containerStyles}>
      <span>{label}</span>
      <Tooltip
        title={tooltip}
        testId={`${testId}-tooltip`}
      />
    </span>
  ) : (
    label
  );

  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Switch
          checked={isChecked}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          size={size}
          testId={`${testId}-switch`}
          value={value}
        />
      }
      label={labelContent}
      labelPlacement={labelPlacement}
      testId={testId}
      value={value}
      {...other}
    />
  );
}

SwitchField.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  testId: PropTypes.string.isRequired,
  value: PropTypes.any,
  tooltip: PropTypes.string,
};
