/**
 * Setup function for the Format/Styles dropdown button
 * Registers the format-T icon and formatstyles menu button
 */
export default function setupFormatDropdownButton({ editor, translate }) {
  // "T" icon for format dropdown
  editor.ui.registry.addIcon(
    'format-T',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
  );

  // Format/Styles dropdown with "T" icon
  editor.ui.registry.addMenuButton('formatstyles', {
    icon: 'format-T',
    tooltip: translate('format'),
    fetch: (callback) => {
      const items = [
        { type: 'menuitem', text: translate('paragraph'), onAction: () => editor.execCommand('FormatBlock', false, 'p') },
        { type: 'menuitem', text: translate('heading1'), onAction: () => editor.execCommand('FormatBlock', false, 'h1') },
        { type: 'menuitem', text: translate('heading2'), onAction: () => editor.execCommand('FormatBlock', false, 'h2') },
        { type: 'menuitem', text: translate('heading3'), onAction: () => editor.execCommand('FormatBlock', false, 'h3') },
        { type: 'menuitem', text: translate('heading4'), onAction: () => editor.execCommand('FormatBlock', false, 'h4') },
        { type: 'menuitem', text: translate('heading5'), onAction: () => editor.execCommand('FormatBlock', false, 'h5') },
        { type: 'menuitem', text: translate('heading6'), onAction: () => editor.execCommand('FormatBlock', false, 'h6') },
        { type: 'menuitem', text: translate('preformatted'), onAction: () => editor.execCommand('FormatBlock', false, 'pre') },
      ];
      callback(items);
    },
  });
}
