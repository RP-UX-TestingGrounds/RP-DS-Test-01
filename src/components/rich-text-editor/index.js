/* eslint-disable camelcase */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import BundledEditor from './bundled-editor';
import HelperText from '../helper-text';
import defaultTranslate from '../../utils/translation';
import setupFormatDropdownButton from './buttons/format-dropdown-button';
import setupInsertTemplateButton from './buttons/insert-template-button';
import setupTextReplacementsButton from './buttons/text-replacements-button';
import setupEmailCheckerButton from './buttons/email-checker-button';
import setupAlignmentMenuButton from './buttons/alignment-menu-button';
import './rich-text-editor-toolbar.css';

/**
 * @param {Array<{ title?: string, name?: string, content?: string, html?: string, items?: Array<{ title?: string, name?: string, content?: string, html?: string }> }>} templates
 * @param {() => string} nextId - Per-instance id generator (avoids global counter collision across editors).
 * @returns {Map<string, { id: string, title: string, content?: string, items?: string[] }>}
 */
function buildTemplateStore(templates, nextId) {
  const store = new Map();

  (templates || []).forEach((item) => {
    if (item.items) {
      const catId = nextId();
      const itemIds = [];
      item.items.forEach((tpl) => {
        const tplId = nextId();
        store.set(tplId, {
          id: tplId,
          title: tpl.title || tpl.name || `Template ${tplId}`,
          content: tpl.content || tpl.html || '',
        });
        itemIds.push(tplId);
      });
      store.set(catId, { id: catId, title: item.title || `Category ${catId}`, items: itemIds });
    } else {
      const tplId = nextId();
      store.set(tplId, {
        id: tplId,
        title: item.title || item.name || `Template ${tplId}`,
        content: item.content || item.html || '',
      });
    }
  });
  return store;
}

function storeToList(store) {
  const childIds = new Set();

  store.forEach((entry) => {
    if (entry.items) {
      entry.items.forEach((id) => childIds.add(id));
    }
  });

  const result = [];
  store.forEach((entry) => {
    if (childIds.has(entry.id)) return;
    if (entry.items) {
      result.push({
        id: entry.id,
        title: entry.title,
        items: entry.items
          .filter((id) => store.has(id))
          .map((id) => ({ id: store.get(id).id, title: store.get(id).title })),
      });
    } else {
      result.push({ id: entry.id, title: entry.title });
    }
  });
  return result;
}

function RichTextHelperText({
  content,
  charCount,
  safeCharacterLimit,
  isCharLimitExceeded,
  error,
  translate,
}) {
  let helperText = content;
  let helperTextError = error;
  let helperTextSuffix = null;

  if (safeCharacterLimit) helperTextSuffix = `${charCount}/${safeCharacterLimit}`;

  if (isCharLimitExceeded) {
    helperTextError = true;
    helperText = translate('characterLimitReached', { limit: safeCharacterLimit });
  }

  if (!helperText && !helperTextSuffix) return null;

  return (
    <div
      style={{
        marginTop: 'var(--spacing-4)',
        fontFamily: 'var(--typography-body-sm-font-family)',
        fontSize: 'var(--typography-body-sm-font-size)',
        fontWeight: 'var(--typography-body-sm-font-weight)',
        lineHeight: 'var(--typography-body-sm-line-height)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {helperText && (
        <HelperText
          disableMargin
          error={helperTextError}
          text={helperText}
        />
      )}
      {helperTextSuffix && (
        <span
          style={{
            color: isCharLimitExceeded ? 'var(--error-main)' : 'var(--text-secondary)',
            marginLeft: helperText ? 'var(--spacing-sm)' : '0',
            whiteSpace: 'nowrap',
          }}
        >
          {helperTextSuffix}
        </span>
      )}
    </div>
  );
}

RichTextHelperText.propTypes = {
  content: PropTypes.string,
  charCount: PropTypes.number,
  safeCharacterLimit: PropTypes.number,
  isCharLimitExceeded: PropTypes.bool,
  error: PropTypes.bool,
  translate: PropTypes.func.isRequired,
};

const defaultTranslation = (key, data = {}) => {
  const translations = {
    characterLimitReached: 'Character limit of {{limit}} reached',
    format: 'Format',
    paragraph: 'Paragraph',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    heading5: 'Heading 5',
    heading6: 'Heading 6',
    preformatted: 'Preformatted',
    insertTemplate: 'Insert Template',
    selectTemplate: 'Select a template',
    cancel: 'Cancel',
    insert: 'Insert',
    template: 'Template {{index}}',
    emailChecker: 'Email Checker',
    noTextReplacements: 'No replacements available',
    textReplacements: 'Text Replacements',
    alignment: 'Alignment',
    alignLeft: 'Left',
    alignCenter: 'Center',
    alignRight: 'Right',
    alignJustify: 'Justify',
  };
  return defaultTranslate(translations, key, data);
};

function RichTextEditor({
  name,
  value = '',
  onChange,
  onBlur,
  label,
  placeholder,
  error = false,
  helperText,
  testId,
  disabled = false,
  required = false,
  className,
  apiKey,
  toolbarOptions,
  characterLimit,
  onEditorReady,
  insertValue,
  onTextInserted,
  height = 500,
  onInsertTemplate,
  onEmailChecker,
  textReplacementGroups,
  textReplacements = [],
  templates = [],
  translate = defaultTranslation,
  ...other
}) {
  const editorRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const [charCount, setCharCount] = useState(0);
  const insertTemplateTimeoutRef = useRef(null);
  const pasteTimeoutRef = useRef(null);
  const isEnforcingLimitRef = useRef(false);
  const templatesRef = useRef(templates);
  const isFirstMountRef = useRef(true);
  const onTextInsertedRef = useRef(onTextInserted);
  onTextInsertedRef.current = onTextInserted;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const templateStoreRef = useRef(null);
  const textReplacementsRef = useRef(textReplacements);
  const textReplacementGroupsRef = useRef(textReplacementGroups);
  const textReplacementsButtonApiRef = useRef(null);
  const templateIdCounterRef = useRef(0);
  const nextTemplateId = () => {
    templateIdCounterRef.current += 1;
    return String(templateIdCounterRef.current);
  };

  // Initialise on first render
  if (templateStoreRef.current === null) {
    templateStoreRef.current = buildTemplateStore(templates, nextTemplateId);
  }

  if (process.env.NODE_ENV !== 'production' && characterLimit !== undefined) {
    if (!Number.isInteger(characterLimit) || characterLimit <= 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `RichTextEditor: "characterLimit" must be a positive integer. Received: ${characterLimit}. The limit will be ignored.`,
      );
    }
  }

  const safeCharacterLimit = Number.isInteger(characterLimit) && characterLimit > 0
    ? characterLimit
    : undefined;
  const hasApiKey = !!(apiKey && apiKey.trim().length > 0);
  const [styleTagId] = useState(() => `tinymce-toolbar-styles-${uuidv4()}`);
  const dividerStyleId = `rp-tinymce-toolbar-dividers-${styleTagId}`;
  const editorDomId = `${styleTagId}-${hasApiKey ? 'cdn' : 'gpl'}`;

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => () => {
    if (insertTemplateTimeoutRef.current) clearTimeout(insertTemplateTimeoutRef.current);
    if (pasteTimeoutRef.current) clearTimeout(pasteTimeoutRef.current);
    // Remove toolbar divider <style> (also removed in ed.on('remove') when editor is destroyed).
    const dividerStyleTag = document.getElementById(dividerStyleId);
    if (dividerStyleTag) dividerStyleTag.remove();
  }, [dividerStyleId]);

  useEffect(() => {
    const nextValue = value ?? '';
    if (nextValue !== internalValue) setInternalValue(nextValue);
  }, [value]);

  useEffect(() => { setIsEditorReady(false); }, [apiKey]);

  useEffect(() => {
    if (!insertValue || !isEditorReady) return;
    const editor = editorRef.current;
    if (!editor || editor?.destroyed) return;
    try {
      editor.execCommand('mceInsertContent', false, insertValue);
      const callback = onTextInsertedRef.current;
      if (isFunction(callback)) {
        callback(editor.getContent());
        if (!editorRef.current || editorRef.current?.destroyed) return;
        editorRef.current.focus();
      }
    } catch (e) {
      // Editor may have been destroyed between check and exec; ignore.
    }
  }, [insertValue, isEditorReady]);

  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    templatesRef.current = templates;
    templateStoreRef.current = buildTemplateStore(templates, nextTemplateId);
  }, [templates]);

  // Keep both refs in sync so the TinyMCE fetch callback always reads fresh data.
  // The button is enabled when either grouped or flat replacements are available.
  useEffect(() => {
    textReplacementsRef.current = textReplacements;
    textReplacementGroupsRef.current = textReplacementGroups;
    const api = textReplacementsButtonApiRef.current;
    if (typeof api?.setEnabled === 'function') {
      const hasGroups = Array.isArray(textReplacementGroups) && textReplacementGroups.length > 0;
      const hasFlat = Array.isArray(textReplacements) && textReplacements.length > 0;
      api.setEnabled(hasGroups || hasFlat);
    }
  }, [textReplacementGroups, textReplacements]);

  const parseEditorData = (content) => ({ target: { name, value: content } });

  const truncateHtmlToCharacterLimit = (htmlContent, limit) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const textContent = doc.body.textContent || '';
    if (textContent.length <= limit) return htmlContent;
    doc.body.textContent = textContent.substring(0, limit);
    return doc.body.innerHTML;
  };

  const applyTruncatedContent = (editor, truncatedContent) => {
    try {
      editor.setContent(truncatedContent, { no_events: true });
      editor.selection.select(editor.getBody(), true);
      editor.selection.collapse(false);
      setCharCount(safeCharacterLimit);
      setInternalValue(truncatedContent);
      if (isFunction(onChangeRef.current)) {
        try {
          onChangeRef.current(parseEditorData(truncatedContent));
        } finally {
          isEnforcingLimitRef.current = false;
        }
      }
    } finally {
      isEnforcingLimitRef.current = false;
    }
  };

  const hasTemplates = templates && templates.length > 0;

  const basePlugins = ['lists', 'link', 'image', 'code', 'preview'];
  const plugins = hasApiKey
    ? [
      ...basePlugins,
      'advlist',
      ...(hasTemplates ? ['advtemplate'] : []),
    ]
    : basePlugins;

  const advtemplate_list = () => Promise.resolve(storeToList(templateStoreRef.current));

  const advtemplate_get_template = (id) => {
    const entry = templateStoreRef.current.get(id);
    if (!entry) return Promise.reject(new Error(`Template ${id} not found`));
    return Promise.resolve({ id: entry.id, title: entry.title, content: entry.content || '' });
  };

  const advtemplate_create_category = (title) => {
    const id = nextTemplateId();
    templateStoreRef.current.set(id, { id, title, items: [] });
    return Promise.resolve({ id });
  };

  const advtemplate_create_template = (title, content, categoryId) => {
    const id = nextTemplateId();
    templateStoreRef.current.set(id, { id, title, content });
    if (categoryId) {
      const cat = templateStoreRef.current.get(categoryId);
      if (cat && cat.items) cat.items.push(id);
    }
    return Promise.resolve({ id });
  };

  const advtemplate_rename_category = (id, title) => {
    const entry = templateStoreRef.current.get(id);
    if (entry) entry.title = title;
    return Promise.resolve({});
  };

  const advtemplate_rename_template = (id, title) => {
    const entry = templateStoreRef.current.get(id);
    if (entry) entry.title = title;
    return Promise.resolve({});
  };

  const advtemplate_delete_template = (id) => {
    templateStoreRef.current.delete(id);
    templateStoreRef.current.forEach((entry, key) => {
      if (entry.items) {
        templateStoreRef.current.set(key, {
          ...entry,
          items: entry.items.filter((itemId) => itemId !== id),
        });
      }
    });
    return Promise.resolve({});
  };

  const advtemplate_delete_category = (id) => {
    const cat = templateStoreRef.current.get(id);
    if (cat && cat.items) {
      // Also delete all child templates
      cat.items.forEach((itemId) => templateStoreRef.current.delete(itemId));
    }
    templateStoreRef.current.delete(id);
    return Promise.resolve({});
  };

  const advtemplate_move_template = (templateId, newCategoryId) => {
    // Remove from current category
    templateStoreRef.current.forEach((entry, key) => {
      if (entry.items) {
        templateStoreRef.current.set(key, {
          ...entry,
          items: entry.items.filter((itemId) => itemId !== templateId),
        });
      }
    });
    // Add to new category (or leave at root if undefined)
    if (newCategoryId) {
      const cat = templateStoreRef.current.get(newCategoryId);
      if (cat && cat.items) cat.items.push(templateId);
    }
    return Promise.resolve({});
  };

  const advtemplate_move_category_items = (oldCategoryId, newCategoryId) => {
    const oldCat = templateStoreRef.current.get(oldCategoryId);
    if (oldCat && oldCat.items && newCategoryId) {
      const newCat = templateStoreRef.current.get(newCategoryId);
      if (newCat && newCat.items) {
        newCat.items.push(...oldCat.items);
        oldCat.items = [];
      }
    }
    return Promise.resolve({});
  };

  const editorSetup = (editor) => {
    setupFormatDropdownButton({ editor, translate });
    setupInsertTemplateButton({
      editor,
      translate,
      onInsertTemplate,
      getTemplates: () => templatesRef.current,
      name,
      onChangeRef,
      editorRef,
      insertTemplateTimeoutRef,
      hasApiKey,
    });
    setupTextReplacementsButton({
      editor,
      textReplacementGroupsRef,
      textReplacements,
      textReplacementsButtonApiRef,
      textReplacementsRef,
      translate,
    });
    setupEmailCheckerButton({ editor, translate, onEmailChecker });
    setupAlignmentMenuButton({ editor, translate });

    if (safeCharacterLimit) {
      const enforceCharacterLimit = () => {
        if (!editor || editor.destroyed || isEnforcingLimitRef.current) return;
        const textContent = editor.getContent({ format: 'text' });
        const currentLength = textContent.length;
        setCharCount(currentLength);
        if (currentLength > safeCharacterLimit) {
          isEnforcingLimitRef.current = true;
          try {
            const truncatedContent = truncateHtmlToCharacterLimit(
              editor.getContent(),
              safeCharacterLimit,
            );
            applyTruncatedContent(editor, truncatedContent);
          } finally {
            isEnforcingLimitRef.current = false;
          }
        }
      };

      editor.on('input', enforceCharacterLimit);
      editor.on('SetContent', enforceCharacterLimit);
      editor.on('Paste', () => {
        if (pasteTimeoutRef.current) clearTimeout(pasteTimeoutRef.current);
        pasteTimeoutRef.current = setTimeout(() => {
          pasteTimeoutRef.current = null;
          enforceCharacterLimit();
        }, 0);
      });
    }
  };

  const handleEditorChange = (content) => {
    if (isEnforcingLimitRef.current) return;

    if (safeCharacterLimit && editorRef.current && !editorRef.current.destroyed) {
      const editor = editorRef.current;
      const textContent = editor.getContent({ format: 'text' });
      const currentLength = textContent.length;
      setCharCount(currentLength);

      if (currentLength > safeCharacterLimit) {
        isEnforcingLimitRef.current = true;
        try {
          const truncatedContent = truncateHtmlToCharacterLimit(
            editor.getContent(),
            safeCharacterLimit,
          );
          applyTruncatedContent(editor, truncatedContent);
        } finally {
          isEnforcingLimitRef.current = false;
        }
        return;
      }
    }

    setInternalValue(content);
    if (isFunction(onChangeRef.current)) onChangeRef.current(parseEditorData(content));
  };

  const handleEditorBlur = () => {
    if (!isFunction(onBlur)) return;
    const editor = editorRef.current;
    let content = internalValue;
    if (editor && !editor.destroyed) {
      try {
        content = editor.getContent();
      } catch {
        // Editor destroyed during teardown; use last known internalValue.
      }
    }
    onBlur({ target: { name, value: content } });
  };

  // inserttemplate toolbar rules:
  //   CDN  — only when templates provided (advtemplate needs its callbacks)
  //   GPL  — when templates provided OR onInsertTemplate custom callback
  const insertTemplateBtn = (
    hasTemplates
    || (!hasApiKey && isFunction(onInsertTemplate))
  ) ? 'inserttemplate | ' : '';

  const defaultToolbarOptions = toolbarOptions
    || `${insertTemplateBtn}| undo redo |  formatstyles bold italic strikethrough | `
    + `alignmentmenu numlist bullist | outdent indent | `
    + `image link hr | `
    + `${(Array.isArray(textReplacements) || Array.isArray(textReplacementGroups)) ? 'textreplacements ' : ''}code |`
    + `${isFunction(onEmailChecker) ? 'emailchecker' : ''} preview`;

  const isCharLimitExceeded = safeCharacterLimit && charCount > safeCharacterLimit;

  const safeOther = Object.fromEntries(
    Object.entries(other).filter(([key]) => !['value', 'disabled', 'id', 'onInit'].includes(key)),
  );

  return (
    <div
      className={className} data-test-id={testId}
      style={{ width: '100%' }}
    >
      {label && (
        <label
          htmlFor={editorDomId}
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 400,
            color: error ? 'var(--error-main)' : 'var(--text-primary)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--error-main)', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}
      {loaded && (
        <BundledEditor
          key={hasApiKey ? 'with-apikey' : 'without-apikey'}
          apiKey={apiKey}
          id={editorDomId}
          onInit={(evt, editor) => {
            editorRef.current = editor;
            if (safeCharacterLimit) {
              setCharCount(editor.getContent({ format: 'text' }).length);
            }
            setIsEditorReady(true);
            if (isFunction(onEditorReady)) onEditorReady(editor);
          }}
          value={internalValue}
          disabled={disabled}
          {...safeOther}
          init={{
            height,
            menubar: false,
            branding: false,
            statusbar: false,
            placeholder,
            toolbar_mode: 'scrolling',
            toolbar_sticky: false,
            plugins,
            toolbar: defaultToolbarOptions,
            image_advtab: true,
            image_caption: true,
            ...(hasApiKey && hasTemplates && {
              advtemplate_list,
              advtemplate_get_template,
              advtemplate_create_category,
              advtemplate_create_template,
              advtemplate_rename_category,
              advtemplate_rename_template,
              advtemplate_delete_template,
              advtemplate_delete_category,
              advtemplate_move_template,
              advtemplate_move_category_items,
            }),

            formats: {
              strikethrough: {
                inline: 'span',
                styles: { 'text-decoration': 'line-through' },
                exact: true,
              },
            },
            browser_spellcheck: true,
            contextmenu: hasApiKey && hasTemplates ? 'advtemplate image link' : 'image link',
            icons: 'default',
            icons_url: undefined,
            content_style:
              'body { font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif; font-size:14px }',
            setup: (ed) => {
              editorSetup(ed);
              ed.on('init', () => {
                const container = ed.getContainer();
                if (!container) return;
                container.setAttribute('data-rp-editor-instance', styleTagId);
                container.classList.add(`rp-tinymce-scope-${styleTagId}`);
                container.classList.add('rp-tinymce-toolbar-scope');
                // Inject toolbar divider override so it wins over TinyMCE skin (load order).
                if (!document.getElementById(dividerStyleId)) {
                  const style = document.createElement('style');
                  style.id = dividerStyleId;
                  style.textContent = [
                    `.rp-tinymce-toolbar-scope.tox .tox-toolbar__group:not(:last-of-type) { border-right-color: rgba(0, 0, 0, 0.12) !important; }`,
                    `.rp-tinymce-toolbar-scope.tox[dir="rtl"] .tox-toolbar__group:not(:last-of-type) { border-left-color: rgba(0, 0, 0, 0.12) !important; }`,
                    `.rp-tinymce-toolbar-scope.tox .tox-toolbar__group:has(button[data-mce-name="code"]) { border-right-color: transparent !important; }`,
                    `.rp-tinymce-toolbar-scope.tox[dir="rtl"] .tox-toolbar__group:has(button[data-mce-name="code"]) { border-left-color: transparent !important; }`,
                    `.rp-tinymce-toolbar-scope button[data-mce-name="textreplacements"] .tox-tbtn__select-chevron { display: none !important; width: 0 !important; overflow: hidden !important; }`,
                  ].join('\n');
                  document.head.appendChild(style);
                }
                ed.on('remove', () => {
                  const tag = document.getElementById(dividerStyleId);
                  if (tag) tag.remove();
                });
                // Push last toolbar group (email checker + preview) to the end of the toolbar.
                const applyPullRightToLastGroup = () => {
                  const lastGroup = container.querySelector('.tox-toolbar__group:last-child');
                  if (lastGroup) {
                    lastGroup.classList.add('tox-toolbar__group--pull-right');
                  }
                };
                applyPullRightToLastGroup();
                setTimeout(applyPullRightToLastGroup, 0);
              });
            },
          }}
          onEditorChange={handleEditorChange}
          onBlur={handleEditorBlur}
        />
      )}

      {safeCharacterLimit && (
        <RichTextHelperText
          content={helperText}
          charCount={charCount}
          safeCharacterLimit={safeCharacterLimit}
          isCharLimitExceeded={isCharLimitExceeded}
          error={error}
          translate={translate}
        />
      )}
      {!safeCharacterLimit && <HelperText error={error} text={helperText} />}
    </div>
  );
}

RichTextEditor.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  apiKey: PropTypes.string,
  toolbarOptions: PropTypes.string,
  characterLimit: (props, propName, componentName) => {
    const val = props[propName];
    if (val !== undefined && (!Number.isInteger(val) || val <= 0)) {
      return new Error(
        `${componentName}: "${propName}" must be a positive integer. Received: ${val}.`,
      );
    }
    return null;
  },
  onEditorReady: PropTypes.func,
  insertValue: PropTypes.string,
  onTextInserted: PropTypes.func,
  height: PropTypes.number,
  onInsertTemplate: PropTypes.func,
  onEmailChecker: PropTypes.func,
  textReplacementGroups: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  textReplacements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      content: PropTypes.string,
      html: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        name: PropTypes.string,
        content: PropTypes.string,
        html: PropTypes.string,
      })),
    }),
  ),
  translate: PropTypes.func,
};

export default RichTextEditor;
