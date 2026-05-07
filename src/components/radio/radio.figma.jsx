import React from 'react';
import Radio from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <Radio> exposes Checked / Size / Color / State.
// All 7 colors and all 3 sizes line up exactly with rp-ui's API — clean
// 1:1 mapping with no gaps.
//
// If `figma connect parse` reports a property name mismatch, double-check
// the exact case + spacing of the Checked / Size / Color / State properties
// on the Figma component panel.

figma.connect(
  Radio,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6558-39273&m=dev',
  {
    props: {
      checked: figma.boolean('Checked'),

      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
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

      // Figma encodes Disabled as a State variant; rp-ui uses a `disabled`
      // prop. Hovered / Focused / Pressed are CSS-driven visual states.
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Pressed: false,
        Disabled: true,
      }),
    },
    example: ({ checked, size, color, disabled }) => (
      <Radio
        checked={checked}
        size={size}
        color={color}
        disabled={disabled}
      />
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <Radio> and rp-ui <Radio>
// ─────────────────────────────────────────────────────────────────────────────
//
// None on the prop axes — colors, sizes, and states all match rp-ui exactly.
//
// 1. `State` non-disabled values — Hovered, Focused, Pressed are CSS-driven
//    visual states; the mapping accepts those values but always sets
//    `disabled: false`, leaving the interaction state to the browser at
//    runtime.
//
// 2. rp-ui props NOT exposed in Figma: `name`, `value`, `onChange`, `onBlur`,
//    `id`, `inputProps`, `disableRipple`, `testId`. These are runtime/data
//    concerns, not visual states, so they're correctly absent from Figma.
