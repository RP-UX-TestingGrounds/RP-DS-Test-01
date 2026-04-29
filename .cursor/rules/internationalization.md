---
alwaysApply: true
---

# Internationalization (i18n)

## Core Rule

No hardcoded English strings anywhere in components. All user-facing text must go through a `translate()` function.

## translate() Pattern

- Components accept a `translate` function as a prop with a default translations object.
- All user-visible strings — labels, placeholders, error messages, helper text — must be keys in the translations object.

## Dynamic Values

- Dynamic values (search queries, counts, names) must be parameters within the translation string, not concatenated.

```js
// Bad — assumes English word order
translate('viewAll') + ` "${searchQuery}"`

// Good — language can control placement
translate('viewAllOrdersWith', { searchQuery })
// 'View all orders with "{searchQuery}"'
```

## Punctuation & Formatting

- Punctuation that is part of a phrase (colons, bullets, etc.) belongs inside the translation string, not hardcoded around it.

```js
// Bad
`${translate('replyTo')}: ${name}`

// Good
translate('replyTo', { name })
// 'Reply to: {name}'
```

## What Counts as User-Facing

- Button labels, tooltips, placeholder text, error messages, helper text, empty states, headings, ARIA labels, and any text visible to the user.
- Default prop values that contain English text.
- Formatted strings that combine translated and dynamic parts.
