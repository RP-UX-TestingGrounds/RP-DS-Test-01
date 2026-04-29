import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { LineChartPro } from '@mui/x-charts-pro/LineChartPro';
import { ChartsLegend } from '@mui/x-charts-pro';

import Dimmer from '../dimmer';
import EmptyMessage from '../empty-message';
import Spinner from '../spinner';

const LineChartWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
}));

const LineChartTitle = styled('h3')(() => ({
  position: 'absolute',
  top: '6px',
  left: 0,
  margin: 0,
  zIndex: 1,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--heading-3-size)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-medium)',
  letterSpacing: 'var(--letter-spacing-md)',
}));

const StyledLineChart = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'var(--line-chart-height)',
  fontFamily: 'var(--font-family)',
  '& .MuiLineChart-root': {
    width: '100%',
    height: '100%',
  },
  '& .MuiChartsAxis-root': {
    '& .MuiChartsAxis-tickLabel': {
      fill: 'var(--text-secondary)',
      fontFamily: 'var(--font-family) !important',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-regular)',
      lineHeight: 'var(--line-height-normal)',
    },
    '& .MuiChartsAxis-label': {
      display: 'none',
      fill: 'var(--text-primary)',
      fontFamily: 'var(--font-family)',
      fontSize: 'var(--font-size-md)',
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: 'var(--line-height-normal)',
    },
    '& .MuiChartsAxis-line': {
      stroke: 'var(--border-primary)',
    },
    '& .MuiChartsAxis-tick': {
      stroke: 'var(--border-primary)',
    },
  },
  '& .MuiChartsGrid-root': {
    '& .MuiChartsGrid-line': {
      stroke: 'var(--border-primary)',
      strokeOpacity: 0.5,
    },
  },
  '& .MuiChartsLegend-root': {
    '& .MuiChartsLegend-label': {
      fill: 'var(--text-primary)',
      fontFamily: 'var(--font-family)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-regular)',
      lineHeight: 'var(--line-height-normal)',
    },
  },
  '& .MuiLineElement-root': {
    strokeWidth: 'var(--line-chart-stroke-width)',
  },
  '& .MuiAreaElement-root': {
    fillOpacity: 'var(--line-chart-area-opacity)',
    mask: 'var(--line-chart-mask)',
  },
  '& .MuiChartsLabelMark-root.MuiChartsLabelMark-line .MuiChartsLabelMark-mask': {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    rx: 6,
    ry: 6,
  },
}));

// Styled Legend component
const StyledChartsLegend = styled(ChartsLegend)(() => ({
  '&.MuiChartsLegend-root': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  '& .MuiChartsLegend-series': {
    display: 'flex',
    justifyContent: 'center',
    gap: 0,
  },
  '& .MuiChartsLegend-mark': {
    width: 12,
    height: 12,
    rx: 6,
    ry: 6,
  },
  '& .MuiChartsLegend-label': {
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-normal)',
  },
}));

export const LINE_CHART_COLORS = ['default', 'error', 'info', 'primary', 'secondary', 'success', 'warning'];
export const LINE_CHART_CURVES = ['basis', 'cardinal', 'catmullRom', 'linear', 'monotoneX', 'monotoneY', 'natural', 'step', 'stepAfter', 'stepBefore'];
export const LINE_CHART_VARIANTS = ['area', 'line'];
export const LINE_CHART_COLOR_VARIABLES = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'default'];

export default function LineChart({
  apiRef,
  className,
  colors,
  grid = {
    horizontal: false,
    vertical: false,
  },
  hideLegend = false,
  isLoading = false,
  margin = {
    bottom: 30,
    left: 0,
    right: 10,
    top: 60,
  },
  noDataLabel,
  series = [],
  testId,
  title,
  variant = 'area',
  width,
  xAxis = [],
  yAxis = [],
  ...otherProps
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  // Process colors to use CSS variables
  const processedColors = colors
    ? colors.map((color) => {
      if (typeof color === 'string' && color.startsWith('var(--')) {
        return color;
      }
      if (typeof color === 'string' && LINE_CHART_COLOR_VARIABLES.includes(color)) {
        return `var(--${color}-main)`;
      }
      return color;
    })
    : undefined;

  // Check if we have valid data
  const hasData = series && series.length > 0 && series.some((s) => s.data && s.data.length > 0);

  // Determine effective variant: if 3 or more series, force line variant
  const effectiveVariant = series.length >= 3 ? 'line' : variant;

  // Process series: if variant is area, ensure area is true
  const processedSeries = effectiveVariant === 'area'
    ? series.map((s) => ({ ...s, area: true }))
    : series;

  const style = {
    '--line-chart-area-opacity': effectiveVariant === 'area' ? '1' : '0.3',
    '--line-chart-mask': effectiveVariant === 'area'
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)'
      : 'none',
    '--line-chart-stroke-width': '2px',
  };

  // Define custom slots with styled components
  const customSlots = {
    legend: StyledChartsLegend,
  };

  // Legend configuration for horizontal legend
  const legendSlotProps = {
    direction: 'horizontal',
    position: { horizontal: 'middle', vertical: 'bottom' },
  };

  // Tooltip configuration
  const tooltipSlotProps = {
    sx: {
      '.MuiChartsTooltip-table caption': {
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-family)',
      },
    },
  };

  // FIREFOX FIX: Firefox does not like the --var(--font-family) from the theme,
  // But ONLY when rendering the x-axis labels. This change updates the font family to sans-serif,
  // which allows the x-axis to render (and get overridden by the CSS above)
  const processedXAxis = xAxis.map((axis) => ({
    ...axis,
    tickLabelStyle: {
      fontFamily: 'sans-serif',
      ...(axis.tickLabelStyle || {}),
    },
  }));

  return (
    <LineChartWrapper
      className={className}
      {...attrs}
    >
      <LineChartTitle>{title}</LineChartTitle>
      <Dimmer
        active={isLoading}
        spinner={<Spinner size="large" />}
      >
        <StyledLineChart style={style}>
          {!hasData ? (
            <EmptyMessage message={noDataLabel} />
          ) : (
            <LineChartPro
              apiRef={apiRef}
              colors={processedColors}
              grid={grid}
              hideLegend={hideLegend}
              margin={margin}
              series={processedSeries}
              slots={customSlots}
              slotProps={{
                legend: legendSlotProps,
                tooltip: tooltipSlotProps,
              }}
              width={width}
              xAxis={processedXAxis}
              yAxis={yAxis}
              {...otherProps}
            />
          )}
        </StyledLineChart>
      </Dimmer>
    </LineChartWrapper>
  );
}

LineChart.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(LINE_CHART_COLORS),
  ])),
  grid: PropTypes.shape({
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
  }),
  hideLegend: PropTypes.bool,
  isLoading: PropTypes.bool,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  noDataLabel: PropTypes.string,
  series: PropTypes.arrayOf(PropTypes.shape({
    area: PropTypes.bool,
    color: PropTypes.string,
    curve: PropTypes.oneOf(LINE_CHART_CURVES),
    data: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.string,
    label: PropTypes.string,
    showMark: PropTypes.bool,
    type: PropTypes.string,
  })),
  testId: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(LINE_CHART_VARIANTS),
  width: PropTypes.number,
  xAxis: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array,
    id: PropTypes.string,
    label: PropTypes.string,
    scaleType: PropTypes.string,
    valueFormatter: PropTypes.func,
  })),
  yAxis: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    valueFormatter: PropTypes.func,
  })),
};
