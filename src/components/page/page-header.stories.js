import React from 'react';
import { action } from 'storybook/actions';
import { Flare } from '@mui/icons-material';

import PageHeader, { PageTitle } from './page-header';
import PageActions from './page-actions';

import Button from '../button';
import Chip from '../chip';
import MenuButton from '../menu-button';
import { generateMenuItems } from '../menu-button/menu-items-helper';

export default {
  component: PageHeader,
  globals: {
    backgrounds: { value: 'surface', grid: false },
  },
  tags: [],
  title: 'Components/Page/PageHeader',
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
  description: {
    description: 'Description of the page header',
    table: {
      type: {
        summary: 'string | node',
      },
    },
  },
  testId: {
    description: 'Test ID of the page header',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  title: {
    description: 'Title of the page header',
    table: {
      type: {
        summary: 'string | node',
      },
    },
  },
};

export const Default = {
  render: ({ ...props }) => (
    <PageHeader
      {...props}
    />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    description: 'Short card description',
    title: 'Page Title',
  },
};

export const WithLongDescription = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    title: 'Page Title',
  },
};

export const WithOneAction = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <PageActions>
        <Button
          onClick={() => action('main-action-clicked')()}
          variant="contained"
          color="primary"
          size="medium"
        >
          Main Action
        </Button>
      </PageActions>
    ),
    description: 'Short page description',
    title: 'Page Title',
  },
};

export const WithTitleAndStatusChip = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <PageActions>
        <Button
          onClick={() => action('secondary-action-clicked')()}
          variant="outlined"
          color="primary"
          size="medium"
        >
          Secondary Action
        </Button>
        <Button
          onClick={() => action('main-action-clicked')()}
          variant="contained"
          color="primary"
          size="medium"
        >
          Main Action
        </Button>
      </PageActions>
    ),
    description: 'Use PageTitle to compose inline adornments such as status chips alongside the heading.',
    title: (
      <PageTitle>
        Order details
        <Chip
          color="primary"
          label="Processing"
          size="small"
          testId="page-header-status-chip"
          variant="filled"
        />
      </PageTitle>
    ),
  },
};

export const WithTwoActions = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <PageActions>
        <Button
          onClick={() => action('secondary-action-clicked')()}
          variant="outlined"
          color="primary"
          size="medium"
        >
          Secondary Action
        </Button>
        <Button
          onClick={() => action('main-action-clicked')()}
          variant="contained"
          color="primary"
          size="medium"
        >
          Main Action
        </Button>
      </PageActions>
    ),
    description: 'Short page description',
    title: 'Page Title',
  },
};

export const WithMenuActions = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
  ),
  argTypes: {
    ...documentation,
  },
  args: {
    action: (
      <PageActions>
        <MenuButton
          items={generateMenuItems('actions')}
          variant="text"
          color="primary"
          size="medium"
          placeholder="More Actions"
          onChange={() => action('menu-action-clicked')()}
        />
        <Button
          onClick={() => action('secondary-action-clicked')()}
          variant="outlined"
          color="primary"
          size="medium"
        >
          Secondary Action
        </Button>
        <Button
          onClick={() => action('main-action-clicked')()}
          variant="contained"
          color="primary"
          size="medium"
        >
          Main Action
        </Button>
      </PageActions>
    ),
    description: 'Short page description',
    title: 'Page Title',
  },
};

export const WithCustomActions = {
  render: ({ ...props }) => (
    <PageHeader {...props} />
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
    description: `PageHeader allows you to pass in custom actions, overriding the default menu items and action`,
  },
};
