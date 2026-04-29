/**
 * Setup function for the Alignment menu button
 */
export default function setupAlignmentMenuButton({ editor, translate }) {
  editor.ui.registry.addMenuButton('alignmentmenu', {
    icon: 'align-left',
    tooltip: translate('alignment'),
    fetch: (callback) => {
      const items = [
        {
          type: 'menuitem',
          icon: 'align-left',
          text: translate('alignLeft'),
          onAction: () => editor.execCommand('JustifyLeft'),
        },
        {
          type: 'menuitem',
          icon: 'align-center',
          text: translate('alignCenter'),
          onAction: () => editor.execCommand('JustifyCenter'),
        },
        {
          type: 'menuitem',
          icon: 'align-right',
          text: translate('alignRight'),
          onAction: () => editor.execCommand('JustifyRight'),
        },
        {
          type: 'menuitem',
          icon: 'align-justify',
          text: translate('alignJustify'),
          onAction: () => editor.execCommand('JustifyFull'),
        },
      ];
      callback(items);
    },
  });
}
