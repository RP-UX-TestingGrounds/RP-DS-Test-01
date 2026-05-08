import React from 'react';
import Checkbox from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <Checkbox> exposes Checked / Indeterminate /
// Size / Color / State. rp-ui's Checkbox has Checked, Indeterminate, Color,
// and Disabled — but NO `size` prop and a narrower color set. See
// KNOWN GAPS at the bottom of this file.

figma.connect(
  Checkbox,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6543-43052&m=dev',
  {
    props: {
      checked: figma.boolean('Checked'),
      indeterminate: figma.boolean('Indeterminate'),

      // rp-ui CHECKBOX_COLORS = [primary, secondary, error, success, warning].
      // Figma adds `Default` and `Info` — both fall back to `primary` here.
      color: figma.enum('Color', {
        Default: 'primary', // GAP
        Primary: 'primary',
        Secondary: 'secondary',
        Error: 'error',
        Warning: 'warning',
        Info: 'primary', // GAP
        Success: 'success',
      }),

      // Figma encodes Disabled as a State variant; rp-ui uses a `disabled` prop.
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Pressed: false,
        Disabled: true,
      }),

      // KNOWN GAP: rp-ui's Checkbox has no `size` prop. Figma's Size variant
      // (Small/Medium/Large) is intentionally not mapped here — see notes below.
    },
    example: ({ checked, indeterminate, color, disabled }) => (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        color={color}
        disabled={disabled}
      />
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <Checkbox> and rp-ui <Checkbox>
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. `Color = Default` — rp-ui's CHECKBOX_COLORS list is
//    [primary, secondary, error, success, warning]. There's no `default`.
//    Maps to `primary`. To close the gap: add 'default' to CHECKBOX_COLORS
//    and decide what tokens it should resolve to (likely the neutral grays).
//
// 2. `Color = Info` — same situation as Default; not in rp-ui's
//    CHECKBOX_COLORS. Maps to `primary`. Same fix: add 'info' to the list.
//
// 3. `Size` (Small / Medium / Large) — rp-ui's Checkbox has no `size` prop.
//    The styled component hardcodes the SVG icon font-size at 2rem, so there
//    is only one rendered size. Figma's Size variant is therefore unmapped;
//    the dev-mode snippet will be the same regardless of which size is
//    selected in Figma. To close the gap, add a `size` prop to rp-ui's
//    Checkbox and switch the SVG fontSize to a token like
//    `var(--checkbox-size-${size})`.
//
// 4. `State` non-disabled values — Hovered, Focused, Pressed are CSS-driven
//    visual states; the mapping accepts those values but always sets
//    `disabled: false`.
