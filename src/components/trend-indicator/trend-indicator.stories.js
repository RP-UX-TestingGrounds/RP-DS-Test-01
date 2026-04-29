import React from 'react';
import TrendIndicator from './index';

export default {
  title: 'Components/Metrics/TrendIndicator',
  tags: ['autodocs'],
  component: TrendIndicator,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'default'],
    },
    indicator: {
      control: { type: 'select' },
      options: ['increase', 'decrease', 'neutral'],
      description: 'Trend direction indicator',
    },
    iconName: {
      control: 'text',
      description: 'Custom icon name (overrides indicator)',
    },
  },
};

// Default story
export const Default = {
  args: {
    testId: 'default-trend-indicator',
    variant: 'success',
    value: '5.2%',
    indicator: 'increase',
  },
};

export const DefaultNegative = {
  args: {
    testId: 'default-trend-indicator-negative',
    variant: 'error',
    value: '-5.2%',
    indicator: 'decrease',
  },
};

// All variants comparison
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <TrendIndicator
        testId="trend-success"
        variant="success"
        value="+5.2%"
        indicator="increase"
      />
      <TrendIndicator
        testId="trend-error"
        variant="error"
        value="-2.1%"
        indicator="decrease"
      />
      <TrendIndicator
        testId="trend-success-red"
        variant="success"
        value="5.2%"
        indicator="decrease"
      />
      <TrendIndicator
        testId="trend-error"
        variant="error"
        value="2.1%"
        indicator="increase"
      />
    </div>
  ),
};

export const ArrowIcons = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TrendIndicator
        testId="trend-arrow-up"
        variant="success"
        value="+8.5%"
        indicator="increase"
      />
      <TrendIndicator
        testId="trend-arrow-down"
        variant="error"
        value="-3.2%"
        indicator="decrease"
      />
      <TrendIndicator
        testId="trend-remove"
        variant="default"
        value="0%"
        indicator="neutral"
      />
    </div>
  ),
};

// Comparison between indicator and custom iconName usage
export const IconUsagePatterns = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Using Indicator Prop (Recommended)</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <TrendIndicator
            variant="success"
            value="+5.2%"
            indicator="increase"
          />
          <TrendIndicator
            variant="error"
            value="-2.1%"
            indicator="decrease"
          />
          <TrendIndicator
            variant="default"
            value="0%"
            indicator="neutral"
          />
        </div>
      </div>

      <div>
        <h3>Using Custom IconName (Advanced)</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <TrendIndicator
            variant="success"
            value="+5.2%"
            iconName="arrowUp"
          />
          <TrendIndicator
            variant="error"
            value="-2.1%"
            iconName="arrowDown"
          />
          <TrendIndicator
            variant="default"
            value="0%"
            iconName="minus"
          />
        </div>
      </div>
    </div>
  ),
};
