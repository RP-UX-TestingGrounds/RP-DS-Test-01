import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import Chip from '../chip';
import Icon from '../icon';

const TrendContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
  flexShrink: 0,
}));

export default function TrendIndicator({
  variant,
  value,
  positive,
  negative,
  indicator,
  iconName,
  testId,
  className,
}) {
  let actualVariant = variant;
  if (positive !== undefined) {
    actualVariant = positive ? 'success' : 'error';
  }
  if (negative !== undefined) {
    actualVariant = negative ? 'error' : 'success';
  }

  const chipColor = actualVariant;

  // Icon mapping for indicators
  const iconMap = {
    increase: 'arrowUp',
    decrease: 'arrowDown',
    neutral: null,
  };

  // Color mapping for variants
  const colorMap = {
    success: 'var(--success-main)',
    error: 'var(--error-main)',
    default: 'var(--text-secondary)',
  };

  // Determine icon based on indicator or iconName
  const resolvedIconName = iconName || iconMap[indicator];

  // Determine icon color based on variant
  const iconColor = colorMap[actualVariant] || 'var(--text-secondary)';

  return (
    <TrendContainer className={className} data-testid={testId}>
      {resolvedIconName && (
        <Icon
          fill={iconColor}
          name={resolvedIconName}
          width={24}
        />
      )}
      <Chip
        variant="filled"
        color={chipColor}
        label={value}
        size="small"
      />
    </TrendContainer>
  );
}

TrendIndicator.propTypes = {
  variant: PropTypes.oneOf(['success', 'error', 'default']),
  value: PropTypes.string.isRequired,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  indicator: PropTypes.oneOf(['increase', 'decrease', 'neutral']),
  iconName: PropTypes.string,
  testId: PropTypes.string,
  className: PropTypes.string,
};
