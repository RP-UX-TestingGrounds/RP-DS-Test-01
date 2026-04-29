---
alwaysApply: true
---

# Styling Conventions

## CSS Variables & Design Tokens

- Never use hex colors directly in component styles. Always reference role-based CSS variables: `--primary-main`, `--error-main`, `--success-main`, `--text-secondary`, etc.
- When a color value appears that isn't already in `variables.css`, question it. New colors must trace back to a Figma design token. If unsure, ask.
- Don't create component-specific token variables (e.g. `--kpi-tile-value-font-weight`) unless the value is reused across the component. Pull values into the component directly from global variables.
- Don't add CSS variable fallbacks. Missing variables should be visible so they can be tracked down — silent fallbacks hide problems.
- Use existing spacing, font-size, font-weight, and gap variables. If a value doesn't have a variable, define a global one (e.g. `--font-weight-light`, `--font-size-sm`) rather than a component-scoped one.
- Use `oklch(from var(--color) calc(l - 0.05) c h)` for programmatic hover/active state darkening instead of separate hardcoded color values.

## CSS Practices

- No media queries in components. Use container queries instead and define breakpoints in `variables.css`.
- Prefer flex `gap` (using gap variables) over individual `margin-bottom` or `margin-right` on children.
- No inline styles. Use CSS files, CSS modules, or `styled()` components.
- Use CSS nesting — it's natively supported and improves readability.
- Prefer `em` units over `px` for sizing.
- Use `0` (no quotes) for zero values, and quoted strings like `'6px'` for non-zero values.
- Object style values should be on multiple lines for readability.

## Styled Components

- When using `styled()`, name components by their semantic role: `LineChartWrapper`, `LineChartTitle` — not `StyledDiv` or `StyledContainer`.
- Define reusable styled sub-elements close to where they're used (within the component folder).

## Colors

- Icons should accept fill color via a prop and not hardcode any color. `fill` from the parent controls the icon color.
- Prefer role-based colors (`--primary-main`) over raw palette colors (`--blue-500`) when styling interactive or semantic elements.
- For data visualization colors, define base colors (`--dataviz-blue-100`, `--dataviz-orange`) and reference them in sequence/category definitions.
