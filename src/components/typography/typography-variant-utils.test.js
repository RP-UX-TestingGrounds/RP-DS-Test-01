import {
  normalizeTypographyTypeSize,
  typographyTokenSegment,
  typographyTypeSizeStyles,
  TYPOGRAPHY_TYPE_SIZE_PAIRS,
} from './typography-variant-utils';

describe('typographyTokenSegment', () => {
  it('builds the kebab token key used in CSS variables', () => {
    expect(typographyTokenSegment('body', 'md')).toBe('body-md');
    expect(typographyTokenSegment('title', 'lg')).toBe('title-lg');
  });
});

describe('typographyTypeSizeStyles', () => {
  it('maps type and size to design-token CSS variables', () => {
    expect(typographyTypeSizeStyles('body', 'md')).toEqual({
      fontFamily: 'var(--typography-body-md-font-family)',
      fontSize: 'var(--typography-body-md-font-size)',
      fontWeight: 'var(--typography-body-md-font-weight)',
      lineHeight: 'var(--typography-body-md-line-height)',
      letterSpacing: 'var(--typography-body-md-letter-spacing)',
    });
  });

  it('uses title-lg prefix for title + lg', () => {
    const styles = typographyTypeSizeStyles('title', 'lg');
    expect(styles.fontSize).toBe('var(--typography-title-lg-font-size)');
  });
});

describe('normalizeTypographyTypeSize', () => {
  it('returns body/md for unknown or missing pairs', () => {
    expect(normalizeTypographyTypeSize('body', 'lg')).toEqual({ type: 'body', size: 'md' });
    expect(normalizeTypographyTypeSize('nope', 'md')).toEqual({ type: 'body', size: 'md' });
    expect(normalizeTypographyTypeSize(undefined, 'md')).toEqual({ type: 'body', size: 'md' });
    expect(normalizeTypographyTypeSize('body', undefined)).toEqual({ type: 'body', size: 'md' });
    expect(normalizeTypographyTypeSize(null, null)).toEqual({ type: 'body', size: 'md' });
  });

  it('returns the pair when it is allowed', () => {
    TYPOGRAPHY_TYPE_SIZE_PAIRS.forEach(({ type, size }) => {
      expect(normalizeTypographyTypeSize(type, size)).toEqual({ type, size });
    });
  });
});
