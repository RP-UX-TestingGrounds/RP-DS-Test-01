# Testing Standards & Patterns

This document establishes the testing standards, patterns, and best practices for the RevolutionParts UI component library. It serves as both engineering documentation and guidance for automated test generation.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Project Setup](#project-setup)
3. [Test Structure & Organization](#test-structure--organization)
4. [What to Test vs What NOT to Test](#what-to-test-vs-what-not-to-test)
5. [Testing Patterns by Component Type](#testing-patterns-by-component-type)
6. [Common Testing Patterns](#common-testing-patterns)
7. [Material-UI Specific Guidelines](#material-ui-specific-guidelines)
8. [Quality Standards](#quality-standards)
9. [Code Quality & ESLint](#code-quality--eslint)
10. [Troubleshooting](#troubleshooting)

## Testing Philosophy

### Core Principles

**Quality Over Quantity**
- 15 meaningful tests > 30 useless tests
- Every test must verify actual functionality
- Focus on behavior that could actually break

**Test What You Own**
- Focus on your component's logic and functionality
- Don't test third-party library behavior
- Avoid testing pass-through props without logic

**Meaningful Assertions**
- Test user interactions and behavior changes
- Verify style changes and prop effects
- Test edge cases and error conditions
- Avoid existence checks without purpose

### Anti-Patterns to Avoid

- ❌ **Useless existence checks**: `expect(button).toBeInTheDocument()` without testing behavior
- ❌ **Third-party testing**: Testing Material-UI's internal functionality
- ❌ **Pass-through testing**: Testing props that just get passed through
- ❌ **Redundant tests**: Multiple tests verifying the same behavior
- ❌ **Snapshot overuse**: Using snapshots instead of meaningful assertions

## Project Setup

### Test Configuration

**Jest Configuration** (`jest.config.js`)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  testRegex: 'src(/__tests__/.*|.+\\.(test|spec))\\.[jt]sx?$',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '.stories.js',
    '.stories.ts',
    '/stories/',
  ],
};
```

**Setup File** (`.jest/setup.js`)
```javascript
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });
```

### Available Commands

```bash
# Run all tests
npm test

# Run tests for specific file
npm test src/components/modal/index.test.js

# Run tests with coverage
npm run test:ci

# Check linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## Test Structure & Organization

### File Organization

```
src/components/
├── modal/
│   ├── index.js
│   ├── index.test.js          # ✅ Test file
│   ├── modal-title.js
│   └── modal-title.test.js    # ✅ Test file
└── button/
    ├── index.js
    └── index.test.js          # ✅ Test file
```

### Standard Test Structure

```javascript
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './index';

describe('ComponentName', () => {
  afterEach(cleanup);

  function renderComponent(props = {}) {
    const {
      // Set sensible defaults for required props
      open = true,
      ...rest
    } = props;

    return render(
      <ComponentName
        {...rest}
      >
        {/* Children if needed */}
      </ComponentName>,
    );
  }

  // Tests go here...
});
```

### Test Naming Conventions

**Component Tests**
```javascript
describe('ComponentName', () => {
  it('should render with default props', () => {});
  it('should handle user interactions', () => {});
  it('should apply custom styling', () => {});
  it('should handle edge cases', () => {});
});
```

**Test Naming Preferences**
- ✅ **Preferred**: `should render with default props` - More descriptive and specific
- ❌ **Avoid**: `should render without crashing` - Too generic and redundant
- ✅ **Use**: `should handle user interactions` - Clear behavior focus
- ✅ **Use**: `should apply custom styling` - Specific functionality

**Function Tests**
```javascript
describe('functionName', () => {
  it('should execute without errors', () => {});
  it('should handle valid inputs', () => {});
  it('should handle edge cases', () => {});
  it('should handle invalid inputs', () => {});
});
```

## What to Test vs What NOT to Test

### ✅ Test These (Your Component's Functionality)

**Custom Logic & Behavior**
- CSS custom properties and style transformations
- Prop transformations and conditional rendering
- User interaction handlers (click, submit, keyboard)
- State management and side effects
- Error handling and edge cases

**Integration & Accessibility**
- How your component works with its children/props
- ARIA attributes and accessibility features
- Keyboard navigation and screen reader support
- Form validation and user feedback

**Edge Cases**
- Null/undefined values
- Empty strings and boundary conditions
- Invalid prop combinations
- Network errors and async failures

### ❌ Don't Test These (Pass-Through or Third-Party)

**Pass-Through Props**
- Props that just get passed to Material-UI without logic
- Size, color, or styling props that don't transform data
- Event props that don't add custom behavior

**Third-Party Behavior**
- Material-UI's internal size, color, or styling logic
- External library functionality
- Browser API behavior

**React Built-in Features**
- Basic prop changes and re-rendering (React handles this)
- Standard React lifecycle behavior
- Built-in React functionality
- Component re-rendering when props change
- React's built-in state management

**Implementation Details**
- Internal state that doesn't affect user experience
- Private methods or component internals
- Redundant tests that verify the same behavior

### 🤔 Borderline Cases (Use Judgment)

**Size Props**: Test if you add logic around them, skip if just pass-through
**Color Props**: Test if you transform them, skip if just pass-through
**Event Props**: Always test - these are your component's responsibility
**Render Props**: Test if you add logic, skip if just pass-through

## Testing Patterns by Component Type

### React Components

**Core Functionality**
```javascript
it('should render with default props', () => {
  const { getByRole } = renderComponent();
  const element = getByRole('button');
  expect(element).toBeInTheDocument();
});

it('should handle user interactions', () => {
  const handleClick = jest.fn();
  const { getByRole } = renderComponent({ onClick: handleClick });

  const button = getByRole('button');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should handle prop changes', () => {
  const { rerender, getByText } = renderComponent({ title: 'Initial' });
  expect(getByText('Initial')).toBeInTheDocument();

  rerender(<Component title="Updated" />);
  expect(getByText('Updated')).toBeInTheDocument();
});
```

**Styling & Custom Properties**
```javascript
it('should apply custom style variables', () => {
  const { getByRole } = renderComponent({ color: 'primary' });
  const button = getByRole('button');
  expect(button).toHaveStyle({
    '--color-main': 'var(--primary-main)',
    '--color-light': 'var(--primary-light)',
    '--color-dark': 'var(--primary-dark)',
  });
});
```

### Functions & Utilities

**Basic Functionality**
```javascript
it('should execute without errors', () => {
  expect(() => functionName('valid input')).not.toThrow();
});

it('should handle valid inputs', () => {
  const result = functionName('test input');
  expect(result).toBe('expected output');
});

it('should handle edge cases', () => {
  expect(functionName('')).toBe('default value');
  expect(functionName(null)).toBe('fallback');
});
```

### Event Handlers

**User Interactions**
```javascript
it('should call onClick when clicked', () => {
  const handleClick = jest.fn();
  const { getByRole } = renderComponent({ onClick: handleClick });

  fireEvent.click(getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should not call onClick when disabled', () => {
  const handleClick = jest.fn();
  const { getByRole } = renderComponent({
    onClick: handleClick,
    disabled: true
  });

  fireEvent.click(getByRole('button'));
  expect(handleClick).not.toHaveBeenCalled();
});
```

## Common Testing Patterns

### Event Handling
```javascript
it('should handle user interactions', () => {
  const handleClick = jest.fn();
  const { getByRole } = renderComponent({ onClick: handleClick });

  const button = getByRole('button');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Conditional Rendering
```javascript
it('should render conditionally', () => {
  const { queryByText } = renderComponent({ showTitle: false });
  expect(queryByText('Title')).not.toBeInTheDocument();
});
```

### Style Testing
```javascript
it('should apply custom styles', () => {
  const { getByRole } = renderComponent({ variant: 'primary' });
  const button = getByRole('button');
  expect(button).toHaveClass('primary-variant');
  expect(button).toHaveStyle({ backgroundColor: 'var(--primary-color)' });
});
```

## Material-UI Specific Guidelines

### Modal Testing
- Material-UI modals may remain in DOM when `open={false}` - this is expected behavior
- Test for presence/absence of content rather than DOM removal
- Use `queryByRole` for elements that might not exist
- Use `getByRole` for elements that should exist

### Dialog Testing
- Test `role="dialog"` for modal dialogs
- Test `aria-labelledby` and `aria-modal` attributes
- Test backdrop click behavior with `allowBackdropClose` prop

### Component-Specific Patterns
```javascript
// ✅ Good: Test actual Material-UI behavior
it('should apply Material-UI size classes', () => {
  const { getByRole } = renderComponent({ size: 'large' });
  const button = getByRole('button');
  expect(button).toHaveClass('MuiIconButton-sizeLarge');
});

// ❌ Bad: Just testing existence
it('should render with large size', () => {
  const { getByRole } = renderComponent({ size: 'large' });
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
});
```

## Quality Standards

### Good Test Examples

```javascript
// ✅ Tests actual functionality
it('should apply custom style variables for different colors', () => {
  const { getByRole } = renderComponent({ color: 'primary' });
  const button = getByRole('button');
  expect(button).toHaveStyle({
    '--color-main': 'var(--primary-main)',
    '--color-light': 'var(--primary-light)',
    '--color-dark': 'var(--primary-dark)',
  });
});

// ✅ Tests user interaction
it('should not call onClick when disabled', () => {
  const handleClick = jest.fn();
  const { getByRole } = renderComponent({
    onClick: handleClick,
    disabled: true
  });
  const button = getByRole('button');
  fireEvent.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});

// ✅ Tests edge case
it('should handle null children gracefully', () => {
  const { getByRole } = renderComponent({ children: null });
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeEmptyDOMElement();
});
```

### Bad Test Examples

```javascript
// ❌ Useless - just checks existence
it('should render with primary color', () => {
  const { getByRole } = renderComponent({ color: 'primary' });
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
});

// ❌ Tests third-party behavior
it('should render with large size', () => {
  const { getByRole } = renderComponent({ size: 'large' });
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
});

// ❌ Redundant test - prefer "render with default props"
it('should render without crashing', () => {
  const { getByRole } = renderComponent();
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
});

// ❌ Tests React's built-in functionality
it('should handle prop changes', () => {
  const { rerender, getByText } = renderComponent({ title: 'Initial' });
  expect(getByText('Initial')).toBeInTheDocument();

  rerender(<Component title="Updated" />);
  expect(getByText('Updated')).toBeInTheDocument();
});
```

## Code Quality & ESLint

### ESLint Configuration

**Always run ESLint after writing tests:**
```bash
npm run lint
npm run lint:fix
```

**Common ESLint Issues in Tests:**
- Missing trailing commas in JSX props and objects
- Extra blank lines around describe/it blocks
- Arrow function ambiguity in conditional expressions
- Unused imports and variables

### Pre-commit Checklist

1. ✅ **Tests pass**: `npm test`
2. ✅ **ESLint passes**: `npm run lint`
3. ✅ **No console errors or warnings**
4. ✅ **All imports are used**
5. ✅ **Code follows project style guidelines**

### Code Quality Standards

**Import Patterns**
```javascript
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './index';
```

**Function Declarations**
```javascript
// ✅ Good: Default parameters
function renderComponent(props = {}) {
  const { open = true, ...rest } = props;
  return render(<Component open={open} {...rest} />);
}

// ❌ Bad: No default parameters
function renderComponent(props) {
  const { open, ...rest } = props;
  return render(<Component open={open} {...rest} />);
}
```

## Troubleshooting

### Common Issues

**Screen Import Issues**
```javascript
// ❌ Problematic
import { render, screen } from '@testing-library/react';
expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

// ✅ Solution
import { render } from '@testing-library/react';
const { queryByRole } = render(<Component />);
expect(queryByRole('dialog')).not.toBeInTheDocument();
```

**Modal Visibility Issues**
- Material-UI modals may stay in DOM when `open={false}` - this is expected behavior
- Test for content presence/absence rather than DOM removal
- Use `queryByRole` for elements that might not exist

**Event Handler Testing**
```javascript
// ✅ Always mock functions
const handleClick = jest.fn();
const { getByRole } = renderComponent({ onClick: handleClick });
```

**Async Operations**
```javascript
// ✅ Use waitFor for async operations
import { waitFor } from '@testing-library/react';

it('should handle async operations', async () => {
  const { getByText } = renderComponent();
  await waitFor(() => {
    expect(getByText('Loaded content')).toBeInTheDocument();
  });
});
```

### Best Practices Summary

- **Test behavior, not implementation details**
- **Use semantic queries** (`getByRole`, `getByText`) over test IDs
- **Mock external dependencies**
- **Test user interactions, not internal state**
- **Keep tests focused and independent**
- **NO USELESS TESTS**: Every test must verify actual functionality
- **Test meaningful behavior**: Style changes, prop effects, user interactions
- **Avoid redundant tests**: Don't test the same thing multiple times
- **Test what you own**: Focus on your component's logic
- **Don't test third-party behavior**: Let Material-UI test their own functionality

---

*This document serves as both engineering documentation and guidance for automated test generation. It should be updated as new patterns and best practices are discovered.*
