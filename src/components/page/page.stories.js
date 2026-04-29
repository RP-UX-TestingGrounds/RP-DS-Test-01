import React from 'react';
import { action } from 'storybook/actions';

import Page from '.';
import PageHeader from './page-header';
import PageContent from './page-content';
import Card from '../card';
import CardContent from '../card/card-content';
import PageActions from './page-actions';

import StorySlot from '../../utils/story-slot';
import Button from '../button';

export default {
  title: 'Components/Page',
  tags: [],
  component: Page,
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
    description: 'Page content',
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
  widthVariant: {
    description: 'Width variant of the page container',
    table: {
      type: {
        summary: "'default' | 'wide'",
      },
    },
    control: 'select',
    options: ['default', 'wide'],
    defaultValue: {
      summary: 'default',
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
    title: 'Page Title',
  },
  render: (args) => (
    <Page {...args}>
      <PageHeader
        title="Page Title"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        action={(
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
        )}
      />
      <PageContent>
        <Card title="Card Title">
          <CardContent>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
          </CardContent>
        </Card>
        <Card title="Card Title">
          <CardContent>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
          </CardContent>
        </Card>
        <Card title="Card Title">
          <CardContent>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
            <StorySlot>Page Content</StorySlot>
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  ),
  argTypes: {
    ...documentation,
  },
};

export const Wide = {
  args: {
    title: 'Page Title',
    widthVariant: 'wide',
  },
  render: Default.render,
  argTypes: {
    ...documentation,
  },
};
