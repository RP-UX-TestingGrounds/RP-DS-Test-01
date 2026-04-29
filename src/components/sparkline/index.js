import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts-pro';
import cx from 'classnames';

const StyledSparkline = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'var(--sparkline-height, 40px)',
  fontFamily: 'inherit',
  '& .MuiLineChart-root': {
    width: '100%',
    height: '100%',
  },
  '& .MuiAreaElement-root': {
    fill: 'var(--sparkline-color)',
    mask: 'var(--sparkline-mask)',
  },
  // Hide marks visually but keep hover functionality
  '& .MuiMarkElement-root': {
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default function Sparkline({
  testId,
  variant = 'gradient',
  data = [],
  color = 'primary',
  lineColor,
  className,
  height = 40,
  noDataLabel,
  curve = 'monotoneX',
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  // Use CSS variables for colors following project conventions
  const colorValue = `var(--${color}-main)`;
  const lineColorValue = lineColor ? `var(--${lineColor}-main)` : colorValue;

  // Process data - extract values from array of objects
  const processData = (rawData) => {
    if (!rawData || rawData.length === 0) return [];
    return rawData.map((item) => parseFloat(item.value) || 0);
  };

  const chartData = processData(data);
  const classes = cx('sparkline', className);

  const style = {
    '--sparkline-height': `${height}px`,
    '--sparkline-color': colorValue,
    '--sparkline-line-color': lineColorValue,
    '--sparkline-mask': variant === 'gradient'
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)'
      : 'none',
  };

  // If no data provided, render empty state
  if (!chartData || chartData.length === 0) {
    return (
      <StyledSparkline
        className={classes}
        style={style}
        {...attrs}
      >
        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-sm)',
            opacity: 0.5,
          }}
        >
          {noDataLabel}
        </div>
      </StyledSparkline>
    );
  }

  return (
    <StyledSparkline
      className={classes}
      style={style}
      {...attrs}
    >
      <SparkLineChart
        data={chartData}
        height={height}
        area={variant === 'gradient'}
        color={lineColorValue}
        curve={curve}
        showTooltip
        showHighlight
        valueFormatter={(value, context) => {
          if (context?.dataIndex !== undefined && data[context.dataIndex]) {
            const item = data[context.dataIndex];
            return `${item.displayLabel || item.label || item.value}`;
          }
          return value;
        }}
        xAxis={{
          data: chartData.map((_, index) => index),
          valueFormatter: (value, context) => {
            if (context?.location === 'tooltip' && data[value]) {
              return data[value].label;
            }
            return value;
          },
        }}
        slotProps={{
          tooltip: {
            sx: {
              '& .MuiChartsTooltip-label, & .MuiChartsTooltip-valueCell, & .MuiChartsTooltip-title': {
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: 'var(--line-height-relaxed)',
              },
            },
          },
        }}
      />
    </StyledSparkline>
  );
}

Sparkline.propTypes = {
  testId: PropTypes.string,
  variant: PropTypes.oneOf(['gradient', 'line']),
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    displayLabel: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  lineColor: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  className: PropTypes.string,
  height: PropTypes.number,
  noDataLabel: PropTypes.string,
  curve: PropTypes.oneOf(['linear', 'monotoneX', 'monotoneY', 'natural', 'step', 'stepBefore', 'stepAfter', 'basis', 'cardinal', 'catmullRom']),
};
