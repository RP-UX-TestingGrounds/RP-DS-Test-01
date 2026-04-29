import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import TileButton from '.';
import { SVG_ICONS } from '../icon/icon-constants';

const iconNameOptions = Object.keys(SVG_ICONS);

const defaultLabel = 'OEM';
const defaultDescription = 'Original Equipment Manufacturer parts from vehicle brands';

const sampleCustomContent = (
  <div style={{ fontSize: 'var(--typography-body-md-font-size)' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>500 listings / month</div>
    <ul style={{ margin: 0, paddingLeft: '16px' }}>
      <li>Priority placement</li>
      <li>Analytics dashboard</li>
      <li>Dedicated support</li>
    </ul>
  </div>
);

const resolveCustomContent = (customContent, customContentText) => {
  if (customContent === 'custom') {
    if (!customContentText) return undefined;
    return <div dangerouslySetInnerHTML={{ __html: customContentText }} />;
  }
  return customContent;
};

export default {
  title: 'Components/TileButton',
  tags: ['autodocs'],
  component: TileButton,
  render: ({ customContent, customContentText, ...args }) => (
    <TileButton {...args} customContent={resolveCustomContent(customContent, customContentText)} />
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          width: 300,
          minWidth: 200,
          maxWidth: '100%',
          resize: 'horizontal',
          overflow: 'auto',
          padding: '25px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    customContent: {
      description: 'Additional custom ReactNode rendered below the description',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      options: ['none', 'sample', 'custom'],
      mapping: {
        none: undefined,
        sample: sampleCustomContent,
      },
      control: {
        type: 'select',
        labels: {
          none: 'None',
          sample: 'Sample Content',
          custom: 'Custom (uses customContentText)',
        },
      },
    },
    customContentText: {
      description: 'Free-text input rendered when customContent is set to "Custom"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: 'text',
      if: { arg: 'customContent', eq: 'custom' },
    },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    iconAlign: {
      control: 'radio',
      options: ['center', 'start'],
    },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    selected: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
  },
};

export const Default = {
  args: {
    testId: 'tile-button-default',
    label: defaultLabel,
    selected: false,
  },
};

export const Selected = {
  args: {
    testId: 'tile-button-selected',
    label: defaultLabel,
    selected: true,
  },
};

export const WithIconComponent = {
  args: {
    testId: 'tile-button-with-icon-component',
    label: defaultLabel,
    icon: <ShoppingCart />,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'You can pass an icon as a React node (e.g., a Material UI icon component) using the `icon` prop instead of using `iconName` from our icon library.',
      },
    },
  },
};

export const WithIconName = {
  args: {
    testId: 'tile-button-with-icon-name',
    label: 'Customer Reports',
    iconName: 'account',
    selected: false,
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: iconNameOptions,
      description: 'Icon name from our supported icon set',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `iconName` prop to specify an icon from our internal icon library.',
      },
    },
  },
};

export const WithDescription = {
  args: {
    testId: 'tile-button-with-description',
    label: defaultLabel,
    description: defaultDescription,
    selected: false,
  },
};

export const Medium = {
  args: {
    testId: 'tile-button-medium',
    label: defaultLabel,
    description: defaultDescription,
    iconName: 'account',
    size: 'medium',
    selected: false,
  },
};

export const Disabled = {
  args: {
    testId: 'tile-button-disabled',
    label: defaultLabel,
    description: defaultDescription,
    icon: <ShoppingCart />,
    size: 'medium',
    selected: false,
    disabled: true,
  },
};

export const WithCustomContent = {
  args: {
    testId: 'tile-button-custom-content',
    label: 'Premium Plan',
    description: defaultDescription,
    icon: <ShoppingCart />,
    iconAlign: 'start',
    size: 'medium',
    selected: false,
    customContent: 'sample',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `customContent` prop to render additional rich JSX below the description.',
      },
    },
  },
};
