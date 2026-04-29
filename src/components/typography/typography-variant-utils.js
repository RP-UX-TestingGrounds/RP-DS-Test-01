/** @type {readonly { type: string, size: string }[]} */
export const TYPOGRAPHY_TYPE_SIZE_PAIRS = [
  { type: 'body', size: 'md' },
  { type: 'body', size: 'sm' },
  { type: 'heading', size: 'md' },
  { type: 'heading', size: 'sm' },
  { type: 'title', size: 'lg' },
  { type: 'title', size: 'md' },
  { type: 'title', size: 'sm' },
];

/** @type {readonly string[]} */
export const TYPOGRAPHY_TYPES = ['body', 'heading', 'title'];

/** @type {readonly string[]} */
export const TYPOGRAPHY_SIZES = ['lg', 'md', 'sm'];

const VALID_TYPE_SIZE = new Set(
  TYPOGRAPHY_TYPE_SIZE_PAIRS.map(({ type, size }) => `${type}-${size}`),
);

/**
 * @param {string} type
 * @param {string} size
 * @returns {string} kebab segment for design tokens, e.g. body-md
 */
export function typographyTokenSegment(type, size) {
  return `${type}-${size}`;
}

/**
 * @param {string | undefined} type
 * @param {string | undefined} size
 * @returns {{ type: string, size: string }} Valid pair, or body/md when missing or invalid
 */
export function normalizeTypographyTypeSize(type, size) {
  if (
    type !== undefined
    && type !== null
    && size !== undefined
    && size !== null
    && VALID_TYPE_SIZE.has(typographyTokenSegment(type, size))
  ) {
    return { type, size };
  }
  return { type: 'body', size: 'md' };
}

/**
 * @param {string | undefined} type
 * @param {string | undefined} size
 * @returns {{ fontFamily: string, fontSize: string, fontWeight: string, lineHeight: string, letterSpacing: string }}
 */
export function typographyTypeSizeStyles(type, size) {
  const { type: t, size: s } = normalizeTypographyTypeSize(type, size);
  const prefix = `--typography-${typographyTokenSegment(t, s)}`;
  return {
    fontFamily: `var(${prefix}-font-family)`,
    fontSize: `var(${prefix}-font-size)`,
    fontWeight: `var(${prefix}-font-weight)`,
    lineHeight: `var(${prefix}-line-height)`,
    letterSpacing: `var(${prefix}-letter-spacing)`,
  };
}
