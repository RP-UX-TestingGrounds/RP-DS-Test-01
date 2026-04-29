import React from 'react';
import PropTypes from 'prop-types';
import MuiRadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(() => ({
  width: '100%',
}));

const StyledFormLabel = styled(FormLabel)(() => ({
  fontSize: 'var(--typography-title-sm-font-size)',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--typography-title-sm-line-height)',
  color: 'var(--grey-900) !important',
  marginBottom: 'var(--spacing-8)',
  '&.Mui-error': {
    color: 'var(--grey-900)',
  },
  '& .MuiFormLabel-asterisk': {
    display: 'none',
  },
}));

const StyledRadioGroup = styled(MuiRadioGroup)(() => ({
  marginLeft: 'var(--spacing-8)',
}));

const StyledFormHelperText = styled(FormHelperText)(({ error }) => ({
  marginLeft: 'var(--spacing-4)',
  marginTop: 'var(--spacing-0)',
  color: error
    ? 'var(--error-main) !important'
    : 'var(--text-secondary) !important',
}));

const RowOptionWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 'var(--spacing-16)',
  '&:last-of-type': {
    marginRight: 0,
  },
}));

const RadioGroup = ({
  name,
  value,
  defaultValue,
  onBlur,
  onChange,
  row = false,
  disabled,
  error,
  helperText,
  label,
  required,
  testId,
  children,
}) => {
  const wrappedChildren = row && React.Children.count(children) > 0
    ? React.Children.map(children, (child, index) => (child != null ? (
            <RowOptionWrapper key={child.key ?? `row-option-${index}`}>
              {child}
            </RowOptionWrapper>
    ) : (
      child
    )))
    : children;

  return (
    <StyledFormControl
      component="fieldset"
      disabled={disabled}
      required={required}
      error={error}
      {...(testId ? { 'data-test-id': testId } : {})}
    >
      {label && (
        <StyledFormLabel component="legend">
          {label}
        </StyledFormLabel>
      )}

      <StyledRadioGroup
        name={name}
        value={value}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onChange={onChange}
        row={row}
      >
        {wrappedChildren}
      </StyledRadioGroup>

      {helperText && (
        <StyledFormHelperText error={error}>
          {helperText}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  row: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  testId: PropTypes.string,
  children: PropTypes.node,
};

export default RadioGroup;
