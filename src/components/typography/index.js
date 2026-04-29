import React from 'react';
import PropTypes from 'prop-types';

import {
  typographyTypeSizeStyles,
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_TYPES,
  TYPOGRAPHY_TYPE_SIZE_PAIRS,
} from './typography-variant-utils';

export { TYPOGRAPHY_SIZES, TYPOGRAPHY_TYPES, TYPOGRAPHY_TYPE_SIZE_PAIRS };

const TEXT_COLORS = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  subtle: 'var(--text-subtle)',
};

const TEXT_COLOR_KEYS = Object.keys(TEXT_COLORS);

export default function Typography({
  'aria-level': ariaLevel,
  children,
  component: ComponentProp = 'span',
  id,
  role,
  size = 'md',
  textColor = 'primary',
  type = 'body',
}) {
  const style = {
    ...typographyTypeSizeStyles(type, size),
    color: TEXT_COLORS[textColor] ?? TEXT_COLORS.primary,
  };

  return (
    <ComponentProp
      aria-level={ariaLevel}
      id={id}
      role={role}
      style={style}
    >
      {children}
    </ComponentProp>
  );
}

Typography.propTypes = {
  'aria-level': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  component: PropTypes.elementType,
  id: PropTypes.string,
  role: PropTypes.string,
  size: PropTypes.oneOf([...TYPOGRAPHY_SIZES]),
  textColor: PropTypes.oneOf(TEXT_COLOR_KEYS),
  type: PropTypes.oneOf([...TYPOGRAPHY_TYPES]),
};
