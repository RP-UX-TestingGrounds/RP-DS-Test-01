import React from 'react';

import Typography, { TYPOGRAPHY_TYPE_SIZE_PAIRS } from '.';

export default {
  title: 'Components/Typography',
  tags: ['autodocs'],
  component: Typography,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text or nodes to render.',
    },
    component: {
      description: 'Underlying HTML element or component.',
      table: {
        type: { summary: 'elementType' },
        defaultValue: { summary: 'span' },
      },
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'subtle'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    type: {
      control: 'select',
      options: ['body', 'heading', 'title'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
    },
  },
};

export const Default = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    size: 'md',
    textColor: 'primary',
    type: 'body',
  },
};

export const AllTypeSizePairs = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {TYPOGRAPHY_TYPE_SIZE_PAIRS.map(({ type, size }) => (
        <Typography
          key={`${type}-${size}`}
          size={size}
          type={type}
        >
          {type}
          {' '}
          {size}
          {' '}
          — The quick brown fox jumps over the lazy dog.
        </Typography>
      ))}
    </div>
  ),
};

export const TextColors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Typography textColor="primary">Primary text color</Typography>
      <Typography textColor="secondary">Secondary text color</Typography>
      <Typography textColor="subtle">Subtle text color</Typography>
    </div>
  ),
};

export const AsHeading = {
  args: {
    children: 'Page section title',
    component: 'h2',
    role: 'heading',
    'aria-level': 2,
    size: 'lg',
    type: 'title',
  },
};
