import React from 'react';
import SecondaryMetric from './index';

export default {
  title: 'Components/Metrics/SecondaryMetric',
  tags: ['autodocs'],
  component: SecondaryMetric,
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
  },
};

// Default story
export const Default = {
  args: {
    testId: 'default-secondary-metric',
    value: '$25K',
    label: 'Secondary',
  },
};

// Value only
export const ValueOnly = {
  args: {
    testId: 'value-only-secondary-metric',
    value: '$50K',
  },
};

// With label
export const WithLabel = {
  args: {
    testId: 'with-label-secondary-metric',
    value: '$75K',
    label: 'Revenue',
  },
};

// Long values
export const LongValues = {
  render: () => (
    <div
      style={{
        display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap',
      }}
    >
      <SecondaryMetric
        testId="secondary-long-currency"
        value="$1,234,567.89"
        label="Total Revenue"
      />
      <SecondaryMetric
        testId="secondary-long-label"
        value="$50K"
        label="Very Long Secondary Metric Label"
      />
    </div>
  ),
};
