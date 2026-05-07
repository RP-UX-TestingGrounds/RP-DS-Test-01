import React from 'react';
import IconButton from './';
import figma from '@figma/code-connect';

// Mapping pattern: Figma's <IconButton> wraps an icon instance and exposes
// Size / Color / State enum properties. rp-ui's IconButton has matching size
// and color (with a smaller color set) and uses MUI's standard `disabled`
// prop instead of an explicit "State=Disabled" enum. See KNOWN GAPS below
// for color values that don't have an rp-ui equivalent.
//
// If `figma connect parse` reports a property name mismatch, double-check
// the exact case + spacing of Size / Color / Icon properties on the Figma
// component panel and update the strings below to match.

figma.connect(
  IconButton,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=137-69889&m=dev',
  {
    props: {
      // Figma's swap-able icon instance → rp-ui's children.
      icon: figma.instance('Icon'),

      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
      }),

      // rp-ui IconButton supports: default, error, primary, success, warning.
      // Figma has additional values (secondary, info, inherit, inherit-white)
      // that fall back to 'default' here — see KNOWN GAPS.
      color: figma.enum('Color', {
        Default: 'default',
        Primary: 'primary',
        Secondary: 'default', // GAP
        Error: 'error',
        Warning: 'warning',
        Info: 'default', // GAP
        Success: 'success',
        Inherit: 'default', // GAP
        'Inherit (white)': 'default', // GAP
      }),

      // Figma encodes Disabled as a State variant; rp-ui uses a `disabled` prop.
      // The other States (Hovered/Focused/Pressed) are visual states the
      // component renders automatically, so they're not propagated to React.
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Pressed: false,
        Disabled: true,
      }),
    },
    example: ({ icon, size, color, disabled }) => (
      <IconButton size={size} color={color} disabled={disabled}>
        {icon}
      </IconButton>
    ),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// KNOWN GAPS between Figma <IconButton> and rp-ui <IconButton>
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. `Color = Secondary` — rp-ui's IconButton color list is
//    [default, error, primary, success, warning]. There's no `secondary`.
//    Notably, rp-ui's <Button> DOES support 'secondary' — the IconButton
//    color list is intentionally narrower or simply lags behind. Maps to
//    `default` here. To close the gap, add 'secondary' to ICON_BUTTON_COLORS.
//
// 2. `Color = Info` — same situation as Secondary; not in rp-ui's
//    ICON_BUTTON_COLORS. Maps to `default`. Same fix: add 'info' to the list.
//
// 3. `Color = Inherit` and `Color = Inherit (white)` — rp-ui's IconButton has
//    no inherit semantics; the styled component sets explicit color tokens.
//    Maps to `default`. Closing this gap means adding an 'inherit' branch to
//    the StyledIconButton CSS that uses `color: inherit` instead of the
//    --color-main token chain.
//
// 4. `State` non-disabled values — Hovered, Focused, and Pressed are visual
//    states; they're handled by CSS pseudo-classes (`:hover`, `:focus`,
//    `:active`) on the rendered component, not by props. The mapping
//    accepts those values but always sets `disabled: false`, leaving the
//    interaction state to the browser at runtime.
