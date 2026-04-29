import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LineChart, { LINE_CHART_COLOR_VARIABLES } from './index';

// Polyfill for structuredClone in JSDOM
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

describe('LineChart', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(<LineChart {...props} />);
  }

  const mockSeries = [
    {
      id: 'series1',
      label: 'Sales',
      data: [100, 200, 150, 300, 250],
    },
  ];

  const mockXAxis = [
    {
      id: 'x-axis',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      scaleType: 'point',
    },
  ];

  const mockYAxis = [
    {
      id: 'y-axis',
      label: 'Amount ($)',
    },
  ];

  describe('Title rendering', () => {
    it('renders title in h3 element and uses wrapper component', () => {
      const { container } = renderComponent({
        testId: 'with-title',
        title: 'Sales Overview',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        noDataLabel: 'No data',
      });

      const titleElement = container.querySelector('h3');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Sales Overview');

      // Should use StyledLineChartWrapper as outer container
      const wrapper = container.querySelector('[data-test-id="with-title"]');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.firstChild).toBe(titleElement);
    });

    it('renders h3 element even when title is empty string', () => {
      const { container } = renderComponent({
        testId: 'without-title',
        title: '',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        noDataLabel: 'No data',
      });

      // h3 element is always rendered
      const titleElement = container.querySelector('h3');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('');

      // Should use StyledLineChartWrapper as outer container
      const wrapper = container.querySelector('[data-test-id="without-title"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('shows EmptyMessage component when no data is provided', () => {
      const { container } = renderComponent({
        title: 'Chart Title',
        series: [],
        xAxis: [],
        yAxis: [],
        noDataLabel: 'No data available',
      });

      // Should render EmptyMessage with the provided label
      expect(container.textContent).toContain('No data available');

      // Should not render the chart (MUI's LineChartPro) - verify by checking for chart-specific class
      expect(container.querySelector('.MuiLineChart-root')).not.toBeInTheDocument();
    });

    it('passes custom noDataLabel to EmptyMessage', () => {
      const customLabel = 'Custom empty message';
      const { container } = renderComponent({
        title: 'Chart Title',
        series: [],
        xAxis: [],
        yAxis: [],
        noDataLabel: customLabel,
      });

      expect(container.textContent).toContain(customLabel);
    });

    it('detects empty state when series has data arrays with no values', () => {
      const emptySeries = [
        { id: 'series1', label: 'Sales', data: [] },
        { id: 'series2', label: 'Revenue', data: [] },
      ];

      const { container } = renderComponent({
        title: 'Chart Title',
        series: emptySeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        noDataLabel: 'No data',
      });

      expect(container.textContent).toContain('No data');
      // Should not render the chart (MUI's LineChartPro) - verify by checking for chart-specific class
      expect(container.querySelector('.MuiLineChart-root')).not.toBeInTheDocument();
    });

    it('renders empty state with title in correct structure', () => {
      const { container } = renderComponent({
        title: 'Empty Chart',
        series: [],
        xAxis: [],
        yAxis: [],
        noDataLabel: 'No data available',
      });

      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Empty Chart');

      // Both title and empty message should be visible
      expect(container.textContent).toContain('Empty Chart');
      expect(container.textContent).toContain('No data available');
    });
  });

  describe('Chart rendering with data', () => {
    it('renders chart when data is provided and not EmptyMessage', () => {
      const { container } = renderComponent({
        title: 'Chart Title',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        noDataLabel: 'No data',
      });

      // Should render the chart (has SVG from MUI)
      expect(container.querySelector('svg')).toBeInTheDocument();

      // Should not show empty message
      expect(container.textContent).not.toContain('No data');
    });

    it('applies className to wrapper element', () => {
      const { container } = renderComponent({
        title: 'Chart Title',
        className: 'custom-class',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        noDataLabel: 'No data',
      });

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Loading state', () => {
    it('shows spinner overlay during loading and maintains content to prevent layout shift', () => {
      const { container } = renderComponent({
        title: 'Sales Chart',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
        isLoading: true,
        noDataLabel: 'No data',
      });

      // Dimmer components should be present when loading
      const backdrop = container.querySelector('[data-test-id="dimmer-backdrop"]');
      expect(backdrop).toBeInTheDocument();

      const spinner = container.querySelector('.MuiCircularProgress-root');
      expect(spinner).toBeInTheDocument();

      // Content structure should be maintained to preserve component height
      expect(container.textContent).toContain('Sales Chart');
    });
  });

  describe('Color processing', () => {
    // Helper function that mimics the component's color processing logic
    const processColors = (colors) => (colors
      ? colors.map((color) => {
        if (typeof color === 'string' && color.startsWith('var(--')) {
          return color;
        }
        if (typeof color === 'string' && LINE_CHART_COLOR_VARIABLES.includes(color)) {
          return `var(--${color}-main)`;
        }
        return color;
      })
      : undefined);

    it('converts all valid semantic color names to CSS variables', () => {
      const result = processColors(LINE_CHART_COLOR_VARIABLES);
      const expected = LINE_CHART_COLOR_VARIABLES.map((color) => `var(--${color}-main)`);
      expect(result).toEqual(expected);
    });

    it('converts semantic color names to CSS variables', () => {
      const result = processColors(['primary', 'secondary', 'success']);
      expect(result).toEqual([
        'var(--primary-main)',
        'var(--secondary-main)',
        'var(--success-main)',
      ]);
    });

    it('preserves sequential color variables unchanged', () => {
      const result = processColors(['var(--seq-10)', 'var(--seq-20)', 'var(--seq-30)']);
      expect(result).toEqual(['var(--seq-10)', 'var(--seq-20)', 'var(--seq-30)']);
    });

    it('preserves categorical color variables unchanged', () => {
      const result = processColors(['var(--cat-10)', 'var(--cat-20)', 'var(--cat-30)']);
      expect(result).toEqual(['var(--cat-10)', 'var(--cat-20)', 'var(--cat-30)']);
    });

    it('preserves dataviz color variables unchanged', () => {
      const result = processColors(['var(--dataviz-blue)', 'var(--dataviz-red)', 'var(--dataviz-green)']);
      expect(result).toEqual(['var(--dataviz-blue)', 'var(--dataviz-red)', 'var(--dataviz-green)']);
    });

    it('handles mixed semantic and CSS variable colors', () => {
      const result = processColors([
        'primary',
        'var(--seq-10)',
        'secondary',
        'var(--cat-20)',
        'success',
        'var(--dataviz-blue)',
      ]);

      expect(result).toEqual([
        'var(--primary-main)',
        'var(--seq-10)',
        'var(--secondary-main)',
        'var(--cat-20)',
        'var(--success-main)',
        'var(--dataviz-blue)',
      ]);
    });

    it('returns undefined for null or undefined input', () => {
      expect(processColors(null)).toBeUndefined();
      expect(processColors(undefined)).toBeUndefined();
    });

    it('handles empty array', () => {
      const result = processColors([]);
      expect(result).toEqual([]);
    });

    it('does not convert invalid color names', () => {
      const result = processColors(['invalid-color', 'random', 'notAColor']);
      expect(result).toEqual(['invalid-color', 'random', 'notAColor']);
    });
  });

  describe('customXAxis prop', () => {
    it('uses customXAxis when provided, allowing different labels and valueFormatter', () => {
      const fullLabels = ['JAN 1, 2025', 'FEB 1, 2025', 'MAR 1, 2025'];
      const shortLabels = ['JAN 1', 'FEB 1', 'MAR 1'];
      const mockValueFormatter = jest.fn((value, context) => {
        if (context?.location === 'tooltip') {
          const index = shortLabels.indexOf(value);
          return fullLabels[index] || value;
        }
        return value;
      });

      const customXAxis = [
        {
          id: 'custom-x-axis',
          data: shortLabels,
          scaleType: 'point',
          valueFormatter: mockValueFormatter,
        },
      ];

      const { container } = renderComponent({
        title: 'Chart with Custom X Axis',
        series: [
          {
            id: 'series1',
            label: 'Revenue',
            data: [100, 200, 150],
          },
        ],
        xAxis: [
          {
            id: 'x-axis',
            data: fullLabels,
            scaleType: 'point',
          },
        ],
        customXAxis,
        yAxis: mockYAxis,
      });

      // Chart should render with custom axis
      expect(container.querySelector('.MuiChartsAxis-root')).toBeInTheDocument();
      // LineChartPro should be rendered (not EmptyMessage)
      const emptyMessage = container.querySelector('.MuiChartsAxis-root')?.closest('div')?.textContent;
      expect(emptyMessage).not.toContain('No data');
    });

    it('falls back to xAxis when customXAxis is not provided', () => {
      const { container } = renderComponent({
        title: 'Chart with Regular X Axis',
        series: mockSeries,
        xAxis: mockXAxis,
        yAxis: mockYAxis,
      });

      // Chart should render with regular xAxis
      expect(container.querySelector('.MuiChartsAxis-root')).toBeInTheDocument();
      // LineChartPro should be rendered (not EmptyMessage)
      const emptyMessage = container.querySelector('.MuiChartsAxis-root')?.closest('div')?.textContent;
      expect(emptyMessage).not.toContain('No data');
    });
  });
});
