import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { action } from 'storybook/actions';
import { Close } from '@mui/icons-material';

import Dialog, { DIALOG_SIZES } from '.';
import DialogContent from './dialog-content';
import DialogActions from './dialog-actions';
import DialogTitle from './dialog-title';
import Button, { BUTTON_COLORS } from '../button';
import StorySlot from '../../utils/story-slot';
import defaultTranslate from '../../utils/translation';
import MenuButton from '../menu-button';
import { generateMenuItems } from '../menu-button/menu-items-helper';
import IconButton from '../icon-button';

const defaultTranslation = (key, data) => {
  const translations = {
    cancel: 'Cancel',
    submit: 'Submit',
  };
  return defaultTranslate(translations, key, data);
};

const DialogWrapper = ({
  open,
  onClose,
  children,
  translate = defaultTranslation,
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
      <button onClick={() => setOpenState(true)}>Open Dialog</button>
      <Dialog
        open={openState}
        onClose={handleClose}
        translate={translate}
        {...args}
      >
        {children}
        {actions}
      </Dialog>
    </div>
  );
};

DialogWrapper.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  translate: PropTypes.func,
};

export default {
  title: 'Components/Dialog',
  tags: [],
  component: Dialog,
};

const documentation = {
  allowBackdropClose: {
    description: 'Whether the modal can be closed by clicking the backdrop',
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: {
      summary: 'true',
    },
  },
  children: {
    description: 'Dialog content',
    table: {
      disable: true,
    },
    control: false,
  },
  fullScreen: {
    description: 'Whether the dialog should be full screen',
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: {
      summary: 'false',
    },
  },
  message: {
    description: 'Message to display in the dialog (wrapped in a <DialogContent> component)',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  onClose: {
    description: 'Function to call when the dialog is closed',
    table: {
      type: {
        summary: 'function',
      },
    },
  },
  onSubmit: {
    description: 'Function to call when the dialog is submitted (NOTE: triggers default actions behavior)',
    table: {
      type: {
        summary: 'function',
      },
    },
  },
  open: {
    description: 'Whether the dialog is open',
    table: {
      disable: true,
    },
    control: false,
  },
  responsiveFullScreen: {
    description: 'Whether the dialog should be responsive full screen',
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: {
      summary: 'true',
    },
  },
  size: {
    description: 'Size of the dialog',
    table: {
      type: {
        summary: 'string',
      },
    },
    options: DIALOG_SIZES,
    defaultValue: {
      summary: 'medium',
    },
    control: {
      type: 'select',
    },
  },
  title: {
    description: 'Title of the dialog (NOTE: triggers the default title behavior)',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  translate: {
    description: 'Translation function (NOTE: only needed if default actions behavior is used)',
    table: {
      type: {
        summary: 'function',
      },
    },
  },
  defaultActionColor: {
    description: 'Color of the default action button (NOTE: only used if default actions behavior is used)',
    table: {
      type: {
        summary: 'string',
      },
    },
    options: BUTTON_COLORS,
    defaultValue: {
      summary: 'primary',
    },
    control: {
      type: 'select',
    },
  },
  testId: {
    description: 'Test ID of the dialog',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
};

export const Default = {
  args: {
    open: true,
    size: 'small',
    fullScreen: false,
    title: 'Dialog Title',
    defaultActionColor: 'primary',
  },
  render: (args) => (
    <DialogWrapper
      {...args}
      onClose={() => action('onClose')()}
      onSubmit={() => action('onSubmit')()}
    >
      <DialogContent>
        <StorySlot>Dialog Content</StorySlot>
      </DialogContent>
    </DialogWrapper>
  ),
  argTypes: {
    ...documentation,
  },
};

export const Closed = {
  tags: ['!dev'], // exclude from storybook menu, just used for the documentation page (so that it doesn't load automatically)
  args: {
    allowBackdropClose: true,
    fullScreen: false,
    message: undefined,
    open: false,
    responsiveFullScreen: true,
    size: 'small',
    title: 'Dialog Title',
  },
  render: (args) => (
    <DialogWrapper
      {...args}
      onClose={() => action('onClose')()}
      onSubmit={() => action('onSubmit')()}
      translate={defaultTranslation}
    >
      <DialogContent>
        <StorySlot>Dialog Content</StorySlot>
      </DialogContent>
    </DialogWrapper>
  ),
  argTypes: {
    ...documentation,
  },
};

export const NoContent = {
  args: {
    open: true,
    size: 'extra-small',
    fullScreen: false,
    title: 'Dialog Title',
  },
  render: (args) => (
    <DialogWrapper
      {...args}
      onClose={() => action('onClose')()}
      actions={
        <DialogActions>
          <Button
            onClick={() => action('modalAction')('first')}
            color="primary"
            variant="text"
          >
            Action
          </Button>
          <Button
            onClick={() => action('modalAction')('second')}
            color="primary"
            variant="contained"
          >
            Action
          </Button>
        </DialogActions>
      }
    />
  ),
  argTypes: {
    ...documentation,
  },
};

export const Modal = {
  args: {
    open: true,
    size: 'small',
    fullScreen: false,
    title: 'Dialog Title',
    allowBackdropClose: false,
    message: 'This dialog will not close when the backdrop is clicked.',
  },
  render: (args) => (
    <DialogWrapper
      {...args}
      onClose={() => action('onClose')()}
      onSubmit={() => action('onSubmit')()}
    />
  ),
};

export const WithDividers = {
  args: {
    open: true,
    size: 'small',
    fullScreen: false,
    title: 'Dialog Title',
    allowBackdropClose: false,
  },
  render: (args) => (
    <DialogWrapper
      {...args}
      onClose={() => action('onClose')()}
      onSubmit={() => action('onSubmit')()}
    >
      <DialogContent dividers={true}>
        <StorySlot>Dialog Content</StorySlot>
      </DialogContent>
    </DialogWrapper>
  ),
};

export const CustomHeader = {
  args: {
    size: 'small',
  },
  render: ({ size }) => {
    const handleActionClick = (item) => {
      action('action clicked')(item);
    };
    const [open, setOpenState] = useState(true);
    return (
      <div>
        <button onClick={() => setOpenState(true)}>Open Dialog</button>
        <Dialog
          open={open}
          size={size}
          onClose={() => setOpenState(false)}
        >
          <DialogTitle>
            Modal Title
            <DialogActions>
              <MenuButton
                items={generateMenuItems('actions')}
                variant="text"
                color="primary"
                size="medium"
                placeholder="Actions"
                onChange={handleActionClick}
              />
              <IconButton onClick={() => setOpenState(false)} size="small">
                <Close fontSize="small" />
              </IconButton>
              </DialogActions>
          </DialogTitle>
          <DialogContent>
            <StorySlot>Dialog Content</StorySlot>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => action('modalAction')('first')}
              color="primary"
              variant="contained"
            >
              Action
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
  argTypes: {
    ...documentation,
  },
};
