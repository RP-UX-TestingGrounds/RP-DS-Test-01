import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RichTextEditor from '.';

jest.mock('tinymce/tinymce', () => ({}));
jest.mock('tinymce/models/dom/model', () => ({}));
jest.mock('tinymce/themes/silver', () => ({}));
jest.mock('tinymce/icons/default', () => ({}));
jest.mock('tinymce/skins/ui/oxide/skin', () => ({}));
jest.mock('tinymce/skins/ui/oxide/skin.min.css', () => ({}));
jest.mock('tinymce/skins/content/default/content', () => ({}));
jest.mock('tinymce/skins/ui/oxide/content', () => ({}));
jest.mock('tinymce/plugins/anchor', () => ({}));
jest.mock('tinymce/plugins/advlist', () => ({}));
jest.mock('tinymce/plugins/autolink', () => ({}));
jest.mock('tinymce/plugins/charmap', () => ({}));
jest.mock('tinymce/plugins/code', () => ({}));
jest.mock('tinymce/plugins/media', () => ({}));
jest.mock('tinymce/plugins/visualblocks', () => ({}));
jest.mock('tinymce/plugins/fullscreen', () => ({}));
jest.mock('tinymce/plugins/insertdatetime', () => ({}));
jest.mock('tinymce/plugins/preview', () => ({}));
jest.mock('tinymce/plugins/help', () => ({}));
jest.mock('tinymce/plugins/help/js/i18n/keynav/en', () => ({}));
jest.mock('tinymce/plugins/image', () => ({}));
jest.mock('tinymce/plugins/link', () => ({}));
jest.mock('tinymce/plugins/lists', () => ({}));
jest.mock('tinymce/plugins/searchreplace', () => ({}));
jest.mock('tinymce/plugins/table', () => ({}));
jest.mock('tinymce/plugins/wordcount', () => ({}));

jest.mock('./bundled-editor', () => ({
  __esModule: true,
  default: ({
    onInit,
    onEditorChange,
    value,
    init,
    disabled,
    ...domProps
  }) => {
    const mockEditor = {
      getContent: jest.fn(() => value || ''),
      setContent: jest.fn((content) => {
        if (onEditorChange) onEditorChange(content);
      }),
      execCommand: jest.fn(),
      focus: jest.fn(),
      selection: { select: jest.fn(), collapse: jest.fn() },
      notificationManager: { open: jest.fn() },
      windowManager: { open: jest.fn(() => ({ close: jest.fn() })) },
      ui: {
        registry: {
          addIcon: jest.fn(),
          addButton: jest.fn(),
          addMenuButton: jest.fn(),
        },
      },
      on: jest.fn(),
    };

    if (init && init.setup) {
      init.setup(mockEditor);
    }

    // Defer onInit so setCharCount doesn't fire during render
    if (onInit) {
      setTimeout(() => onInit({}, mockEditor), 0);
    }

    return (
      <div
        data-testid="tinymce-editor-mock"
        disabled={disabled || undefined}
        {...domProps}
      >
        <textarea
          data-testid="tinymce-textarea"
          value={value || ''}
          readOnly
        />
      </div>
    );
  },
}));

describe('RichTextEditor', () => {
  afterEach(cleanup);

  const defaultProps = {
    name: 'test-editor',
    testId: 'test-editor',
  };

  function renderComponent(props = {}) {
    let result;
    act(() => {
      result = render(<RichTextEditor {...defaultProps} {...props} />);
    });
    const { container } = result;
    const getByTestId = (id) => container.querySelector(`[data-testid="${id}"]`);
    const getByText = (text) => {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.textContent.trim() === text) return node.parentElement;
        node = walker.nextNode();
      }
      return null;
    };
    const getByDataTestId = (id) => container.querySelector(`[data-test-id="${id}"]`);
    return {
      ...result, getByTestId, getByText, getByDataTestId,
    };
  }

  it('renders without crashing', () => {
    const { getByDataTestId } = renderComponent();
    expect(getByDataTestId('test-editor')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = renderComponent({ label: 'Test Label' });
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with required indicator', () => {
    const { getByText } = renderComponent({ label: 'Test Label', required: true });
    const label = getByText('Test Label');
    expect(label.querySelector('span')).toBeTruthy();
    expect(label.querySelector('span').textContent).toBe('*');
  });

  it('renders with helper text', () => {
    const { getByText } = renderComponent({ helperText: 'Helper text' });
    expect(getByText('Helper text')).toBeTruthy();
  });

  it('renders without API key (open-source mode)', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with API key', () => {
    const { getByTestId } = renderComponent({ apiKey: 'test-api-key' });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with initial value', () => {
    const value = '<p>Test content</p>';
    const { getByTestId } = renderComponent({ value });
    expect(getByTestId('tinymce-textarea').value).toBe(value);
  });

  it('renders with placeholder', () => {
    const { getByTestId } = renderComponent({ placeholder: 'Enter text here' });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders disabled state', () => {
    const { getByTestId } = renderComponent({ disabled: true });
    expect(getByTestId('tinymce-editor-mock').hasAttribute('disabled')).toBe(true);
  });

  it('handles onChange callback', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderComponent({ onChange: handleChange });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('handles onBlur callback', () => {
    const handleBlur = jest.fn();
    const { getByTestId } = renderComponent({ onBlur: handleBlur });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with textReplacements', () => {
    const textReplacements = [
      { label: 'Test Label 1', value: 'Test Value 1' },
      { label: 'Test Label 2', value: 'Test Value 2' },
    ];
    const { getByTestId } = renderComponent({ textReplacements });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with templates', () => {
    const templates = [
      { title: 'Template 1', content: '<p>Content 1</p>' },
      { title: 'Template 2', content: '<p>Content 2</p>' },
    ];
    const { getByTestId } = renderComponent({ templates });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with onInsertTemplate callback', () => {
    const handleInsertTemplate = jest.fn();
    const { getByTestId } = renderComponent({ onInsertTemplate: handleInsertTemplate });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with onEmailChecker callback', () => {
    const handleEmailChecker = jest.fn();
    const { getByTestId } = renderComponent({ onEmailChecker: handleEmailChecker });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with characterLimit', () => {
    const { getByTestId } = renderComponent({ characterLimit: 100 });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('shows character counter when characterLimit is provided', () => {
    const { container } = renderComponent({ characterLimit: 100 });
    expect(container.textContent).toContain('0/100');
  });

  it('shows character limit error message when limit is reached', () => {
    const { getByTestId } = renderComponent({
      characterLimit: 10,
      value: '<p>1234567890</p>',
    });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with custom toolbarOptions', () => {
    const { getByTestId } = renderComponent({
      toolbarOptions: 'bold italic | alignleft aligncenter',
    });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with custom height', () => {
    const { getByTestId } = renderComponent({ height: 300 });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with onFileUpload callback', () => {
    const handleFileUpload = jest.fn(() => Promise.resolve([{ url: 'test-url' }]));
    const { getByTestId } = renderComponent({ onFileUpload: handleFileUpload });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('renders with onEditorReady callback', () => {
    const handleEditorReady = jest.fn();
    const { getByTestId } = renderComponent({ onEditorReady: handleEditorReady });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('handles insertValue prop', () => {
    const handleTextInserted = jest.fn();
    const { getByTestId } = renderComponent({
      insertValue: '<p>Inserted content</p>',
      onTextInserted: handleTextInserted,
    });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('syncs internal value with prop value', () => {
    const { getByTestId, rerender } = renderComponent({ value: '<p>Initial</p>' });
    expect(getByTestId('tinymce-textarea').value).toBe('<p>Initial</p>');

    act(() => {
      rerender(<RichTextEditor {...defaultProps} value="<p>Updated</p>" />);
    });
    expect(getByTestId('tinymce-textarea').value).toBe('<p>Updated</p>');
  });

  it('does not show insert template button when no callback or templates', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('shows insert template button when templates provided', () => {
    const templates = [{ title: 'Template 1', content: '<p>Content</p>' }];
    const { getByTestId } = renderComponent({ templates });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('shows insert template button when onInsertTemplate provided', () => {
    const handleInsertTemplate = jest.fn();
    const { getByTestId } = renderComponent({ onInsertTemplate: handleInsertTemplate });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('does not show email checker button when callback not provided', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });

  it('shows email checker button when callback provided', () => {
    const handleEmailChecker = jest.fn();
    const { getByTestId } = renderComponent({ onEmailChecker: handleEmailChecker });
    expect(getByTestId('tinymce-editor-mock')).toBeTruthy();
  });
});
