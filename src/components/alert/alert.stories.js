import React, { useState } from 'react';
import { action } from 'storybook/actions';

import Alert, { ALERT_SEVERITIES } from '.';

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  component: Alert,
  argTypes: {
    severity: {
      control: 'select',
      options: ALERT_SEVERITIES,
    },
  },
};

export const Error = {
  args: {
    severity: 'error',
    title: 'Conflict in Product Targeting',
    children:
      'You have added [chip label] to both Inclusions and Exclusions. Please remove it from one of the lists to save your changes.',
    testId: 'alert-error',
  },
};

export const Warning = {
  args: {
    severity: 'warning',
    title: 'Unsaved changes',
    children: 'Your changes have not been saved. Navigate away will discard them.',
    testId: 'alert-warning',
  },
};

export const Info = {
  args: {
    severity: 'info',
    title: 'New feature available',
    children: 'Channel settings can now be managed per store. Go to Settings to configure.',
    testId: 'alert-info',
  },
};

export const Success = {
  args: {
    severity: 'success',
    title: 'Settings saved',
    children: 'Your channel settings have been updated successfully.',
    testId: 'alert-success',
  },
};

export const WithoutTitle = {
  args: {
    severity: 'error',
    children: 'Something went wrong. Please try again.',
    testId: 'alert-no-title',
  },
};

export const Dismissible = {
  render: function DismissibleStory(args) {
    const [open, setOpen] = useState(true);
    if (!open) {
      return (
        <button onClick={() => setOpen(true)} type="button">
          Show alert again
        </button>
      );
    }
    return (
      <Alert
        {...args}
        onClose={() => {
          action('onClose')();
          setOpen(false);
        }}
      />
    );
  },
  args: {
    severity: 'error',
    title: 'Conflict in Product Targeting',
    children:
      'You have added [chip label] to both Inclusions and Exclusions. Please remove it from one of the lists to save your changes.',
    testId: 'alert-dismissible',
  },
};

export const AllSeverities = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {ALERT_SEVERITIES.map((severity) => (
        <Alert
          key={severity}
          severity={severity}
          title={`${severity.charAt(0).toUpperCase() + severity.slice(1)} title`}
          onClose={action('onClose')}
          testId={`alert-${severity}`}
        >
          This is the {severity} alert description.
        </Alert>
      ))}
    </div>
  ),
};
