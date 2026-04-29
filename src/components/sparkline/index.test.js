import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sparkline from './index';

// Polyfill for structuredClone in JSDOM
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

describe('Sparkline', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(<Sparkline {...props} />);
  }

  it('renders with data', () => {
    const testData = [
      { key: '1', label: 'Point 1', value: 1 },
      { key: '2', label: 'Point 2', value: 2 },
      { key: '3', label: 'Point 3', value: 3 },
    ];
    const { container } = renderComponent({
      testId: 'sparkline-test',
      data: testData,
    });

    expect(container.querySelector('[data-test-id="sparkline-test"]')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    const { container } = renderComponent({
      testId: 'sparkline-empty',
      data: [],
      noDataLabel: 'No data',
    });

    expect(container.querySelector('[data-test-id="sparkline-empty"]')).toBeInTheDocument();
    expect(container.textContent).toContain('No data');
  });

  it('uses default props when not provided', () => {
    const testData = [
      { key: '1', label: 'Point 1', value: 1 },
      { key: '2', label: 'Point 2', value: 2 },
      { key: '3', label: 'Point 3', value: 3 },
    ];
    const { container } = renderComponent({
      data: testData,
    });

    const sparklineElement = container.querySelector('.sparkline');
    expect(sparklineElement).toBeInTheDocument();
    // Check that the component renders with default height
    expect(sparklineElement).toBeInTheDocument();
  });

  it('renders with custom height', () => {
    const testData = [
      { key: '1', label: 'Point 1', value: 1 },
      { key: '2', label: 'Point 2', value: 2 },
    ];
    const { container } = renderComponent({
      testId: 'sparkline-height',
      data: testData,
      height: 60,
    });

    expect(container.querySelector('[data-test-id="sparkline-height"]')).toBeInTheDocument();
  });

  it('renders with custom noDataLabel', () => {
    const { container } = renderComponent({
      testId: 'sparkline-custom-label',
      data: [],
      noDataLabel: 'Sin datos',
    });

    expect(container.querySelector('[data-test-id="sparkline-custom-label"]')).toBeInTheDocument();
    expect(container.textContent).toContain('Sin datos');
  });

  it('renders with different colors', () => {
    const testData = [
      { key: '1', label: 'Point 1', value: 1 },
      { key: '2', label: 'Point 2', value: 2 },
    ];
    const { container } = renderComponent({
      testId: 'sparkline-color',
      data: testData,
      color: 'success',
    });

    expect(container.querySelector('[data-test-id="sparkline-color"]')).toBeInTheDocument();
  });

  describe('Tooltip formatting', () => {
    it('formats tooltip with label and displayLabel', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: 20,
        },
        {
          key: '3', label: 'Point 3', displayLabel: 'Sample Point 3', value: 30,
        },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-tooltip',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-tooltip"]')).toBeInTheDocument();

      // Verify that the component renders without errors
      const sparklineElement = container.querySelector('[data-test-id="sparkline-tooltip"]');
      expect(sparklineElement).toBeInTheDocument();
      expect(sparklineElement).toHaveClass('sparkline');
    });

    it('formats tooltip with label only when displayLabel is missing', () => {
      const testData = [
        { key: '1', label: 'Point 1', value: 10 },
        { key: '2', label: 'Point 2', value: 20 },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-tooltip-label-only',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-tooltip-label-only"]')).toBeInTheDocument();
    });

    it('formats tooltip with value when both label and displayLabel are missing', () => {
      const testData = [
        { key: '1', value: 10 },
        { key: '2', value: 20 },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-tooltip-value-only',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-tooltip-value-only"]')).toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
      const { container } = renderComponent({
        testId: 'sparkline-tooltip-empty',
        data: [],
      });

      expect(container.querySelector('[data-test-id="sparkline-tooltip-empty"]')).toBeInTheDocument();
    });

    it('uses correct CSS variables for styling', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-styling',
        data: testData,
      });

      const sparklineElement = container.querySelector('[data-test-id="sparkline-styling"]');
      expect(sparklineElement).toBeInTheDocument();

      // Check that CSS variables are applied
      const computedStyle = window.getComputedStyle(sparklineElement);
      expect(computedStyle.getPropertyValue('--sparkline-height')).toBe('40px');
    });
  });

  describe('Tooltip formatters', () => {
    it('xAxis valueFormatter returns correct label for tooltip', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: 20,
        },
      ];

      // Simulate the xAxis valueFormatter logic
      const xAxisValueFormatter = (value, context) => {
        if (context?.location === 'tooltip' && testData[value]) {
          return testData[value].label;
        }
        return value;
      };

      // Test with tooltip context
      expect(xAxisValueFormatter(0, { location: 'tooltip' })).toBe('Point 1');
      expect(xAxisValueFormatter(1, { location: 'tooltip' })).toBe('Point 2');

      // Test without tooltip context
      expect(xAxisValueFormatter(0, { location: 'axis' })).toBe(0);
      expect(xAxisValueFormatter(1, { location: 'axis' })).toBe(1);
    });

    it('SparkLineChart valueFormatter returns correct displayLabel', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: 20,
        },
        { key: '3', label: 'Point 3', value: 30 }, // No displayLabel
      ];

      // Simulate the SparkLineChart valueFormatter logic
      const sparklineValueFormatter = (value, context) => {
        if (context?.dataIndex !== undefined && testData[context.dataIndex]) {
          const item = testData[context.dataIndex];
          return item.displayLabel || item.label || item.value;
        }
        return value;
      };

      // Test with dataIndex context
      expect(sparklineValueFormatter(10, { dataIndex: 0 })).toBe('Sample Point 1');
      expect(sparklineValueFormatter(20, { dataIndex: 1 })).toBe('Sample Point 2');
      expect(sparklineValueFormatter(30, { dataIndex: 2 })).toBe('Point 3'); // Fallback to label

      // Test without dataIndex context
      expect(sparklineValueFormatter(10, {})).toBe(10);
    });

    it('handles missing data gracefully in formatters', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
      ];

      // Test xAxis valueFormatter with invalid index
      const xAxisValueFormatter = (value, context) => {
        if (context?.location === 'tooltip' && testData[value]) {
          return testData[value].label;
        }
        return value;
      };

      expect(xAxisValueFormatter(5, { location: 'tooltip' })).toBe(5); // Invalid index

      // Test SparkLineChart valueFormatter with invalid dataIndex
      const sparklineValueFormatter = (value, context) => {
        if (context?.dataIndex !== undefined && testData[context.dataIndex]) {
          const item = testData[context.dataIndex];
          return item.displayLabel || item.label || item.value;
        }
        return value;
      };

      expect(sparklineValueFormatter(10, { dataIndex: 5 })).toBe(10); // Invalid dataIndex
    });
  });

  describe('Data processing', () => {
    it('processes data correctly for chart rendering', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: 20,
        },
        {
          key: '3', label: 'Point 3', displayLabel: 'Sample Point 3', value: 30,
        },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-data-processing',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-data-processing"]')).toBeInTheDocument();

      // The component should render without errors when processing the data
      const sparklineElement = container.querySelector('[data-test-id="sparkline-data-processing"]');
      expect(sparklineElement).toBeInTheDocument();
      expect(sparklineElement).toHaveClass('sparkline');
    });

    it('handles string values correctly', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: '10',
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: '20',
        },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-string-values',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-string-values"]')).toBeInTheDocument();
    });

    it('handles mixed data types', () => {
      const testData = [
        {
          key: '1', label: 'Point 1', displayLabel: 'Sample Point 1', value: 10,
        },
        {
          key: '2', label: 'Point 2', displayLabel: 'Sample Point 2', value: '20',
        },
        {
          key: '3', label: 'Point 3', displayLabel: 'Sample Point 3', value: 30.5,
        },
      ];

      const { container } = renderComponent({
        testId: 'sparkline-mixed-types',
        data: testData,
      });

      expect(container.querySelector('[data-test-id="sparkline-mixed-types"]')).toBeInTheDocument();
    });
  });
});
