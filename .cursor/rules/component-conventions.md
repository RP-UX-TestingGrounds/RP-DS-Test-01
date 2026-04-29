---
alwaysApply: true
---

# Component Conventions

## Structure & Organization

- Each component lives in its own folder under `src/components/` with an `index.js` entry point.
- Extract supporting/helper functions into separate files within the component folder so they can be tested individually.
- Break large components into smaller sub-components. If a section of JSX is complex enough to warrant its own logic, it belongs in its own file.
- Application-specific components do not belong in rp-ui. This library is for reusable components only.

## Naming

- Use semantic, generic names — not implementation-specific ones. `RichTextEditor` not `TinyMCEEditor`, `SearchResult` not `StyledListItem`.
- Never prefix components with `Styled`. Name them by their role: `Header`, `Description`, `SearchResults`.
- Folder names use dash-case and match the component name: `rich-text-editor/`, `group-field/`.
- Avoid negatively-named booleans. Prefer `portal={true}` over `disablePortal={false}`.
- Form field components must end in `Field` (e.g. `GroupField`, `RichTextEditorField`) and conform to the [FormikField interface](https://66635e58eb6f979690145dd7-fjuzwxznek.chromatic.com/?path=/docs/components-inputs-formikfield--docs#writing-your-own-field-component): `name`, `testId`, `error`, `helperText`, `value`, `onChange`, `onBlur`.

## Props Design

- Explicitly define allowed props. Don't spread `...other` or `...rest` into underlying components — it couples consumers to the MUI implementation.
- Props should abstract implementation details. Prefer `maxDisplayRows={4}` (derives pixel value internally) over `maxSelectionHeight="200px"`.
- Don't require data in a format that's convenient for the component but inconvenient for the consumer. Adapt to what callers naturally have.
- `testId` should be accepted as a prop but not defaulted to a value.
- Unique sub-element test IDs should derive from the parent: `${testId}-menu`, `${testId}-button`.

## MUI Abstraction

- Don't expose MUI-specific props (`slotProps`, `ownerState`, etc.) to consumers. Translate them into meaningful, use-case-driven props.
- Prefer plain HTML elements (`div`, `span`, `ul`) over MUI primitives (`Box`, `Typography`, `List`) when no MUI-specific feature is needed.
- Avoid MUI's built-in spacing system — it complicates tokenization and normalization.

## Code Simplicity

- Avoid nested ternaries. Extract conditional logic into variables or helper functions.
- Don't use `useMemo` or `useCallback` unless there is a demonstrated performance need. Simple lookups and small computations don't need memoization.
- Avoid `reduce()` — almost always rewritable into something more readable.
- Minimize return statements. Aim for one "no data" branch and one "has data" branch.
- Don't add features or props preemptively. If there's no current use case, leave it out.
