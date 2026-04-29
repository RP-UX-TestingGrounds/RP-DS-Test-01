import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import HelperTextBase from '../helper-text';
import FormControlLabel, { FORM_CONTROL_LABEL_PLACEMENT } from '../form-control-label';
import Radio from '../radio';

const HelperText = styled(HelperTextBase)({
  marginLeft: 'var(--spacing-28)',
  marginTop: `calc(-1 * var(--spacing-4))`,
});

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    color: 'var(--grey-900) !important',
  },
}));

const RadioField = ({
  label,
  helperText,
  error,
  required,
  labelPlacement = 'end',
  className,
  value,
  testId,
  ...radioProps
}) => {
  return (
    <>
      <StyledFormControlLabel
        value={value}
        control={
          <Radio
            {...radioProps}
            value={value}
            color="primary"
            testId={testId ? `${testId}-input` : undefined}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
        required={required}
        className={className}
        testId={testId}
      />

      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelPlacement: PropTypes.oneOf(FORM_CONTROL_LABEL_PLACEMENT),
  value: PropTypes.any.isRequired,
  testId: PropTypes.string,
};

export default RadioField;
