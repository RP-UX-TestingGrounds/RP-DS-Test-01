import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { action } from 'storybook/actions';

import RichTextEditorField from './rich-text-editor-field';
import Button from '../button';

export default {
  title: 'Components/Inputs/RichTextEditorField',
  tags: ['autodocs'],
  component: ({ defaultValue, validationSchema, ...args }) => {
    const formik = useFormik({
      initialValues: {
        content: defaultValue || '',
      },
      validationSchema,
      onSubmit: (values) => {
        action('submitted')(values);
      },
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <RichTextEditorField
          formik={formik}
          {...args}
        />
        <Button onClick={() => formik.handleSubmit()} color="primary">
          Submit Form
        </Button>
        <Button onClick={() => formik.resetForm()}>
          Reset Form
        </Button>
        <div
          style={{
            marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px',
          }}
        >
          <strong>Form Values:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify(formik.values, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        component: 'A Formik-compatible wrapper for RichTextEditor that automatically handles form state management, validation, and error display.',
      },
    },
  },
};

const documentation = {
  formik: { description: 'Formik instance from useFormik hook (required)' },
  name: { description: 'Field name that matches Formik form values (required)' },
  testId: { description: 'Test ID for testing purposes (required)' },
  label: { description: 'Label text displayed above the editor' },
  placeholder: { description: 'Placeholder text shown when editor is empty' },
  apiKey: {
    description: 'Optional TinyMCE Cloud API key. If provided, TinyMCE loads from Tiny Cloud CDN and advanced features (e.g. advlist) are enabled. If not provided or empty, uses bundled open-source GPL mode with core plugins only.',
    control: { type: 'text' },
  },
  textReplacements: { description: 'Array of text replacement options. Each item should have { label: string, value: string }' },
  templates: { description: 'Array of templates available for insertion. Each template should have { title: string, content: string } or { name: string, html: string }' },
  characterLimit: { description: 'Character limit for the editor content' },
  height: { description: 'Editor height in pixels' },
  disabled: { description: 'Disable the editor' },
  required: { description: 'Mark field as required' },
};

export const Primary = {
  args: {
    name: 'content',
    testId: 'rich-text-editor-field-test',
    label: 'Content',
    placeholder: 'Enter your content here...',
    defaultValue: '<p>This is some <strong>rich text</strong> content with <em>formatting</em>.</p>',
    validationSchema: yup.object({
      content: yup
        .string()
        .required('Content is required'),
    }),
  },
  argTypes: {
    ...documentation,
  },
};

export const WithValidation = {
  args: {
    ...Primary.args,
    label: 'Content (Min 50 characters)',
    defaultValue: '<p>Short content</p>',
    validationSchema: yup.object({
      content: yup
        .string()
        .required('Content is required')
        .test('min-length', 'Content must be at least 50 characters', (value) => {
          if (!value) return false;
          const textContent = value.replace(/<[^>]*>/g, ''); // Strip HTML tags
          return textContent.length >= 50;
        }),
    }),
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with validation requiring minimum 50 characters of text content (HTML tags excluded). Try submitting with short content to see the validation error.',
      },
    },
  },
};

export const WithCharacterLimit = {
  args: {
    ...Primary.args,
    label: 'Content (Character Limit: 100)',
    characterLimit: 100,
    defaultValue: '<p>This editor has a character limit of 100 characters.</p>',
    validationSchema: yup.object({
      content: yup.string().required('Content is required'),
    }),
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
  render: ({
    useGrouped, defaultValue, validationSchema, ...storyArgs
  }) => {
    const formik = useFormik({
      initialValues: { content: defaultValue || '' },
      validationSchema,
      onSubmit: (values) => action('submitted')(values),
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <RichTextEditorField
          key={useGrouped ? 'grouped' : 'flat'}
          formik={formik}
          {...storyArgs}
          textReplacementGroups={useGrouped ? textReplacementGroups : undefined}
          textReplacements={useGrouped ? [] : flatTextReplacements}
        />
        <Button onClick={() => formik.handleSubmit()} color="primary">
          Submit Form
        </Button>
      </div>
    );
  },
  args: {
    ...Primary.args,
    label: 'Email Body Editor',
    useGrouped: true,
    validationSchema: yup.object({
      content: yup.string().required('Content is required'),
    }),
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

export const WithTemplates = {
  args: {
    ...Primary.args,
    label: 'Email Template Editor',
    templates: [
      {
        title: 'Welcome Email',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Welcome Email Template</h2>
            <p>Dear [CUSTOMER_NAME],</p>
            <p>Thank you for joining us! We're excited to have you on board.</p>
            <p>Best regards,<br>The Team</p>
          </div>
        `,
      },
      {
        title: 'Order Confirmation',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Order Confirmation</h2>
            <p>Dear [CUSTOMER_NAME],</p>
            <p>Thank you for your order #[ORDER_NUMBER]!</p>
            <p>Your order total is [ORDER_TOTAL].</p>
            <p>We'll send you a shipping confirmation once your order ships.</p>
            <p>Best regards,<br>The Team</p>
          </div>
        `,
      },
    ],
    validationSchema: yup.object({
      content: yup.string().required('Content is required'),
    }),
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with Insert Template functionality integrated with Formik. Click the Insert Template button to select and insert a template.',
      },
    },
  },
};

export const WithCustomEvents = {
  args: {
    ...Primary.args,
  },
  render: ({ validationSchema, ...args }) => {
    const formik = useFormik({
      initialValues: {
        content: args.defaultValue || '',
      },
      validationSchema,
      onSubmit: (values) => {
        action('submitted')(values);
      },
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      action('custom-changed')({ name, value });
    };

    const handleBlur = (e) => {
      const { name, value } = e.target;
      action('custom-blurred')({ name, value });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <RichTextEditorField
          formik={formik}
          onChange={handleChange}
          onBlur={handleBlur}
          {...args}
        />
        <Button onClick={() => formik.handleSubmit()} color="primary">
          Submit Form
        </Button>
        <Button onClick={() => formik.resetForm()}>
          Reset Form
        </Button>
        <div
          style={{
            marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px',
          }}
        >
          <strong>Form Values:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify(formik.values, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with custom onChange and onBlur handlers that work alongside Formik\'s handlers.',
      },
    },
  },
};

export const Disabled = {
  args: {
    ...Primary.args,
    label: 'Disabled Editor',
    disabled: true,
    defaultValue: '<p>This editor is disabled and cannot be edited.</p>',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithoutApiKey = {
  args: {
    ...Primary.args,
    label: 'Editor (Open-Source Mode - No API Key)',
    defaultValue: '<p>This editor works without an API key. Premium features like advanced list styles are not available.</p>',
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'When no API key is provided, the editor works in open-source GPL mode using bundled TinyMCE assets. No CDN call is made, and no license validation is required.',
      },
    },
  },
};
