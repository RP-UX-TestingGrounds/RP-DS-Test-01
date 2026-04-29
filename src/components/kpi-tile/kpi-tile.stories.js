import React from 'react';
import KPITile from './index';
import TrendIndicator from '../trend-indicator';
import SecondaryMetric from '../secondary-metric';
import Sparkline from '../sparkline';
import sampleData from '../sparkline/sample-data.json';

// Helper function to get sample data
const getSampleData = () => {
  return sampleData.default;
};

export default {
  title: 'Components/Metrics/KPITile',
  tags: ['autodocs'],
  component: KPITile,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    footer: {
      control: { type: 'object' },
    },
  },
};

// Default story
export const Default = {
  args: {
    testId: 'default-kpi-tile',
    title: 'Revenue',
    metricValue: '$1,234',
    size: 'medium',
  },
};

// With TrendIndicator Footer
export const WithTrendIndicator = {
  args: {
    testId: 'kpi-tile-trend',
    title: 'Growth Rate',
    metricValue: '12.5%',
    footer: (
      <TrendIndicator
        variant="success"
        value="+5.2%"
        indicator="increase"
      />
    ),
    size: 'medium',
  },
};

// With SecondaryMetric Footer
export const WithSecondaryMetric = {
  args: {
    testId: 'kpi-tile-secondary',
    title: 'Active Users',
    metricValue: '1,234',
    footer: <SecondaryMetric value="89%" label="of target" />,
    size: 'medium',
  },
};

// Simple Sparkline example
export const WithSparkline = {
  args: {
    testId: 'kpi-tile-sparkline',
    title: 'Revenue Growth',
    metricValue: '$2.4M',
    footer: (
      <Sparkline
        data={getSampleData()}
        color="primary"
        height={30}
      />
    ),
    size: 'medium',
  },
};

// Footer Variations - Sparkline, TrendIndicator, SecondaryMetric
export const FooterVariations = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <KPITile
        testId="kpi-sparkline-footer"
        title="Revenue Growth"
        metricValue="$2.4M"
        footer={
          <Sparkline
            data={getSampleData()}
            color="primary"
            height={30}
          />
        }
        size="medium"
      />
      <KPITile
        testId="kpi-trend-footer"
        title="Growth Rate"
        metricValue="12.5%"
        footer={
          <TrendIndicator
            variant="success"
            value="+5.2%"
            indicator="increase"
          />
        }
        size="medium"
      />
      <KPITile
        testId="kpi-secondary-footer"
        title="Active Users"
        metricValue="1,234"
        footer={
          <SecondaryMetric
            value="Last 30 days"
          />
        }
        size="medium"
      />
    </div>
  ),
};

export const WithTooltip = {
  args: {
    testId: 'kpi-tile-tooltip',
    title: 'Revenue',
    metricValue: '$1,234',
    size: 'medium',
    tooltipText: 'This is a tooltip',
  },
};

export const WithLink = {
  args: {
    testId: 'kpi-tile-link',
    title: 'Revenue',
    metricValue: '$1,234',
    size: 'medium',
    link: 'https://www.mycompany.com/learn-more',
    linkText: 'Learn More',
  },
};
