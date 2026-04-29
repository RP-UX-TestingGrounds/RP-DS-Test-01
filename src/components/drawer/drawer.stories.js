import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { action } from 'storybook/actions';
import { Close } from '@mui/icons-material';

import DrawerComponent, { DRAWER_SIZES, DRAWER_ANCHORS } from '.';
import DrawerContent from './drawer-content';
import DrawerActions from './drawer-actions';
import DrawerHeader from './drawer-header';
import Button from '../button';
import IconButton from '../icon-button';
import StorySlot from '../../utils/story-slot';

const Drawer = ({
  open,
  onClose,
  children,
  actions = null,
  ...args
}) => {
  const [openState, setOpenState] = useState(open);
  const handleClose = () => {
    setOpenState(false);
    onClose();
  };
  return (
    <div>
      <button onClick={() => setOpenState(true)}>Open Drawer</button>
      <DrawerComponent
        open={openState}
        onClose={handleClose}
        {...args}
      >
        {children}
        {actions}
      </DrawerComponent>
    </div>
  );
};

Drawer.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default {
  title: 'Components/Drawer',
  tags: [],
  component: DrawerComponent,
};

const documentation = {
  allowBackdropClose: {
    description: 'Whether the drawer can be closed by clicking the backdrop',
    table: {
      type: { summary: 'boolean' },
    },
    defaultValue: { summary: 'true' },
  },
  anchor: {
    description: 'Side from which the drawer will appear',
    table: {
      type: { summary: 'string' },
    },
    options: DRAWER_ANCHORS,
    defaultValue: { summary: 'right' },
    control: { type: 'select' },
  },
  children: {
    description: 'Drawer content',
    table: { disable: true },
    control: false,
  },
  onClose: {
    description: 'Function to call when the drawer is closed',
    table: {
      type: { summary: 'function' },
    },
  },
  open: {
    description: 'Whether the drawer is open',
    table: { disable: true },
    control: false,
  },
  size: {
    description: 'Width of the drawer panel',
    table: {
      type: { summary: 'string' },
    },
    options: DRAWER_SIZES,
    defaultValue: { summary: 'small' },
    control: { type: 'select' },
  },
  testId: {
    description: 'Test ID of the drawer',
    table: {
      type: { summary: 'string' },
    },
  },
  title: {
    description: 'Title of the drawer (triggers the default header with close button)',
    table: {
      type: { summary: 'string' },
    },
  },
};

export const Default = {
  args: {
    open: true,
    size: 'small',
    anchor: 'right',
    title: 'Drawer Title',
  },
  render: (args) => (
    <Drawer
      {...args}
      onClose={() => action('onClose')()}
    >
      <DrawerContent>
        <StorySlot>Drawer Content</StorySlot>
      </DrawerContent>
      <DrawerActions>
        <Button
          onClick={() => action('cancel')()}
          color="primary"
          variant="text"
        >
          Cancel
        </Button>
        <Button
          onClick={() => action('submit')()}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DrawerActions>
    </Drawer>
  ),
  argTypes: {
    ...documentation,
  },
};

export const Closed = {
  tags: ['!dev'],
  args: {
    allowBackdropClose: true,
    open: false,
    size: 'small',
    anchor: 'right',
    title: 'Drawer Title',
  },
  render: (args) => (
    <Drawer
      {...args}
      onClose={() => action('onClose')()}
    >
      <DrawerContent>
        <StorySlot>Drawer Content</StorySlot>
      </DrawerContent>
    </Drawer>
  ),
  argTypes: {
    ...documentation,
  },
};

export const WithDividers = {
  args: {
    open: true,
    size: 'small',
    anchor: 'right',
    title: 'Drawer Title',
    allowBackdropClose: false,
  },
  render: (args) => (
    <Drawer
      {...args}
      onClose={() => action('onClose')()}
    >
      <DrawerContent dividers={true}>
        <StorySlot>Drawer Content</StorySlot>
      </DrawerContent>
      <DrawerActions>
        <Button
          onClick={() => action('cancel')()}
          color="primary"
          variant="text"
        >
          Cancel
        </Button>
        <Button
          onClick={() => action('submit')()}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DrawerActions>
    </Drawer>
  ),
  argTypes: {
    ...documentation,
  },
};

export const CustomHeader = {
  args: {
    size: 'small',
  },
  render: ({ size }) => {
    const [open, setOpenState] = useState(true);
    return (
      <div>
        <button onClick={() => setOpenState(true)}>Open Drawer</button>
        <DrawerComponent
          open={open}
          size={size}
          onClose={() => setOpenState(false)}
        >
          <DrawerHeader>
            Custom Header
            <IconButton onClick={() => setOpenState(false)} size="small">
              <Close fontSize="small" />
            </IconButton>
          </DrawerHeader>
          <DrawerContent dividers={true}>
            <StorySlot>Drawer Content</StorySlot>
          </DrawerContent>
          <DrawerActions>
            <Button
              onClick={() => action('action')()}
              color="primary"
              variant="contained"
            >
              Action
            </Button>
          </DrawerActions>
        </DrawerComponent>
      </div>
    );
  },
  argTypes: {
    ...documentation,
  },
};

export const LeftAnchor = {
  args: {
    open: true,
    size: 'small',
    anchor: 'left',
    title: 'Left Drawer',
  },
  render: (args) => (
    <Drawer
      {...args}
      onClose={() => action('onClose')()}
    >
      <DrawerContent>
        <StorySlot>Drawer Content</StorySlot>
      </DrawerContent>
    </Drawer>
  ),
  argTypes: {
    ...documentation,
  },
};
