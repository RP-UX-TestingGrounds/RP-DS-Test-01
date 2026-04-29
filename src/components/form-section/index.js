import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const StyledFormSection = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-16)',
}));

const FormSectionInner = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-16)',
}));

const SectionTitle = styled('h3')(() => ({
  fontFamily: 'var(--typography-title-sm-font-family)',
  fontWeight: 'var(--typography-title-sm-font-weight)',
  fontSize: 'var(--typography-title-sm-font-size)',
  lineHeight: 'var(--typography-title-sm-line-height)',
  letterSpacing: 'var(--typography-title-sm-letter-spacing)',
  color: 'var(--typography-title-sm-color)',
  margin: 'var(--spacing-0)',
  padding: 'var(--spacing-0)',
}));

export default function FormSection({
  children,
  className,
  testId,
  title,
  flex = 1,
  width,
  ...other
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  const style = {};
  if (width) {
    style.width = width;
  } else {
    style.flex = flex;
  }

  return (
    <StyledFormSection
      className={className}
      style={style}
      {...attrs}
      {...other}
    >
      {title && <SectionTitle>{title}</SectionTitle>}
      <FormSectionInner>
        {children}
      </FormSectionInner>
    </StyledFormSection>
  );
}

FormSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  testId: PropTypes.string,
  title: PropTypes.string,
  flex: PropTypes.number,
  width: PropTypes.number,
};
