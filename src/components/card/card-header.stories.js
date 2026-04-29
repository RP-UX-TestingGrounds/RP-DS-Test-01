import React from 'react';
import { action } from 'storybook/actions';
import { Delete, Edit, Flare } from '@mui/icons-material';
import { styled } from '@mui/material';

import CardHeader from './card-header';

import Chip from '../chip';
import Button from '../button';
import MenuButton from '../menu-button';
import { generateMenuItems } from '../menu-button/menu-items-helper';

const InnerCard = styled('div')({
  margin: 'var(--spacing-32)',
  backgroundColor: 'var(--card-color)',
});

export default {
  component: CardHeader,
  globals: {
    backgrounds: { value: 'surface', grid: false },
  },
  tags: [],
  title: 'Components/Card/CardHeader',
};

const documentation = {
  action: {
    description: 'Main action element to display in the header (typically button or icon button)',
    table: {
      type: {
        summary: 'node',
      },
    },
  },
  badge: {
    description: 'Badge element to display next to the title (typically a Chip)',
    table: {
      type: {
        summary: 'node',
      },
    },
  },
  menuItems: {
    description: 'Array of menu items to display in an IconMenu (displays a menu icon button)',
    table: {
      type: {
        summary: 'Array<{ label: string, value: string|number, onClick?: func, icon?: node, disabled?: bool }>',
      },
    },
  },
  testId: {
    description: 'Test ID of the card header',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  title: {
    description: 'Title of the card header',
    table: {
      type: {
        summary: 'string | node',
      },
    },
  },
  description: {
    description: 'Description of the card header',
    table: {
      type: {
        summary: 'string | node',
      },
    },
  },
};

export const Default = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader
        {...props}
      />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    description: 'Short card description',
    title: 'Card Title',
  },
};

export const WithLongDescription = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader {...props} />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    title: 'Card Title',
  },
};

export const WithBadge = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader {...props} />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    badge: (
      <Chip
        color="warning"
        label="Pending"
        size="small"
      />
    ),
    title: 'Order #12345',
  },
};

export const WithMultipleActions = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader {...props} />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    menuItems: [
      {
        icon: <Edit />,
        label: 'Edit',
        onClick: () => action('edit-clicked')(),
        value: 'edit',
      },
      {
        icon: <Delete />,
        label: 'Delete',
        onClick: () => action('delete-clicked')(),
        value: 'delete',
      },
    ],
    title: 'Document Title',
  },
};

export const WithBadgeAndActions = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader {...props} />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <Button
        onClick={() => action('main-action-clicked')()}
        variant="outlined"
        color="primary"
        size="small"
      >
        Main Action
      </Button>
    ),
    badge: (
      <Chip
        color="success"
        label="Completed"
        size="small"
      />
    ),
    menuItems: [
      {
        icon: <Edit />,
        label: 'Edit',
        onClick: () => action('edit-clicked')(),
        value: 'edit',
      },
      {
        icon: <Delete />,
        label: 'Delete',
        onClick: () => action('delete-clicked')(),
        value: 'delete',
      },
    ],
    title: 'Order #12345',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  },
};

export const WithCustomActions = {
  render: ({ ...props }) => (
    <InnerCard>
      <CardHeader {...props} />
    </InnerCard>
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <div style={{ display: 'flex', gap: 'var(--spacing-16)' }}>
        <Flare
          color="primary"
          size="small"
        />
        <MenuButton
          items={generateMenuItems('actions')}
          variant="text"
          color="primary"
          size="medium"
          placeholder="Actions"
          onChange={() => action('menu-action-clicked')()}
        />
      </div>
    ),
    title: 'Custom Actions',
    description: `CardHeader allows you to pass in custom actions, overriding the default menu items and action`,
  },
};
