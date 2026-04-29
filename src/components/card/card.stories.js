import React from 'react';
import { action } from 'storybook/actions';
import {
  Edit,
  Delete,
} from '@mui/icons-material';

import Card from '.';
import CardHeader from './card-header';
import CardContent from './card-content';

import StorySlot from '../../utils/story-slot';
import Chip from '../chip';
import Button from '../button';

export default {
  title: 'Components/Card',
  tags: [],
  component: Card,
  globals: {
    backgrounds: { value: 'surface', grid: false },
  },
};

const documentation = {
  action: {
    description: 'Action element to display in the default header (typically button or icon button)',
    table: {
      type: {
        summary: 'node',
      },
    },
  },
  children: {
    description: 'Card content',
    table: {
      disable: true,
    },
    control: false,
  },
  testId: {
    description: 'Test ID of the card',
    table: {
      type: {
        summary: 'string',
      },
    },
    defaultValue: {
      summary: 'card',
    },
  },
  title: {
    description: 'Title of the card (NOTE: triggers the default header behavior)',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Card Title',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <StorySlot>Card Content</StorySlot>
      </CardContent>
    </Card>
  ),
  argTypes: {
    ...documentation,
  },
};

export const MultipleCardContents = {
  args: {
    title: 'Card Title',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <StorySlot>Card Content 1</StorySlot>
        <StorySlot>Card Content 2</StorySlot>
        <StorySlot>Card Content 3</StorySlot>
      </CardContent>
    </Card>
  ),
  argTypes: {
    ...documentation,
  },
};

export const WithHeaderMenu = {
  render: () => (
    <Card>
      <CardHeader
        title="Card Title"
        description="This card has a header action and a description."
        menuItems={[
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
        ]}
      />
      <CardContent>
        <StorySlot>Card Content</StorySlot>
      </CardContent>
    </Card>
  ),
  argTypes: {
    ...documentation,
  },
};

export const NoHeader = {
  render: () => (
    <Card>
      <CardContent>
        <StorySlot>Card Content without header</StorySlot>
      </CardContent>
    </Card>
  ),
  argTypes: {
    ...documentation,
  },
};

export const FullExample = {
  render: () => (
    <Card>
      <CardHeader
        action={
          <Button
            color="primary"
            onClick={() => action('main-action-clicked')()}
            size="small"
            variant="outlined"
          >
            Main Action
          </Button>
        }
        badge={
          <Chip
            color="success"
            label="Completed"
            size="small"
          />
        }
        description=
        {<>
          <span>{`
  This card has a header menu and a very long description that should wrap to the next line. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
`}</span>
<strong>{`Duis aute irure `}</strong>
<span>{`dolor in reprehenderit in voluptate velit esse cillum
  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.`}</span>
</>}
        menuItems={[
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
        ]}
        title="Card Title"
      />
      <CardContent>
        <StorySlot>Card Content 1</StorySlot>
        <StorySlot>Card Content 2</StorySlot>
        <StorySlot>Card Content 3</StorySlot>
      </CardContent>
    </Card>
  ),
  argTypes: {
    ...documentation,
  },
};
