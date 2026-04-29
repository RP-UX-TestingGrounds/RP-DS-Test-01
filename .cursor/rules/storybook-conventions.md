---
alwaysApply: false
globs:
  - "**/*.stories.*"
  - "**/*.stories.js"
  - "**/*.stories.ts"
  - "**/*.stories.tsx"
---

# Storybook & Chromatic Conventions

## Stories

- Use storybook `actions` for event handlers instead of `alert()` or `console.log()`.
- Pass values as storybook args/controls so they're interactive in the controls panel. Don't hardcode object values that should be adjustable.
- Stories for components with open/closed states (modals, menus, tooltips) should default to the open/visible state so Chromatic screenshots capture the content.
- Don't wrap components in `RevolucciProvider` in stories — that's an implementation concern handled at the app level.

## Chromatic Compatibility

- Story data must be deterministic. Avoid random data generation that causes Chromatic to flag stories as changed on every build.
- Links in stories must not navigate to real pages. Use hash links (`href="#/example"`) or noop handlers to prevent 404s in storybook.

## Story Organization

- Story titles follow the pattern `Components/<Category>/<ComponentName>` (e.g. `Components/Cards/CardActions`).
- Single-component stories live in the component folder, not in `examples/`. Reserve `examples/` for multi-component integration stories.
- Include stories that demonstrate error states, empty states, and edge cases — not just the happy path.
- For Formik-compatible fields, include a story demonstrating usage within a `useFormik` form.
