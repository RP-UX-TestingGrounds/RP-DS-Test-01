import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const SecondaryMetricContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
  fontSize: 'var(--text-size-xs)',
  fontWeight: 'var(--font-weight-regular)',
  lineHeight: 'var(--line-height-tight)',
}));

const Value = styled('span')(() => ({
  color: 'var(--text-primary)',
  fontSize: 'var(--font-size-xs)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--line-height-normal)',
  letterSpacing: 'var(--letter-spacing-wide)',
}));

const Label = styled('span')(() => ({
  color: 'var(--text-secondary)',
  fontSize: 'var(--font-size-xs)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--line-height-normal)',
  letterSpacing: 'var(--letter-spacing-wide)',
}));

export default function SecondaryMetric({
  value,
  label,
  testId,
  className,
}) {
  return (
    <SecondaryMetricContainer data-test-id={testId} className={className}>
      <Value>{value}</Value>
      {label && <Label>{label}</Label>}
    </SecondaryMetricContainer>
  );
}

SecondaryMetric.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string,
  className: PropTypes.string,
};
