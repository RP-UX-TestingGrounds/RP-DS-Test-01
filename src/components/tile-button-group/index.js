import React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import TileButton, { TILE_BUTTON_ICON_ALIGNS, TILE_BUTTON_SIZES } from '../tile-button';

const MAX_COLUMNS = 4;

const getDefaultColumns = (size) => {
  return size === TILE_BUTTON_SIZES.medium ? 2 : 3;
};

const clampColumns = (columns) => {
  return Math.min(Math.max(columns, 1), MAX_COLUMNS);
};

const GridContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'columns',
})(({ columns }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: 'var(--tile-button-group-gap)',
}));

function TileButtonGroup({
  testId,
  options,
  value,
  onChange,
  size = TILE_BUTTON_SIZES.small,
  multiple = false,
  columns,
}) {
  const effectiveColumns = clampColumns(columns ?? getDefaultColumns(size));

  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleClick = (optionValue) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <GridContainer data-test-id={testId} columns={effectiveColumns}>
      {options.map((option) => (
        <TileButton
          key={option.value}
          customContent={option.customContent}
          testId={`${testId}-${option.value}`}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
          icon={option.icon}
          iconAlign={option.iconAlign}
          iconName={option.iconName}
          size={size}
          selected={isSelected(option.value)}
          onClick={() => handleClick(option.value)}
        />
      ))}
    </GridContainer>
  );
}

export default TileButtonGroup;

TileButtonGroup.propTypes = {
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    customContent: PropTypes.node,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    iconAlign: PropTypes.oneOf(Object.values(TILE_BUTTON_ICON_ALIGNS)),
    iconName: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  size: PropTypes.oneOf(Object.values(TILE_BUTTON_SIZES)),
  testId: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
