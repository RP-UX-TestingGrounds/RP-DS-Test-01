import React, { useState } from 'react';
import { action } from 'storybook/actions';
import RichTextEditor from '.';

export default {
  title: 'Components/RichTextEditor',
  tags: ['autodocs'],
  component: RichTextEditor,
  parameters: {
    docs: {
      description: {
        component: 'A rich text editor component built on TinyMCE. The API key is optional - when not provided, the editor works in open-source mode without premium features like advanced list styles.',
      },
    },
  },
};

const args = {
  name: 'editor',
  testId: 'tinymce-editor-test',
  value: '<p>This is some <strong>rich text</strong> content with <em>formatting</em>.</p>',
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  label: 'Rich Text Editor',
  placeholder: 'Enter your text here...',
  height: 500,
};

const documentation = {
  name: { description: 'Name attribute for the editor field (required for form integration)' },
  testId: { description: 'Test ID for testing purposes' },
  value: { description: 'Initial HTML content value' },
  onChange: { description: 'Callback function when editor content changes' },
  onBlur: { description: 'Callback function when editor loses focus' },
  label: { description: 'Label text displayed above the editor' },
  placeholder: { description: 'Placeholder text shown when editor is empty' },
  apiKey: {
    description: 'Optional TinyMCE Cloud API key. If provided, TinyMCE loads from Tiny Cloud CDN and advanced features (e.g. advlist) are enabled. If not provided or empty, uses bundled open-source GPL mode with core plugins only.',
    control: { type: 'text' },
  },
  textReplacements: { description: 'Array of text replacement options. Each item should have { label: string, value: string }' },
  templates: { description: 'Array of templates available for insertion. Each template should have { title: string, content: string } or { name: string, html: string }. If provided, clicking Insert Template opens a dialog to select from these templates.' },
  onInsertTemplate: { description: 'Optional custom callback when Insert Template button is clicked. If provided, this overrides the default template dialog. Receives editor instance.' },
  onInsertPersonalizationTag: { description: 'Callback when Personalization Tags button is clicked' },
  onEmailChecker: { description: 'Callback when Email Checker button is clicked' },
};

export const Default = {
  args: {
    ...args,
  },
  argTypes: {
    ...documentation,
  },
};

export const WithoutApiKey = {
  args: {
    ...args,
    label: 'Editor (Open-Source Mode - No API Key)',
    value: '<p>This editor works without an API key. Advanced features like list styles (advlist) are not available.</p>',
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'When no API key is provided, the editor works in open-source GPL mode using bundled TinyMCE assets. No CDN call is made, and no license validation is required. Safe to use across any host app regardless of how static assets are served.',
      },
    },
  },
};

export const WithApiKey = {
  args: {
    ...args,
    apiKey: '',
    label: 'Editor (With API Key - CDN + Advanced Features)',
    value: '<p>Supply a real TinyMCE Cloud API key via the Controls panel below to enable CDN mode and advanced features like list styles (advlist).</p>',
  },
  argTypes: {
    ...documentation,
    apiKey: {
      description: 'Paste your TinyMCE Cloud API key here. When provided, TinyMCE loads from the Tiny Cloud CDN and advanced features (e.g. advlist) are enabled. Leave empty to fall back to GPL/bundled mode.',
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `**CDN mode** — When a valid API key is supplied, TinyMCE loads from the Tiny Cloud CDN. 
        License is validated against Tiny's servers and advanced features like \`advlist\` (list styles) are available.
        To test this story:
        1. Get a free API key at [tiny.cloud](https://www.tiny.cloud/auth/signup/)
        2. Paste it into the **apiKey** field in the Controls panel below
        3. The editor will reload using the CDN and the license warning will disappear`,
      },
    },
  },
};

const textReplacementGroups = [
  {
    label: 'Store',
    items: [
      { value: '[Store Name]', label: '[Store Name]' },
      { value: '[Store Phone]', label: '[Store Phone]' },
      { value: '[Store Address]', label: '[Store Address]' },
    ],
  },
  {
    label: 'Cart Saver',
    items: [
      { value: '[Checkout Link]', label: '[Checkout Link]' },
      { value: '[Cart Items]', label: '[Cart Items]' },
    ],
  },
  {
    label: 'User',
    items: [
      { value: '[Customer Name]', label: '[Customer Name]' },
      { value: '[Customer Email]', label: '[Customer Email]' },
    ],
  },
];

const flatTextReplacements = [
  { label: '[Unsubscribe Link]', value: '[UNSUBSCRIBE_LINK]' },
  { label: 'Expiration Date', value: '[EXPIRATION_DATE]' },
  { label: 'Promo Code', value: '[PROMO_CODE]' },
  { label: 'Subtotal Min', value: '[SUBTOTAL_MIN]' },
  { label: 'Max discount cap', value: '[MAX_DISCOUNT_CAP]' },
  { label: 'Discount Amount', value: '[DISCOUNT_AMOUNT]' },
];

export const WithTextReplacements = {
  // Re-mount editor when useGrouped changes so TinyMCE re-registers toolbar buttons.
  render: ({ useGrouped, ...storyArgs }) => (
    <RichTextEditor
      key={useGrouped ? 'grouped' : 'flat'}
      {...storyArgs}
      textReplacementGroups={useGrouped ? textReplacementGroups : undefined}
      textReplacements={useGrouped ? [] : flatTextReplacements}
    />
  ),
  args: {
    ...args,
    label: 'Email Body Editor',
    useGrouped: true,
    onEmailChecker: action('onEmailChecker'),
  },
  argTypes: {
    ...documentation,
    useGrouped: {
      description: 'Toggle between grouped sections and a flat replacement list.',
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Text Replacements dropdown in the toolbar. Toggle **useGrouped** to switch between grouped sections with headers (`textReplacementGroups`) and a flat list (`textReplacements`).',
      },
    },
  },
};

export const WithCharacterLimit = {
  args: {
    ...args,
    label: 'Editor with Character Limit',
    characterLimit: 100,
    value: '<p>This editor has a character limit of 100 characters.</p>',
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with character limit enforcement. Content will be truncated if it exceeds the limit.',
      },
    },
  },
};

export const Disabled = {
  args: {
    ...args,
    label: 'Disabled Editor',
    disabled: true,
    value: '<p>This editor is disabled and cannot be edited.</p>',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithError = {
  args: {
    ...args,
    label: 'Editor with Error',
    error: true,
    helperText: 'This field is required',
    value: '',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithInsertTemplate = {
  render: (storyArgs) => {
    const [editorValue, setEditorValue] = useState('');
    return (
      <RichTextEditor
        {...storyArgs}
        value={editorValue}
        onChange={(e) => {
          setEditorValue(e.target.value);
          action('onChange')(e);
        }}
      />
    );
  },
  args: {
    ...args,
    apiKey: '',
    label: 'Email Template Editor',
    onEmailChecker: action('onEmailChecker'),
    templates: [
      {
        title: 'Quick Replies',
        items: [
          {
            title: 'Message Received',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Dear [CUSTOMER_NAME],</p>
                <p>Just a quick note to say we've received your message, and will get back to you within 48 hours.</p>
                <p>For reference, your ticket number is: [TICKET_NUMBER]</p>
                <p>Regards,<br>[AGENT_NAME]</p>
              </div>
            `,
          },
          {
            title: 'Thanks for the Feedback',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hi [CUSTOMER_NAME],</p>
                <p>We appreciate you taking the time to provide feedback on [PRODUCT_NAME].</p>
                <p>All the best,<br>[AGENT_NAME]</p>
              </div>
            `,
          },
          {
            title: 'Still Working on Case',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hi [CUSTOMER_NAME],</p>
                <p>Just a quick note to let you know we're still working on your case. We're aiming to get you an answer in the next 48 hours.</p>
                <p>Stay tuned,<br>[AGENT_NAME]</p>
              </div>
            `,
          },
        ],
      },
      {
        title: 'Closing Tickets',
        items: [
          {
            title: 'Closing Ticket',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hi [CUSTOMER_NAME],</p>
                <p>We haven't heard back from you in over a week, so we have gone ahead and closed your ticket number [TICKET_NUMBER].</p>
                <p>If you're still running into issues, just reply to this email and we will re-open your ticket.</p>
                <p>All the best,<br>[AGENT_NAME]</p>
              </div>
            `,
          },
          {
            title: 'Post-Call Survey',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Hey [CUSTOMER_NAME]!</p>
                <p>How did we do? If you have a few moments, we'd love you to fill out our post-support survey: [SURVEY_LINK]</p>
                <p>Thanks in advance!<br>[COMPANY_NAME] Customer Support</p>
              </div>
            `,
          },
        ],
      },
      {
        title: 'Order Notifications',
        items: [
          {
            title: 'Order Confirmation',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #333;">Order Confirmation</h2>
                <p>Dear [CUSTOMER_NAME],</p>
                <p>Thank you for your order <strong>#[ORDER_NUMBER]</strong>!</p>
                <p>Your order total is <strong>[ORDER_TOTAL]</strong>.</p>
                <p>We'll send you a shipping confirmation once your order ships.</p>
                <p>Best regards,<br>The Team</p>
              </div>
            `,
          },
          {
            title: 'Shipping Notification',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #333;">Your Order Has Shipped!</h2>
                <p>Dear [CUSTOMER_NAME],</p>
                <p>Your order <strong>#[ORDER_NUMBER]</strong> has shipped.</p>
                <p>Tracking Number: <strong>[TRACKING_NUMBER]</strong><br>
                Expected Delivery: <strong>[DELIVERY_DATE]</strong></p>
                <p>Best regards,<br>The Team</p>
              </div>
            `,
          },
          {
            title: 'Discount Offer',
            content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #333;">Special Offer Just for You!</h2>
                <p>Dear [CUSTOMER_NAME],</p>
                <p>As a valued customer, we'd like to offer you <strong>[DISCOUNT_AMOUNT]</strong> off your next purchase!</p>
                <p>Use code: <strong>[PROMO_CODE]</strong></p>
                <p>This offer expires on [EXPIRATION_DATE].</p>
                <p>Best regards,<br>The Team</p>
              </div>
            `,
          },
        ],
      },
    ],
  },
  argTypes: {
    ...documentation,
    apiKey: {
      description:
        'With an API key: uses the official **advtemplate** premium plugin — full dialog with categories, rename, delete, move (three-dot menu). Without an API key: uses a simple GPL fallback dialog with a flat template list.',
      control: { type: 'text' },
    },
    templates: {
      description:
        'Array of template categories. Each category has `{ title, items: [{ title, content }] }`. Flat templates `{ title, content }` without a category are also supported.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**CDN mode (API key provided):** Uses TinyMCE's official \`advtemplate\` premium plugin.
Templates are organised into categories and the dialog supports:
- 📁 Category grouping
- ✏️ Rename template / category (three-dot menu)
- 🗑️ Delete template / category
- 📦 Move template to another category
- ➕ Add new template from current editor selection (\`addtemplate\` toolbar button)
- 🔍 Search templates

**GPL mode (no API key):** Falls back to a simple custom dialog with a flat template list (insert only, no management).

To test CDN mode, paste a valid TinyMCE Cloud API key into the **apiKey** control below.
        `,
      },
    },
  },
};
