import React from 'react';
import Chip from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <Chip> exposes Size / Color / State / Variant.
// All 7 colors line up exactly with rp-ui's color set, so this is the
// cleanest mapping so far — no color-side fallbacks. The only reverse-gap
// is that rp-ui has a `contained` variant Figma doesn't represent.
//
// If `figma connect parse` reports a property name mismatch (especially
// for `Label`, which we're inferring follows the Button precedent), open
// the Figma component panel and copy the exact name + casing.

figma.connect(
  Chip,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6588-47683&m=dev',
  {
    props: {
      // Text content. Inferring `Label` based on the Button precedent.
      label: figma.string('Label'),

      variant: figma.enum('Variant', {
        Filled: 'filled',
        Outlined: 'outlined',
      }),

      color: figma.enum('Color', {
        Default: 'default',
        Primary: 'primary',
        Secondary: 'secondary',
        Error: 'error',
        Warning: 'warning',
        Info: 'info',
        Success: 'success',
      }),

      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
      }),

      // Figma encodes Disabled as a State variant; rp-ui uses a `disabled`
      // prop. The non-disabled states (Hovered / Focused / Pressed) are
      // visual states the component renders automatically via CSS.
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Pressed: false,
        Disabled: true,
      }),
    },
    example: ({ label, variant, color, size, disabled }) => (
      <Chip
        label={label}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
      />
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <Chip> and rp-ui <Chip>
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. rp-ui's `variant = 'contained'` — has no Figma equivalent. rp-ui's
//    `contained` is a richer fill (uses --color-main instead of --color-light)
//    that Figma doesn't currently model. If designers want this style, the
//    Figma component needs a third Variant value or a new boolean prop
//    (e.g., "Solid Fill"). For now, contained is callable from code only.
//
// 2. `icon` (rp-ui prop) — rp-ui's Chip accepts an `icon` node for a leading
//    icon. The Figma component metadata didn't surface an Icon property in
//    the parse, so this isn't mapped. If Figma later adds an "Icon" instance
//    swap, extend this mapping with `icon: figma.instance('Icon')`.
//
// 3. `onDelete` (rp-ui prop) — passing onDelete renders a trailing close
//    button. Same situation as icon: no Figma counterpart visible in the
//    metadata. Map separately if/when Figma adds a "Show Delete" boolean.
//
// 4. `State` non-disabled values — Hovered, Focused, Pressed are CSS-driven
//    visual states; the mapping accepts the variant value but always sets
//    `disabled: false` for them.
