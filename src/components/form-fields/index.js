import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

// Outer container establishes the container query context
const FormFieldsContainer = styled('div')({
  containerName: 'form-fields',
  containerType: 'inline-size',
  width: '100%',
});

// Inner element handles the flex layout
const FormFieldsInner = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 'var(--spacing-16)',
  // Container query modifies the flex layout when container is narrow
  '@container form-fields (max-width: 500px)': {
    flexDirection: 'column',
  },
});

export default function FormFields({
  children,
  className,
  testId,
  ...other
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  return (
    <FormFieldsContainer
      className={className}
      {...attrs}
      {...other}
    >
      <FormFieldsInner>
        {children}
      </FormFieldsInner>
    </FormFieldsContainer>
  );
}

FormFields.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  testId: PropTypes.string,
};
