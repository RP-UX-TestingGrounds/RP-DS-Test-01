# rp-ui Code Review Rules

Automated review rules for the RevolutionParts UI component library. These reflect recurring feedback patterns from code review.

## Hardcoded English Strings

No user-facing English text in components. All visible text must use a `translate()` function. Dynamic values must be parameters within translation strings — not concatenated — so translations can reorder words for different languages.

## Hardcoded Colors

Never use hex or RGB color values directly in component styles. Always reference CSS variables from `variables.css` (`--primary-main`, `--error-main`, `--text-secondary`, etc.). New color values must correspond to a Figma design token.

## CSS Variable Fallbacks

Don't add fallback values to CSS `var()` calls. Missing variables should be visible, not silently hidden by defaults.

## Inline Styles

Don't use inline `style` props. Use CSS files, CSS modules, or `styled()` components.

## Media Queries

No media queries in components. Use container queries instead.

## Component Naming

- No `Styled` prefix on component names. Use semantic names: `Header`, `SearchResult`, `Description`.
- Folder names use dash-case matching the component: `rich-text-editor/`, `group-field/`.

## Negatively-Named Booleans

Avoid negatively-named boolean props like `disablePortal`. Prefer affirmative names: `portal={true}`.

## MUI Leaking

Don't expose MUI-specific props (`slotProps`, `ownerState`, MUI `Box`/`Typography`/`List`) in rp-ui component APIs. Abstract behind meaningful, use-case-driven props.

## Spreading Props

Don't spread `...other` or `...rest` into underlying MUI components. Explicitly define allowed props.

## useMemo / useCallback Overuse

Don't wrap simple lookups or cheap computations in `useMemo` or `useCallback`. Only memoize when there's a demonstrated performance need.

## reduce()

Avoid `Array.reduce()`. Rewrite using `map`, `filter`, `forEach`, or a simple loop for readability.

## Nested Ternaries

Don't nest ternary expressions. Extract conditional logic into variables or helper functions.

## Icon Colors

Icons must not hardcode fill colors. They should accept fill via a prop and inherit color from the parent.

## Storybook Actions

Use storybook `action()` for event handler props instead of `alert()` or `console.log()`.

## Storybook Links

Links in stories must not navigate to real pages. Use hash links (`href="#/example"`) or noop handlers.

## Deterministic Story Data

Story data must be deterministic. Random/generated data causes false positives in Chromatic snapshot diffs.

## Test Quality

Tests must verify actual behavior — not just that an element exists. A test named "should apply primary color" must assert the color, not just call `toBeInTheDocument()`.

## Application-Specific Components

rp-ui is for reusable components. Application-specific components belong in the consuming application (e.g. manage), not here.

## Supporting Functions

Extract helper/supporting functions into their own files within the component folder so they can be tested individually.
