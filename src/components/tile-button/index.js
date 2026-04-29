import React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import Icon from '../icon';

export const TILE_BUTTON_SIZES = {
  small: 'small',
  medium: 'medium',
};

export const TILE_BUTTON_ICON_ALIGNS = {
  center: 'center',
  start: 'start',
};

const StyledTileButton = styled('button', {
  shouldForwardProp: (prop) => !['iconAlign', 'selected', 'size'].includes(prop),
})(({ iconAlign, selected, size }) => {
  const paddingY = `var(--tile-button-padding-y-${size})`;
  const paddingX = `var(--tile-button-padding-x-${size})`;

  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: iconAlign,
    gap: 'var(--spacing-12)',
    width: '100%',
    boxSizing: 'border-box',
    padding: `${paddingY} ${paddingX}`,
    border: size === 'small' ? '1px solid' : '2px solid',
    borderColor: selected ? 'var(--primary-main)' : 'var(--border-primary)',
    borderRadius: 'var(--radius)',
    backgroundColor: selected ? 'var(--primary-light)' : 'var(--white)',
    cursor: 'pointer',
    fontFamily: 'var(--font-family)',
    textAlign: 'left',

    '&:not(:disabled)': {
      '&:hover': {
        backgroundColor: 'var(--primary-light)',
        borderColor: selected ? 'var(--primary-dark)' : 'var(--primary-main)',
      },

      '&:active': {
        borderColor: selected ? 'var(--primary-dark)' : 'var(--primary-main)',
      },
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: 'var(--white)',
      borderColor: 'var(--border-primary)',
    },
  };
});

const IconWrapper = styled('span', {
  shouldForwardProp: (prop) => !['disabled', 'size'].includes(prop),
})(({ disabled, size }) => ({
  color: disabled ? 'var(--text-disabled)' : 'var(--primary-main)',

  '& svg': {
    fontSize: size === 'small' ? '3.4rem' : '4.8rem',
    color: disabled ? 'var(--text-disabled)' : 'var(--primary-main)',
    fill: disabled ? 'var(--text-disabled)' : 'var(--primary-main)',
    width: size === 'small' ? '3.4rem' : '4.8rem',
    height: size === 'small' ? '3.4rem' : '4.8rem',
  },
}));

const ContentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-6)',
}));

const Label = styled('span', {
  shouldForwardProp: (prop) => !['disabled', 'selected'].includes(prop),
})(({ disabled, selected }) => {
  let color = 'var(--text-primary)';
  if (disabled) {
    color = 'var(--text-disabled)';
  } else if (selected) {
    color = 'var(--on-primary-light)';
  }

  return {
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--typography-title-md-font-size)',
    lineHeight: 'var(--typography-body-md-line-height)',
    color,
  };
});

const Description = styled('span', {
  shouldForwardProp: (prop) => !['disabled', 'selected'].includes(prop),
})(({ disabled, selected }) => {
  let color = 'var(--text-secondary)';
  if (disabled) {
    color = 'var(--text-disabled)';
  } else if (selected) {
    color = 'var(--on-primary-light)';
  }

  return {
    fontSize: 'var(--typography-body-md-font-size)',
    lineHeight: 'var(--typography-body-sm-line-height)',
    color,
  };
});

function TileButton({
  testId,
  label,
  customContent = null,
  description,
  disabled = false,
  icon,
  iconAlign = 'center',
  iconName,
  size = 'small',
  selected = false,
  onClick,
}) {
  const hasIcon = Boolean(icon || iconName);
  const iconFill = disabled ? 'var(--text-disabled)' : 'var(--primary-main)';

  return (
    <StyledTileButton
      type="button"
      disabled={disabled}
      iconAlign={iconAlign}
      selected={selected}
      size={size}
      onClick={onClick}
      data-test-id={testId}
      aria-pressed={selected}
    >
      {hasIcon && (
        <IconWrapper disabled={disabled} size={size}>
          {iconName ? (
            <Icon name={iconName} fill={iconFill} />
          ) : (
            icon
          )}
        </IconWrapper>
      )}
      <ContentWrapper>
        <Label disabled={disabled} selected={selected}>{label}</Label>
        {description && (
          <Description disabled={disabled} selected={selected}>{description}</Description>
        )}
        {customContent}
      </ContentWrapper>
    </StyledTileButton>
  );
}

export default TileButton;

TileButton.propTypes = {
  customContent: PropTypes.node,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconAlign: PropTypes.oneOf(Object.values(TILE_BUTTON_ICON_ALIGNS)),
  iconName: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(TILE_BUTTON_SIZES)),
  testId: PropTypes.string.isRequired,
};
