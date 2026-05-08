import React from 'react';
import Switch from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <Switch> exposes Checked / Size / Color / State.
// rp-ui's Switch has matching booleans but its size enum uses different
// names than Figma — rp-ui calls the larger size 'large' (which internally
// renders as MUI 'medium'). See KNOWN GAPS for the size-name translation
// and the color reverse-gap.

figma.connect(
  Switch,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6564-39128&m=dev',
  {
    props: {
      checked: figma.boolean('Checked'),

      // Figma Small/Medium ↔ rp-ui small/large (rp-ui's 'large' value
      // internally renders as MUI 'medium'; see src/components/switch/index.js
      // line 35 — `size === 'large' ? 'medium' : size`).
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'large',
      }),

      // Figma's <Switch> only exposes Primary as a color variant. rp-ui's
      // PropTypes accept the full color set, but mapping anything other than
      // Primary requires Figma to add those variants first.
      color: figma.enum('Color', {
        Primary: 'primary',
      }),

      // Figma encodes Disabled as a State variant; rp-ui uses a `disabled` prop.
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Pressed: false,
        Disabled: true,
      }),
    },
    example: ({ checked, size, color, disabled }) => (
      <Switch
        checked={checked}
        size={size}
        color={color}
        disabled={disabled}
      />
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <Switch> and rp-ui <Switch>
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Size value naming — Figma uses Small/Medium; rp-ui uses small/large.
//    rp-ui's 'large' value is mapped to MUI's 'medium' inside the styled
//    component, so the rendered size visually matches Figma's Medium variant.
//    Worth raising with the design team whether rp-ui should rename 'large'
//    → 'medium' to align with Figma + MUI conventions.
//
// 2. `Color` (reverse gap) — rp-ui's PropTypes accept primary, secondary,
//    error, info, success, warning, default. Figma's <Switch> only models
//    Primary. Designers can't currently pick non-primary colors in the design
//    file. To close: add color variants to the Figma component or document
//    that the color prop is for code-only override.
//
// 3. `State` non-disabled values — Hovered, Focused, Pressed are CSS-driven
//    visual states; the mapping accepts those values but always sets
//    `disabled: false`.
//
// 4. rp-ui props NOT exposed in Figma: `defaultChecked`, `name`, `value`,
//    `onChange`, `id`, `inputProps`, `testId`. These are runtime/data
//    concerns, not visual states, so they're correctly absent from Figma.
