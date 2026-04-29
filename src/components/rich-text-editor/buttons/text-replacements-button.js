/**
 * Converts groups into a flat list of TinyMCE menu items with separators
 * and disabled group-header items.
 */
function buildGroupedItems(groups, editor) {
  const items = [];
  groups
    .filter((group) => Array.isArray(group.items) && group.items.length > 0)
    .forEach((group, index) => {
      if (index > 0) items.push({ type: 'separator' });
      items.push({ type: 'menuitem', text: group.label, enabled: false });
      group.items.forEach((item) => {
        items.push({
          type: 'menuitem',
          text: item.label || item.value,
          onAction: () => {
            editor.execCommand('mceInsertContent', false, item.value || item.label);
          },
        });
      });
    });
  return items;
}

function buildFlatItems(list, editor) {
  return list.map((replacement) => ({
    type: 'menuitem',
    text: replacement.label || replacement.value,
    onAction: () => {
      editor.execCommand('mceInsertContent', false, replacement.value || replacement.label);
    },
  }));
}

/**
 * Setup function for the Text Replacements dropdown button.
 * Registers whenever textReplacements is an array so the button stays in the toolbar
 * when the list is empty at init (e.g. non-custom campaign) and can show items
 * when it becomes non-empty (e.g. after switching to custom) via textReplacementsRef.
 *
 * When textReplacementGroupsRef is provided and non-empty, groups are rendered as
 * a flat list with separators and group headers; otherwise falls back to the flat
 * textReplacements list.
 */
const STYLE_ID = 'rp-text-replacements-menu-styles';
let styleRefCount = 0;

/**
 * Idempotent — creates the shared <style> tag only if it doesn't already exist.
 * TinyMCE renders its dropdown menus into document.body (outside React's tree),
 * so MUI styled() and CSS modules cannot target them. Direct <style> injection
 * is the only way to style these elements. Ref-counted cleanup in registerStyleCleanup.
 */
function ensureMenuStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = [
    '.tox .tox-menu .tox-collection__group .tox-collection__item--state-disabled:first-child { background-color: var(--grey-100, #f5f5f5) !important; color: var(--text-secondary, inherit) !important; cursor: default !important; opacity: 1 !important; }',
    '.tox .tox-menu .tox-collection__group .tox-collection__item--state-disabled:first-child .tox-collection__item-label { font-weight: var(--font-weight-semibold, 600) !important; font-size: var(--typography-body-md-font-size, inherit) !important; line-height: var(--typography-body-sm-line-height, normal) !important; }',
    '.tox .tox-menu .tox-collection__group .tox-collection__item--state-disabled:first-child ~ .tox-collection__item:not(.tox-collection__item--state-disabled) { padding-left: 20px !important; }',
  ].join('\n');
  document.head.appendChild(style);
}

/** Called once per editor at setup — registers ref-counted cleanup. */
function registerStyleCleanup(editor) {
  styleRefCount += 1;
  editor.on('remove', () => {
    styleRefCount -= 1;
    if (styleRefCount <= 0) {
      const tag = document.getElementById(STYLE_ID);
      if (tag) tag.remove();
      styleRefCount = 0;
    }
  });
}

export default function setupTextReplacementsButton({
  editor,
  translate,
  textReplacements,
  textReplacementsRef,
  textReplacementGroupsRef,
  textReplacementsButtonApiRef,
}) {
  const hasGroups = Array.isArray(textReplacementGroupsRef?.current)
    && textReplacementGroupsRef.current.length > 0;
  if (!Array.isArray(textReplacements) && !hasGroups) return;

  registerStyleCleanup(editor);

  editor.ui.registry.addIcon(
    'text-replacements',
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_35850_16057)">
      <path d="M1.99992 3H16.9999C17.6899 3 18.2299 3.35 18.5899 3.88L23.6299 11.45C23.8499 11.79 23.8499 12.22 23.6299 12.56L18.5899 20.12C18.2299 20.64 17.6199 21 16.9299 21H1.99992C0.899921 21 -7.82013e-05 20.1 -7.82013e-05 19V5C-7.82013e-05 3.9 0.899921 3 1.99992 3ZM14.9999 13.5C15.8299 13.5 16.4999 12.83 16.4999 12C16.4999 11.17 15.8299 10.5 14.9999 10.5C14.1699 10.5 13.4999 11.17 13.4999 12C13.4999 12.83 14.1699 13.5 14.9999 13.5ZM9.99992 13.5C10.8299 13.5 11.4999 12.83 11.4999 12C11.4999 11.17 10.8299 10.5 9.99992 10.5C9.16992 10.5 8.49992 11.17 8.49992 12C8.49992 12.83 9.16992 13.5 9.99992 13.5ZM4.99992 13.5C5.82992 13.5 6.49992 12.83 6.49992 12C6.49992 11.17 5.82992 10.5 4.99992 10.5C4.16992 10.5 3.49992 11.17 3.49992 12C3.49992 12.83 4.16992 13.5 4.99992 13.5Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_35850_16057">
        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
      </clipPath>
    </defs>
  </svg>`,
  );
  editor.ui.registry.addMenuButton('textreplacements', {
    icon: 'text-replacements',
    tooltip: translate('textReplacements'),
    onSetup: (api) => {
      const apiRef = textReplacementsButtonApiRef;
      if (apiRef) {
        apiRef.current = api;
      }
      return () => {
        if (apiRef) {
          apiRef.current = null;
        }
      };
    },
    fetch: (callback) => {
      const groups = textReplacementGroupsRef?.current;
      if (Array.isArray(groups) && groups.length > 0) {
        ensureMenuStyles();
        const grouped = buildGroupedItems(groups, editor);
        callback(grouped.length > 0
          ? grouped
          : [{ type: 'menuitem', text: translate('noTextReplacements'), enabled: false }]);
        return;
      }

      const list = textReplacementsRef.current || [];
      callback(list.length > 0
        ? buildFlatItems(list, editor)
        : [{ type: 'menuitem', text: translate('noTextReplacements'), enabled: false }]);
    },
  });
}
