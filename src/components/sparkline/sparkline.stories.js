import React from 'react';
import Sparkline from './index';
import sampleData from './sample-data.json';
import sampleDataLow from './sample-data-low.json';

export default {
  title: 'Components/Metrics/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sparkline chart component for displaying small data trends within other components.',
      },
    },
  },
  argTypes: {
    testId: {
      control: 'text',
      description: 'Test ID for the component',
    },
    data: {
      control: 'object',
      description: 'Array of data points for the sparkline',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color theme for the sparkline',
    },
    height: {
      control: 'number',
      description: 'Height of the sparkline in pixels',
    },
    noDataLabel: {
      control: 'text',
      description: 'Label to show when there is no data',
    },
  },
};

// Default story
export const Default = {
  args: {
    testId: 'default-sparkline',
    data: sampleData.default,
    color: 'primary',
    height: 40,
  },
};

// Different colors
export const Colors = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div>
        <h4>Primary</h4>
        <Sparkline
          testId="sparkline-primary"
          data={sampleData.default}
          color="primary"
          height={40}
        />
      </div>
      <div>
        <h4>Success</h4>
        <Sparkline
          testId="sparkline-success"
          data={sampleData.default}
          color="success"
          height={40}
        />
      </div>
      <div>
        <h4>Error</h4>
        <Sparkline
          testId="sparkline-error"
          data={sampleData.default}
          color="error"
          height={40}
        />
      </div>
    </div>
  ),
};

// Different heights
export const Heights = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div>
        <h4>Small (20px)</h4>
        <Sparkline
          testId="sparkline-small"
          data={sampleData.default}
          color="primary"
          height={20}
        />
      </div>
      <div>
        <h4>Medium (40px)</h4>
        <Sparkline
          testId="sparkline-medium"
          data={sampleData.default}
          color="primary"
          height={40}
        />
      </div>
      <div>
        <h4>Large (60px)</h4>
        <Sparkline
          testId="sparkline-large"
          data={sampleData.default}
          color="primary"
          height={60}
        />
      </div>
    </div>
  ),
};

// No data state
export const NoData = {
  args: {
    testId: 'sparkline-no-data',
    data: [],
    color: 'primary',
    height: 40,
    noDataLabel: 'No data available',
  },
};

export const LowerData = {
  args: {
    testId: 'default-sparkline-lower-data',
    data: sampleDataLow.default,
    color: 'primary',
    height: 40,
  },
};
