---
description: Guide for adding new icons to the Icon component system
---

# Adding New Icons to the Icon Component

This guide covers how to add new icons to the Icon component system located in [src/components/icon/](mdc:src/components/icon/).

## Overview

The [Icon component](mdc:src/components/icon/icon.js) uses configuration objects, stored in [icon-constants.js](mdc:src/components/icon/icon-constants.js) to define what each icon looks like.

## Step-by-Step Process

### 1. Add Icon Configuration to Constants

Add your new icon configuration to [icon-constants.js](mdc:src/components/icon/icon-constants.js):

```javascript
export const yourNewIcon = {
  viewBox: '0 0 24 24',  // Required: SVG viewBox
  paths: [
    {
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',  // Required: SVG path data
      // Optional path attributes:
      fill: '#ff0000',           // Custom fill color (overrides component fill)
      opacity: '0.5',            // Path opacity
      fillRule: 'evenodd',       // Fill rule
      clipRule: 'evenodd',       // Clip rule
      fillOpacity: '0.5',        // Fill opacity
    },
    // Add more paths if needed for complex icons
  ],
};
```

If you're adding many icons at once, we've created a conversion script that will output the appropriate config for one or more icons. If you need this functionality, please see the [Using the Conversion Script](#using-the-conversion-script-optional) section

### 2. Add to SVG_ICONS Export

Add your new icon to the `SVG_ICONS` object at the bottom of [icon-constants.js](mdc:src/components/icon/icon-constants.js)

### 3. Icon Configuration Rules

**Required Properties:**
- `viewBox`: String defining the SVG coordinate system (e.g., '0 0 24 24')
- `paths`: Array of path objects, each containing at minimum a `d` property

**Path Object Properties:**
- `d` (required): SVG path data string
- `fill` (optional): Custom fill color for this specific path
- `opacity` (optional): Path opacity value
- `fillRule` (optional): SVG fill-rule attribute
- etc

**Naming Conventions:**
- Use camelCase for icon names (e.g., `chevronLeft`, `userProfile`)
- Avoid abbreviations when possible

### 4. Using the New Icon

Once added, use your new icon in components:

```jsx
import { Icon } from 'src/components/icon';

<Icon name="yourNewIcon" />
```

### 6. Adding to Storybook

Your new icon will automatically appear in the Storybook dropdown since it uses `Object.keys(SVG_ICONS)` for the options in [icon.stories.js](mdc:src/components/icon/icon.stories.js).

## Troubleshooting

**Icon not appearing:**
- Check that the icon name matches exactly (case-sensitive)
- Verify the icon is added to the SVG_ICONS export
- Check browser console for PropTypes warnings

**Icon looks wrong:**
- Verify the viewBox dimensions match the original SVG
- Check that path data is complete and valid
- Ensure no required path attributes are missing


## Using the Conversion Script (Optional)

For converting existing SVG files, there is a conversion script at [scripts/create-svg-config.mjs](mdc:src/components/icon/scripts/create-svg-config.mjs) that reads `.svg` files and outputs the properly-formatted icon configuration to paste into [icon-constants.js](mdc:src/components/icon/icon-constants.js).

The icon name is derived from the filename in camelCase (e.g. `chevron-left.svg` becomes `chevronLeft`).

```bash
# Convert a single SVG file
node src/components/icon/scripts/create-svg-config.mjs path/to/icon.svg

# Convert all SVG files in a directory
node src/components/icon/scripts/create-svg-config.mjs path/to/icons/
```

