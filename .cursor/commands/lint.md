# Lint Command

This command analyzes the current file for linting issues and automatically fixes them directly in the code, just like when you ask "fix my lint issues here".

## Usage

```
/lint
/lint [file1] [file2] ... [fileN]
```

## Smart Context Detection

The command can work in multiple ways:

### With specific files:
```
/lint src/components/modal/index.js
```

### With current context:
```
/lint
```
- **Primary use case**: Fixes linting issues in the currently open file
- **Quick workflow**: You're in a file, run `/lint`, issues get fixed
- **Context-aware**: Automatically detects the file you're working on

## What it does

1. **Analyzes the current file** for common linting issues
2. **Fixes issues directly** in the code (trailing commas, block padding, etc.)
3. **Reports what was fixed** and any remaining issues
4. **Maintains code quality** standards automatically

## Examples

**Target specific files:**
```
/lint src/components/modal/index.js src/components/icon-button/index.test.js
```

**Use current context:**
```
/lint
```
This will fix linting issues in the currently open file - perfect for quick fixes while coding.

## What to expect

When you run this command, Cursor will:

### With specific files:
1. Analyze the provided files for linting issues
2. Fix common issues directly in the code (trailing commas, block padding, etc.)
3. Report what was fixed and any remaining issues
4. Show the changes made to improve code quality

### With current context:
1. **Focus on the currently open file** - the file you're actively working on
2. **Direct code fixes** - actually modifies the code to fix issues
3. **No external tools** - uses AI analysis and direct editing
4. **Perfect for coding** - fix issues as you work, just like asking "fix my lint issues"

### Always:
- Analyze code for common linting issues
- Fix issues directly in the code
- Report what was changed and why
- Maintain code quality standards

## Common ESLint Issues

### Code Style
- **Missing trailing commas**: Add commas after JSX props and object properties
- **Block padding**: Remove extra blank lines around describe/it blocks
- **Arrow function ambiguity**: Wrap conditional expressions in parentheses
- **Unused imports**: Remove unused imports and variables

### Auto-fixable Issues
- Trailing commas
- Block padding
- Semicolons
- Quote consistency
- Indentation

### Manual Fixes Required
- Unused variables
- Complex logic issues
- Import organization
- Function complexity

## Output

The command will show:
- ✅ **Files with no issues**
- ❌ **Files with linting errors**
- 🔧 **Issues that were auto-fixed**
- ⚠️ **Issues requiring manual attention**

## Best Practices

### Pre-commit Workflow
1. **Run tests**: `npm test`
2. **Fix linting**: `/lint`
3. **Manual fixes**: Address remaining issues
4. **Final check**: `/lint` (should be clean)

### Continuous Integration
- Always run `/lint` before committing (auto-fixes issues)
- Address manual fixes promptly
- Keep codebase clean and consistent

## Integration with Testing

### Test File Linting
- Test files follow the same ESLint rules as source code
- Common issues: block padding, trailing commas, unused imports
- Use `/lint` to automatically fix test file issues

### Quality Assurance
- ESLint runs as part of the test suite
- Prevents low-quality code from being committed
- Maintains consistent code style across the project
