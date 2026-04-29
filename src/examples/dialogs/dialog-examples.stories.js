import React, {
  useState,
} from 'react';
import { action } from 'storybook/actions';

import Dialog from '../../components/dialog';
import defaultTranslate from '../../utils/translation';

export default {
  title: 'Examples/Dialogs',
  tags: [],
};

export const Confirmation = {
  render: () => {
    const translate = (key, data) => {
      const translations = {
        cancel: 'Cancel',
        submit: 'Submit',
      };
      return defaultTranslate(translations, key, data);
    };

    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = () => {
      action('onSubmit')();
      setOpen(false);
    };
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog
          open={open}
          translate={translate}
          onClose={handleClose}
          onSubmit={handleSubmit}
          title="Do the thingy"
          message="Are you sure you want to thing this thingy?"
          size="extra-small"
        />
      </>
    );
  },
};

export const DeleteConfirmation = {
  render: () => {
    const translate = (key, data) => {
      const translations = {
        cancel: 'Cancel',
        submit: 'Delete',
      };
      return defaultTranslate(translations, key, data);
    };

    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = () => {
      action('onSubmit')();
      setOpen(false);
    };
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog
          open={open}
          translate={translate}
          onClose={handleClose}
          onSubmit={handleSubmit}
          title="Delete the thingy"
          message="Are you sure you want to delete this thingy?"
          size="extra-small"
          defaultActionColor="error"
        />
      </>
    );
  },
};
