import React from 'react';
import Typography from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <Typography> uses one combined `Variant` enum
// (e.g. "body md", "title lg") plus a `Gutter Bottom` boolean. rp-ui's
// component splits the variant into separate `type` and `size` props and has
// no gutterBottom equivalent — see KNOWN GAPS at the bottom of this file.
//
// We use TWO `figma.connect` calls because Code Connect's parser does not
// allow ternary expressions inside the `example` JSX. The first call handles
// the eight regular variants; the second is an override for `body md bold`
// (selected via the `variant` filter) that wraps the content in <strong>.
//
// If `figma connect parse` reports a property name mismatch, double-check the
// exact case + spacing of the Variant / Content properties on the Figma
// component panel and update the strings below to match.

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default mapping for the eight regular variants.
// ─────────────────────────────────────────────────────────────────────────────
figma.connect(
  Typography,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=11609-174872&m=dev',
  {
    props: {
      content: figma.string('Content'),

      // rp-ui type — first half of Figma's combined variant.
      type: figma.enum('Variant', {
        'body sm': 'body',
        'body md': 'body',
        'body md bold': 'body',
        'title sm': 'title',
        'title md': 'title',
        'title lg': 'title',
        'heading sm': 'heading',
        'heading md': 'heading',
        'heading lg': 'heading',
      }),

      // rp-ui size — second half. Note `heading lg` falls back to `md` because
      // rp-ui's TYPOGRAPHY_TYPE_SIZE_PAIRS does not include heading/lg.
      size: figma.enum('Variant', {
        'body sm': 'sm',
        'body md': 'md',
        'body md bold': 'md',
        'title sm': 'sm',
        'title md': 'md',
        'title lg': 'lg',
        'heading sm': 'sm',
        'heading md': 'md',
        'heading lg': 'md', // GAP: see notes below
      }),
    },
    example: ({ content, type, size }) => (
      <Typography type={type} size={size}>
        {content}
      </Typography>
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Override for `body md bold` — wraps content in <strong>.
//    The `variant` filter scopes this override to only the `body md bold`
//    Figma variant; the default mapping above handles everything else.
// ─────────────────────────────────────────────────────────────────────────────
figma.connect(
  Typography,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=11609-174872&m=dev',
  {
    variant: { Variant: 'body md bold' },
    props: {
      content: figma.string('Content'),
    },
    example: ({ content }) => (
      <Typography type="body" size="md">
        <strong>{content}</strong>
      </Typography>
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <Typography> and rp-ui <Typography>
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. `Gutter Bottom` (Figma boolean) — rp-ui's Typography has no gutterBottom
//    prop. Spacing is the caller's responsibility (e.g., wrap in a div with
//    margin-bottom, or rely on the parent's gap). This mapping ignores the
//    boolean entirely; the dev-mode snippet will be the same regardless.
//    To close this gap, either add a `gutterBottom` prop to rp-ui's Typography
//    or document the convention so designers know it's a Figma-only construct.
//
// 2. `heading lg` (Figma variant) — rp-ui's Typography only supports
//    heading + md and heading + sm. The `heading lg` Figma variant maps here
//    to heading + md, which renders smaller than designed. To close this gap,
//    add a 'heading-lg' entry to TYPOGRAPHY_TYPE_SIZE_PAIRS plus the
//    corresponding `--typography-heading-lg-*` CSS variables.
//
// 3. `body md bold` (Figma variant) — rp-ui has no first-class bold body
//    variant. The override above wraps content in <strong> so the rendered
//    weight is correct, but the underlying styles (line-height, letter-spacing)
//    come from the body-md tokens, which match Figma's `typography/title/xs/*`
//    tokens used by the `body md bold` variant. Visually equivalent enough
//    for most cases; verify against the Figma spec if the design depends on
//    exact metrics.
