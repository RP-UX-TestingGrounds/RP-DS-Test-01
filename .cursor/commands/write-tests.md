# Write Tests Command

This command analyzes files for untested changes and generates comprehensive test suites.

## Usage

```
/write-tests [file1] [file2] ... [fileN]
/write-tests
```

## What it does

1. **Analyzes files** for functions, components, and utilities that need testing
2. **Generates comprehensive tests** following your project's testing patterns
3. **Creates test files** with working test implementations

## Smart Context Detection

The command can work in multiple ways:

### With specific files:
```
/write-tests src/components/modal/index.js
```

### With current context:
```
/write-tests
```
- Analyzes the currently open file
- Detects recent changes since branching
- Identifies modified files that need testing
- Uses git diff to find untested changes

## Examples

**Target specific files:**
```
/write-tests src/components/modal/index.js src/utils/date-format.js
```

**Use current context:**
```
/write-tests
```
This will analyze the currently focused file and generate tests for it.

## What to expect

When you run this command, Cursor will:

### With specific files:
1. Scan the provided files for functions, components, and utilities
2. Generate comprehensive test scenarios for each item
3. Create test files with working test implementations

### With current context:
1. Analyze the currently open file or recent changes
2. Detect what has been modified since branching
3. Identify files that need testing based on git diff
4. Generate tests for the most relevant files

### Always:
- Follow your project's testing patterns (Jest + React Testing Library)
- Ensure tests pass ESLint and follow code standards
- Create working test implementations (not stubs)

## Test scenarios that will be generated

### For React Components:
- Renders without crashing
- Renders with default props
- Handles user interactions
- Handles prop changes
- Tests conditional rendering

### For Functions:
- Executes without errors
- Handles valid inputs
- Handles edge cases
- Handles invalid inputs

### For Utilities:
- Returns expected output
- Handles valid inputs
- Handles edge cases
- Handles invalid inputs

## Output

The command will create test files with:
- ✅ **Working test implementations** (not stubs)
- ✅ **ESLint compliant code**
- ✅ **Following project patterns**
- ✅ **Comprehensive coverage**
- ✅ **Ready to run with `npm test`**
