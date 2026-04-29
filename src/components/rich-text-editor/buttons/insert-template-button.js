import { isFunction } from 'lodash';

/**
 * Flattens templates so categories (objects with `items`) become individual
 * selectable entries. Leaf templates are kept as-is. Each returned entry
 * has { text, value, template } for the selectbox and content lookup.
 *
 * @param {Array<{ title?: string, name?: string, content?: string, html?: string, items?: Array<{ title?: string, name?: string, content?: string, html?: string }> }>} templates
 * @param {function(string, { index?: number }): string} translate
 * @returns {Array<{ text: string, value: string, template: { content?: string, html?: string } }>}
 */
function flattenTemplatesForSelect(templates, translate) {
  return (templates || []).reduce((result, entry, index) => {
    if (entry.items && Array.isArray(entry.items)) {
      const categoryLabel = entry.title || entry.name || translate('template', { index: index + 1 });
      entry.items.forEach((child) => {
        const text = child.title || child.name || translate('template', { index: result.length + 1 });
        result.push({
          text: `${categoryLabel} \u203a ${text}`,
          value: String(result.length),
          template: child,
        });
      });
    } else {
      const text = entry.title || entry.name || translate('template', { index: index + 1 });
      result.push({
        text,
        value: String(result.length),
        template: entry,
      });
    }
    return result;
  }, []);
}

export default function setupInsertTemplateButton({
  editor,
  translate,
  onInsertTemplate,
  getTemplates,
  name,
  onChangeRef,
  editorRef,
  insertTemplateTimeoutRef,
  hasApiKey,
}) {
  const timeoutRef = insertTemplateTimeoutRef;
  const initialTemplates = getTemplates ? getTemplates() : [];

  const FOLDER_STAR_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_35850_16034)">
      <path d="M20 6H12L10.59 4.59C10.21 4.21 9.7 4 9.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM16.94 16.41L15 15.28L13.06 16.41C12.68 16.63 12.22 16.29 12.32 15.86L12.83 13.66L11.14 12.2C10.81 11.91 10.98 11.36 11.42 11.32L13.65 11.13L14.53 9.07C14.7 8.67 15.28 8.67 15.45 9.07L16.33 11.13L18.56 11.32C19 11.36 19.18 11.91 18.84 12.2L17.15 13.66L17.66 15.86C17.77 16.29 17.31 16.63 16.94 16.41Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_35850_16034">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>`;

  if (hasApiKey) {
    // CDN mode: advtemplate uses the built-in 'template' icon name.
    // Override it so our SVG appears on the plugin's own button.
    editor.ui.registry.addIcon('template', FOLDER_STAR_SVG);
    return;
  }

  // GPL mode: register under our custom name and wire up the button.
  editor.ui.registry.addIcon('insert-template', FOLDER_STAR_SVG);

  if (!isFunction(onInsertTemplate) && !(initialTemplates && initialTemplates.length > 0)) return;

  editor.ui.registry.addButton('inserttemplate', {
    icon: 'insert-template',
    tooltip: translate('insertTemplate'),
    onAction: () => {
      const currentTemplates = getTemplates ? getTemplates() : [];

      if (isFunction(onInsertTemplate)) {
        onInsertTemplate(editor);
        return;
      }

      if (currentTemplates && currentTemplates.length > 0) {
        const flatEntries = flattenTemplatesForSelect(currentTemplates, translate);
        if (flatEntries.length === 0) return;

        editor.windowManager.open({
          title: translate('insertTemplate'),
          body: {
            type: 'panel',
            items: [
              {
                type: 'selectbox',
                name: 'template',
                label: translate('selectTemplate'),
                items: flatEntries.map((entry) => ({
                  text: entry.text,
                  value: entry.value,
                })),
              },
            ],
          },
          buttons: [
            { type: 'cancel', text: translate('cancel') },
            { type: 'submit', text: translate('insert'), primary: true },
          ],
          onSubmit: (api) => {
            const selectedIndex = parseInt(api.getData().template, 10);
            if (
              !Number.isNaN(selectedIndex)
              && selectedIndex >= 0
              && selectedIndex < flatEntries.length
            ) {
              const selectedTemplate = flatEntries[selectedIndex].template;
              const content = selectedTemplate.content ?? selectedTemplate.html ?? '';
              api.close();
              timeoutRef.current = setTimeout(() => {
                const currentEditor = editorRef.current;
                if (!currentEditor || currentEditor.destroyed) return;
                currentEditor.setContent(content);
                const newContent = currentEditor.getContent();
                if (isFunction(onChangeRef?.current)) {
                  onChangeRef.current({ target: { name, value: newContent } });
                }
              }, 10);
            }
          },
        });
      }
    },
  });
}
