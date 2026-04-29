import React, { useState, useRef } from 'react';
import LineChart from './index';
import sampleData from './sample-data.json';

const convertToLineChartFormat = (data, options = {}) => {
  if (!data || data.length === 0) {
    return {
      series: [],
      xAxis: [],
      yAxis: [],
    };
  }

  const {
    seriesId = 'series1',
    seriesLabel = 'Series',
    yAxisLabel = 'Value',
    area = false,
    showMark = false,
  } = options;

  return {
    series: [
      {
        id: seriesId,
        label: seriesLabel,
        data: data.map((item) => parseFloat(item.value) || 0),
        area,
        showMark,
      },
    ],
    xAxis: [
      {
        id: 'x-axis',
        data: data.map((item) => item.label),
        scaleType: 'point',
      },
    ],
    yAxis: [
      {
        id: 'y-axis',
        label: yAxisLabel,
      },
    ],
  };
};

// Helper function to convert multiple series
const convertMultipleSeries = (seriesData, yAxisLabel = 'Value', useAlternativeLabels = false) => {
  const series = [];
  const { metadata } = seriesData;
  const seriesKeys = Object.keys(seriesData).filter((key) => key !== 'metadata');
  const firstSeriesKey = seriesKeys[0];
  const firstSeries = seriesData[firstSeriesKey];

  if (!firstSeries || firstSeries.length === 0) {
    return {
      series: [],
      xAxis: [],
      yAxis: [],
    };
  }

  seriesKeys.forEach((key) => {
    const data = seriesData[key];
    let label = key.charAt(0).toUpperCase() + key.slice(1);

    // Use metadata labels if available
    if (metadata?.seriesLabels?.[key]) {
      label = metadata.seriesLabels[key];
    }

    // Use alternative labels if requested
    if (useAlternativeLabels && metadata?.alternativeLabels?.[key]) {
      label = metadata.alternativeLabels[key];
    }

    series.push({
      id: key,
      label,
      data: data.map((item) => parseFloat(item.value) || 0),
    });
  });

  return {
    series,
    xAxis: [
      {
        id: 'x-axis',
        data: firstSeries.map((item) => item.label),
        scaleType: 'point',
      },
    ],
    yAxis: [
      {
        id: 'y-axis',
        label: yAxisLabel,
      },
    ],
  };
};

export default {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A line chart component for displaying data trends over time or categories. Built on top of MUI X LineChartPro with full customization support.',
      },
    },
  },
  argTypes: {
    apiRef: {
      control: false,
      description: 'Ref object to access chart API methods like exportImage() and exportPrint(). Create using React.useRef(null).',
      table: {
        type: { summary: 'React.RefObject' },
      },
    },
    testId: {
      control: 'text',
      description: 'Test ID for the component',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional title for the chart. When provided, it will be displayed above the chart aligned with the legend.',
      table: {
        type: { summary: 'string' },
      },
    },
    series: {
      control: 'object',
      description: 'Array of line series to display. Each series should have id, label, and data properties.',
      table: {
        type: { summary: 'array' },
      },
    },
    xAxis: {
      control: 'object',
      description: 'Array of x-axis configurations',
      table: {
        type: { summary: 'array' },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Array of y-axis configurations',
      table: {
        type: { summary: 'array' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the chart in pixels',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the chart in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '400' },
      },
    },
    colors: {
      control: 'object',
      description: 'Array of colors for the series. Can use color names (primary, secondary, etc.) or CSS variables.',
      table: {
        type: { summary: 'array' },
      },
    },
    margin: {
      control: 'object',
      description: 'Chart margins',
      table: {
        type: { summary: 'object' },
      },
    },
    grid: {
      control: 'object',
      description: 'Grid configuration',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ horizontal: true, vertical: true }' },
      },
    },
    hideLegend: {
      control: 'boolean',
      description: 'Hide the legend',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner while data is being fetched. Maintains chart height to prevent layout shift.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noDataLabel: {
      control: 'text',
      description: 'Label to show when there is no data',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

// Default story - Single series
const defaultChart = convertToLineChartFormat(sampleData.default, {
  seriesLabel: 'Sales',
  yAxisLabel: 'Sales ($)',
});

export const Default = {
  args: {
    testId: 'default-line-chart',
    title: 'Sales Overview',
    series: defaultChart.series,
    xAxis: defaultChart.xAxis,
    yAxis: defaultChart.yAxis,
    height: 400,
    noDataLabel: 'No data available',
  },
};

// With currency formatting
const currencyFormatter = (value) => {
  if (value === null || value === undefined) return '';
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${Math.round(value)}`;
};

export const WithCurrencyFormat = {
  render: () => {
    const revenueData = [
      { label: 'Oct 5', value: 1200 },
      { label: 'Oct 12', value: 1000 },
      { label: 'Oct 19', value: 1050 },
      { label: 'Oct 26', value: 1800 },
      { label: 'Nov 2', value: 2000 },
    ];

    const revenueChart = convertToLineChartFormat(revenueData, {
      seriesLabel: 'Revenue',
      yAxisLabel: 'Revenue',
      area: true,
    });

    return (
      <LineChart
        testId="currency-line-chart"
        title="Revenue & Profit"
        series={revenueChart.series}
        xAxis={revenueChart.xAxis}
        yAxis={revenueChart.yAxis.map((axis) => ({
          ...axis,
          valueFormatter: currencyFormatter,
        }))}
        variant="area"
        grid={{ horizontal: false, vertical: false }}
        height={400}
      />
    );
  },
};

// Custom X-axis - Comparison example
export const CustomAxisComparison = {
  render: () => {
    const chartData = convertToLineChartFormat(sampleData.customAxisDemo, {
      seriesId: 'revenue',
      seriesLabel: 'Monthly Revenue',
      yAxisLabel: 'Revenue ($)',
      area: true,
    });

    // Create custom xAxis with shortened labels for axis but full labels in tooltip
    const customXAxis = chartData.xAxis.map((axis) => {
      const fullLabels = [...axis.data];
      const shortLabels = fullLabels.map((label) => label.split(',')[0]); // "JAN 1, 2025" -> "JAN 1"

      return {
        ...axis,
        data: shortLabels,
        valueFormatter: (value, context) => {
          // Show full label in tooltip
          if (context?.location === 'tooltip') {
            const index = shortLabels.indexOf(value);
            return index !== -1 ? fullLabels[index] : value;
          }
          return value;
        },
      };
    });

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexDirection: 'column' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>
            With custom xAxis - Short labels on axis (JAN 1), full in tooltip (JAN 1, 2025)
          </h4>
          <LineChart
            testId="with-custom-x-axis"
            title="Revenue with Custom Axis"
            series={chartData.series}
            xAxis={customXAxis}
            yAxis={chartData.yAxis}
            variant="area"
            grid={{ horizontal: false, vertical: false }}
            height={300}
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>
            Without custom xAxis - Full labels everywhere (JAN 1, 2025)
          </h4>
          <LineChart
            testId="without-custom-x-axis"
            title="Revenue with Default Axis"
            series={chartData.series}
            xAxis={chartData.xAxis}
            yAxis={chartData.yAxis}
            variant="area"
            grid={{ horizontal: false, vertical: false }}
            height={300}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates custom X-axis configuration using the `customAxisDemo` data. The top chart uses a custom xAxis to display shortened labels (e.g., "JAN 1") on the X-axis while keeping full labels (e.g., "JAN 1, 2025") in tooltips. The bottom chart shows the default behavior, displaying full labels everywhere. This is useful when you have long date labels that would clutter the axis.',
      },
    },
  },
};

// Multiple series
const multipleSeriesChart = convertMultipleSeries(sampleData.multipleSeries, 'Amount ($)');

export const MultipleSeries = {
  args: {
    testId: 'multiple-series-line-chart',
    title: 'Revenue Comparison',
    series: multipleSeriesChart.series,
    xAxis: multipleSeriesChart.xAxis,
    yAxis: multipleSeriesChart.yAxis,
    height: 400,
    noDataLabel: 'No data available',
  },
};

// Multiple series with all categorical colors and no markers
const multipleColorsChart = convertMultipleSeries(sampleData.eightProducts, 'Sales ($)');

export const MultipleColorsNoMarkers = {
  args: {
    testId: 'multiple-colors-no-markers-line-chart',
    title: 'Product Performance Comparison',
    series: multipleColorsChart.series.map((s) => ({
      ...s,
      showMark: false,
    })),
    xAxis: multipleColorsChart.xAxis,
    yAxis: multipleColorsChart.yAxis,
    colors: [
      'var(--cat-10)',
      'var(--cat-20)',
      'var(--cat-30)',
      'var(--cat-40)',
      'var(--cat-50)',
      'var(--cat-60)',
      'var(--cat-70)',
      'var(--cat-80)',
    ],
    height: 400,
  },
};

// Multiple series with linear curves (straight lines)
const multipleLinearChart = convertMultipleSeries(sampleData.eightProducts, 'Sales ($)');

export const MultipleLinearLines = {
  args: {
    testId: 'multiple-linear-lines-line-chart',
    title: 'Product Performance Comparison (Linear)',
    series: multipleLinearChart.series.map((s) => ({
      ...s,
      curve: 'linear',
      showMark: false,
    })),
    xAxis: multipleLinearChart.xAxis,
    yAxis: multipleLinearChart.yAxis,
    colors: [
      'var(--cat-10)',
      'var(--cat-20)',
      'var(--cat-30)',
      'var(--cat-40)',
      'var(--cat-50)',
      'var(--cat-60)',
      'var(--cat-70)',
      'var(--cat-80)',
    ],
    height: 400,
  },
};

// Area chart
const areaChart = convertToLineChartFormat(sampleData.areaChart, {
  seriesLabel: 'Users',
  yAxisLabel: 'Users',
  area: true,
});

export const AreaChart = {
  args: {
    testId: 'area-line-chart',
    title: 'User Growth',
    series: areaChart.series,
    xAxis: areaChart.xAxis,
    yAxis: areaChart.yAxis,
    height: 400,
  },
};

// Gradient variant
const gradientChart = convertToLineChartFormat(sampleData.default, {
  seriesLabel: 'Sales',
  yAxisLabel: 'Sales ($)',
  area: true,
});

export const Gradient = {
  args: {
    testId: 'gradient-line-chart',
    title: 'Sales Trend',
    series: gradientChart.series,
    xAxis: gradientChart.xAxis,
    yAxis: gradientChart.yAxis,
    height: 400,
    variant: 'area',
  },
};

// Gradient with straight lines (linear)
const gradientLinearChart = convertToLineChartFormat(sampleData.default, {
  seriesLabel: 'Sales',
  yAxisLabel: 'Sales ($)',
  area: true,
  showMark: false,
});

// Apply linear curve to make straight lines instead of curves
gradientLinearChart.series = gradientLinearChart.series.map((s) => ({
  ...s,
  curve: 'linear',
}));

export const GradientLinear = {
  args: {
    testId: 'gradient-linear-line-chart',
    title: 'Linear Trend Analysis',
    series: gradientLinearChart.series,
    xAxis: gradientLinearChart.xAxis,
    yAxis: gradientLinearChart.yAxis,
    height: 400,
    variant: 'area',
  },
};

// Multiple series with custom gradient colors
export const MultipleGradientsCustomColors = {
  render: () => {
    const multiChart = convertMultipleSeries(sampleData.orders, 'Orders', true);

    multiChart.series = multiChart.series.map((s, index) => {
      const colors = [
        'var(--seq-10)', // Sales Revenue
        'var(--seq-20)', // Gross Profit
      ];

      return {
        ...s,
        area: true,
        curve: 'linear',
        showMark: false,
        color: colors[index],
      };
    });

    return (
      <LineChart
        testId="multiple-gradients-custom"
        title="Multiple Series with Custom Gradient Colors"
        series={multiChart.series}
        xAxis={multiChart.xAxis}
        yAxis={multiChart.yAxis}
        variant="area"
        grid={{ horizontal: false, vertical: false }}
        height={400}
      />
    );
  },
};

// Orders & Cancellations example
export const OrdersAndCancellations = {
  render: () => {
    const ordersChart = convertMultipleSeries(sampleData.orders, 'Orders', false);

    ordersChart.series = ordersChart.series.map((s, index) => {
      const colors = [
        'var(--seq-10)', // Total Orders
        'var(--seq-20)', // Cancelled Orders
      ];

      return {
        ...s,
        area: true,
        curve: 'linear',
        showMark: false,
        color: colors[index],
      };
    });

    return (
      <LineChart
        testId="orders-cancellations"
        title="Orders & Cancellations"
        series={ordersChart.series}
        xAxis={ordersChart.xAxis}
        yAxis={ordersChart.yAxis}
        variant="area"
        grid={{ horizontal: false, vertical: false }}
        height={400}
      />
    );
  },
};

// Gradient variants comparison
export const GradientVariants = {
  render: () => {
    // Gradient with smooth curves
    const smoothChart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
      area: true,
    });

    // Gradient with straight lines
    const linearChart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
      area: true,
    });
    linearChart.series = linearChart.series.map((s) => ({ ...s, curve: 'linear' }));

    // Gradient with straight lines
    const linearChart2 = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
      area: true,
      showMark: false,
    });
    linearChart2.series = linearChart2.series.map((s) => ({ ...s, curve: 'linear' }));

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexDirection: 'column' }}>
        <LineChart
          testId="gradient-smooth"
          title="Gradient with Smooth Curves"
          series={smoothChart.series}
          xAxis={smoothChart.xAxis}
          yAxis={smoothChart.yAxis}
          variant="area"
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
        <LineChart
          testId="gradient-linear"
          title="Gradient with Straight Lines"
          series={linearChart.series}
          xAxis={linearChart.xAxis}
          yAxis={linearChart.yAxis}
          variant="area"
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
      </div>
    );
  },
};

// With marks
const marksChart = convertToLineChartFormat(sampleData.withMarks, {
  seriesLabel: 'Temperature',
  yAxisLabel: 'Temperature (°C)',
  showMark: true,
});

export const WithMarks = {
  args: {
    testId: 'marks-line-chart',
    series: marksChart.series,
    xAxis: marksChart.xAxis,
    yAxis: marksChart.yAxis,
    height: 400,
  },
};

// Different colors
export const Colors = {
  render: () => {
    const primaryChart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
    });
    const successChart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
    });
    const errorChart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
    });
    const multipleChart = convertMultipleSeries(sampleData.multipleSeries, 'Amount ($)');

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexDirection: 'column' }}>
        <LineChart
          testId="line-chart-primary"
          title="Primary Color"
          series={primaryChart.series}
          xAxis={primaryChart.xAxis}
          yAxis={primaryChart.yAxis}
          colors={['primary']}
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
        <LineChart
          testId="line-chart-success"
          title="Success Color"
          series={successChart.series}
          xAxis={successChart.xAxis}
          yAxis={successChart.yAxis}
          colors={['success']}
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
        <LineChart
          testId="line-chart-error"
          title="Error Color"
          series={errorChart.series}
          xAxis={errorChart.xAxis}
          yAxis={errorChart.yAxis}
          colors={['error']}
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
        <LineChart
          testId="line-chart-multiple-colors"
          title="Multiple Colors"
          series={multipleChart.series}
          xAxis={multipleChart.xAxis}
          yAxis={multipleChart.yAxis}
          colors={['primary', 'success', 'error']}
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes = {
  render: () => {
    const chart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
    });

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexDirection: 'column' }}>
        <LineChart
          testId="line-chart-small"
          title="Small (300px)"
          series={chart.series}
          xAxis={chart.xAxis}
          yAxis={chart.yAxis}
          grid={{ horizontal: false, vertical: false }}
          height={300}
        />
        <LineChart
          testId="line-chart-medium"
          title="Medium (400px)"
          series={chart.series}
          xAxis={chart.xAxis}
          yAxis={chart.yAxis}
          grid={{ horizontal: false, vertical: false }}
          height={400}
        />
        <LineChart
          testId="line-chart-large"
          title="Large (600px)"
          series={chart.series}
          xAxis={chart.xAxis}
          yAxis={chart.yAxis}
          grid={{ horizontal: false, vertical: false }}
          height={600}
        />
      </div>
    );
  },
};

// Without legend
export const WithoutLegend = {
  args: {
    testId: 'no-legend-line-chart',
    series: multipleSeriesChart.series,
    xAxis: multipleSeriesChart.xAxis,
    yAxis: multipleSeriesChart.yAxis,
    height: 400,
    hideLegend: true,
  },
};

// Custom grid
export const CustomGrid = {
  render: () => {
    const chart = convertToLineChartFormat(sampleData.default, {
      seriesLabel: 'Sales',
      yAxisLabel: 'Sales ($)',
    });

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexDirection: 'column' }}>
        <div>
          <h4>Horizontal Only</h4>
          <LineChart
            testId="line-chart-horizontal-grid"
            series={chart.series}
            xAxis={chart.xAxis}
            yAxis={chart.yAxis}
            grid={{ horizontal: true, vertical: false }}
            height={300}
          />
        </div>
        <div>
          <h4>Vertical Only</h4>
          <LineChart
            testId="line-chart-vertical-grid"
            series={chart.series}
            xAxis={chart.xAxis}
            yAxis={chart.yAxis}
            grid={{ horizontal: false, vertical: true }}
            height={300}
          />
        </div>
        <div>
          <h4>No Grid</h4>
          <LineChart
            testId="line-chart-no-grid"
            series={chart.series}
            xAxis={chart.xAxis}
            yAxis={chart.yAxis}
            grid={{ horizontal: false, vertical: false }}
            height={300}
          />
        </div>
      </div>
    );
  },
};

// No data state
export const NoData = {
  args: {
    testId: 'line-chart-no-data',
    series: [],
    xAxis: [],
    yAxis: [],
    height: 400,
    noDataLabel: 'No data available',
  },
};

// Loading state
const loadingChart = convertToLineChartFormat(sampleData.default, {
  seriesLabel: 'Sales',
  yAxisLabel: 'Sales ($)',
});

export const Loading = {
  args: {
    testId: 'line-chart-loading',
    title: 'Sales Overview',
    series: loadingChart.series,
    xAxis: loadingChart.xAxis,
    yAxis: loadingChart.yAxis,
    height: 400,
    isLoading: true,
    grid: { horizontal: false, vertical: false },
  },
};

// Interactive loading simulation
export const LoadingSimulation = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
      series: [],
      xAxis: [],
      yAxis: [],
    });

    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const loadedChart = convertToLineChartFormat(sampleData.default, {
          seriesLabel: 'Sales',
          yAxisLabel: 'Sales ($)',
        });
        setData(loadedChart);
        setIsLoading(false);
      }, 2000);
    };

    // Load data on mount
    React.useEffect(() => {
      loadData();
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: isLoading ? 'var(--text-disabled)' : 'var(--primary-main)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {isLoading ? 'Loading...' : 'Reload Data'}
          </button>
        </div>
        <LineChart
          testId="line-chart-loading-simulation"
          title="Sales Overview"
          series={data.series}
          xAxis={data.xAxis}
          yAxis={data.yAxis}
          height={400}
          isLoading={isLoading}
          noDataLabel="No data available"
          grid={{ horizontal: false, vertical: false }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates the loading state behavior. Click the "Reload Data" button to simulate data loading. The chart maintains its height while showing a spinner during the loading process.',
      },
    },
  },
};

// Custom margins
export const CustomMargins = {
  args: {
    testId: 'line-chart-custom-margins',
    series: defaultChart.series,
    xAxis: defaultChart.xAxis,
    yAxis: defaultChart.yAxis,
    height: 400,
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 60,
    },
  },
};

// External export button - demonstrates how to use apiRef to export from outside the component
const externalExportChart = convertMultipleSeries(sampleData.multipleSeries, 'Amount ($)');

const ExternalExportButtonComponent = () => {
  const apiRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleExportClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleExportPNG = () => {
    if (apiRef.current) {
      apiRef.current.exportAsImage({ type: 'image/png' });
    } else {
      // eslint-disable-next-line no-console
      console.error('Chart API is not available');
    }
    handleCloseMenu();
  };

  const handlePrint = () => {
    if (apiRef.current) {
      apiRef.current.exportAsPrint();
    } else {
      // eslint-disable-next-line no-console
      console.error('Chart API is not available');
    }
    handleCloseMenu();
  };

  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            <button
              type="button"
              onClick={handleExportClick}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--primary-main)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
              </svg>
              Export Chart
            </button>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  minWidth: '180px',
                  zIndex: 1000,
                }}
              >
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--background-secondary)'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                  </svg>
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleExportPNG}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--background-secondary)'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                  Export as PNG
                </button>
              </div>
            )}
        </div>
        <LineChart
          testId="external-export-chart"
          apiRef={apiRef}
          title="Revenue Comparison"
          series={externalExportChart.series}
          xAxis={externalExportChart.xAxis}
          yAxis={externalExportChart.yAxis}
          height={400}
          showToolbar={false}
        />
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: '4px',
            marginTop: '16px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
            Implementation Example:
          </h4>
          <pre
            style={{
              margin: 0,
              padding: '12px',
              backgroundColor: 'var(--background-primary)',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
              color: 'var(--text-secondary)',
            }}
          >
            {`import React, { useRef } from 'react';
import LineChart from './components/line-chart';
function MyComponent() {
  const apiRef = useRef(null);
  const handlePrint = () => {
    if (apiRef.current) {
      apiRef.current.exportAsPrint();
    }
  };
  const handleExportPNG = () => {
    if (apiRef.current) {
      apiRef.current.exportAsImage({ type: 'image/png' });
    }
  };
  const series = [
    { id: 'revenue', label: 'Revenue', data: [4000, 3000, 2000] },
  ];
  const xAxis = [
    { id: 'months', data: ['Jan', 'Feb', 'Mar'], scaleType: 'point' },
  ];
  const yAxis = [
    { id: 'amount', label: 'Amount ($)' },
  ];
  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <button onClick={handleExportPNG}>Export PNG</button>
      <LineChart 
        apiRef={apiRef} 
        series={series}
        xAxis={xAxis}
        yAxis={yAxis}
        height={400}
      />
    </div>
  );
}`}
          </pre>
        </div>
      </div>
  );
};

export const ExternalExportButton = {
  render: () => <ExternalExportButtonComponent />,
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates how to control chart export functionality from outside the component using apiRef. The export button is completely external to the LineChart component, giving you full control over the UI and behavior.',
      },
    },
  },
};
