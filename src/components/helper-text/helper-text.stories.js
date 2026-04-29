import React from 'react';

import HelperText from '.';

export default {
  title: 'Components/HelperText',
  tags: ['autodocs'],
  component: HelperText,
  argTypes: {
    children: {
      description: 'Content to display (used when text is not provided).',
      control: false,
    },
    disableMargin: {
      description: 'When true, removes top margin.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      description: 'When true, uses error styling (e.g. error color).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    text: {
      description: 'Helper text string (takes precedence over children).',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export const Default = {
  args: {
    text: 'Optional helper text for the field.',
  },
};

export const WithChildren = {
  args: {
    children: (
      <>
        Custom content with <strong>formatting</strong>.
      </>
    ),
  },
};

export const Error = {
  args: {
    error: true,
    text: 'This field is required.',
  },
};

export const DisableMargin = {
  args: {
    disableMargin: true,
    text: 'Helper text with no top margin.',
  },
  render: (args) => (
    <div>
      <p>Label or field above</p>
      <HelperText {...args} />
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>Default</p>
        <HelperText text="Standard helper text below a field." />
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>Error</p>
        <HelperText error text="Validation error message." />
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>No margin</p>
        <HelperText disableMargin text="Helper with margin disabled." />
      </div>
    </div>
  ),
};
