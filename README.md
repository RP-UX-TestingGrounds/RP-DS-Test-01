# RP UI Component Library

## Local Development

### Initial Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rp-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Storybook:
   ```bash
   npm run storybook
   ```
   
   This will open Storybook at `http://localhost:6006` where you can develop and test components in isolation.
   
   **Note:** If you're using WSL or another environment where a browser isn't linked to your terminal, use:
   ```bash
   npm run storybook-no-browser-open
   ```
   Then manually navigate to `http://localhost:6006` in your browser.

### Development Workflow
1. Make your changes to components in `src/components/`
2. Storybook will hot-reload and display your changes automatically
3. Use Storybook to test different component states and props
4. Run tests to ensure nothing breaks:
   ```bash
   npm test
   ```
5. Run linter to check code quality:
   ```bash
   npm run lint
   ```

## Component Development Guide

### Creating a New Component
1. Create a new directory in `src/components/` with your component name
2. Add your component files (component, styles, tests)
3. Export your component from `src/index.ts`
4. Document your component with usage examples via Storybook stories in the same folder
5. Add any new CSS variables to `src/styles/variables.css`

### Testing Your Changes
1. Review your changes via Storybook stories to ensure components render correctly
2. Run unit tests:
   ```bash
   npm test
   ```
3. Run linter to check code quality:
   ```bash
   npm run lint
   ```
4. Once you create a PR and it's ready for review, run the [Chromatic GitHub Action](https://github.com/encodium/rp-ui/actions/workflows/chromatic.yml) for your branch
5. The Chromatic build will generate visual snapshots of all Storybook stories - review to ensure only your intended changes appear
6. Share the Chromatic build link with the UX team for design review

## Releasing

Once your PR is approved and the Chromatic build is approved by the UX team, you can merge to `main`. This will automatically kick off a new release of the `rp-ui` package.

### Conventional Commits

**IMPORTANT:** The release is only triggered if you use the correct conventional commit type. Not all commit types trigger releases.

#### Commit Types That Trigger Releases:
- `feat:` - New features (triggers a **minor** version bump, e.g., 1.2.0 → 1.3.0)
  ```
  feat: add new Button variant
  feat(Icon): add support for custom SVG icons
  ```

- `fix:` - Bug fixes (triggers a **patch** version bump, e.g., 1.2.0 → 1.2.1)
  ```
  fix: correct spacing in Card component
  fix(Button): resolve hover state issue
  ```

- `BREAKING CHANGE` or `!` after type - Breaking changes (triggers a **major** version bump, e.g., 1.2.0 → 2.0.0)
  ```
  feat!: remove deprecated prop from Input component
  
  feat: redesign Dialog API
  
  BREAKING CHANGE: Dialog now uses 'isOpen' instead of 'open' prop
  ```

#### Commit Types That DON'T Trigger Releases:
- `chore:` - Maintenance tasks (dependencies, configs, etc.)
- `docs:` - Documentation only changes
- `style:` - Code formatting (whitespace, semicolons, etc.)
- `refactor:` - Code refactoring without behavior changes
- `test:` - Adding or updating tests
- `ci:` - CI/CD pipeline changes

**Common Mistake:** Using `chore:` for component updates. If you're adding or fixing a component, use `feat:` or `fix:` instead!

### After Release
Once the release completes, the new version will be published to the GitHub npm registry and will be available for consuming applications to install.

## Consuming Applications

To update to the latest version of `rp-ui` in your application:

```bash
# Update within the semver range specified in package.json (recommended)
npm update @encodium/rp-ui

# Or install the absolute latest version (updates package.json)
npm install @encodium/rp-ui@latest
```

To install a specific version:

```bash
npm install @encodium/rp-ui@1.47.1
```


