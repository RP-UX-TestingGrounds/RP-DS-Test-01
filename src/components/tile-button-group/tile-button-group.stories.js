import React, { useState } from 'react';
import { Settings, ShoppingCart, LocalShipping } from '@mui/icons-material';
import TileButtonGroup from '.';

const defaultOptions = [
  { value: 'air-fuel', label: 'Air & Fuel' },
  { value: 'belts-hoses', label: 'Belts/Hoses' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'engine', label: 'Engine' },
  { value: 'exhaust', label: 'Exhaust' },
  { value: 'ignition', label: 'Ignition' },
  { value: 'steering', label: 'Steering' },
  { value: 'transmission', label: 'Transmission' },
  { value: 'external-accessories', label: 'External Accessories' },
];

const optionsWithIcons = [
  { value: 'shipping', label: 'Shipping', icon: <LocalShipping /> },
  { value: 'cart', label: 'Cart', icon: <ShoppingCart /> },
  { value: 'settings', label: 'Settings', icon: <Settings /> },
];

const optionsWithDescriptions = [
  {
    value: 'oem',
    label: 'OEM',
    description: 'Original Equipment Manufacturer parts from vehicle brands',
    iconName: 'products',
  },
  {
    value: 'aftermarket',
    label: 'Aftermarket',
    description: 'Third-party replacement and performance parts',
    iconName: 'system',
  },
];

const optionsWithDisabled = [
  {
    value: 'shipping',
    label: 'Shipping',
    icon: <LocalShipping />,
    description: 'Standard shipping options',
  },
  {
    value: 'cart',
    label: 'Cart',
    icon: <ShoppingCart />,
    description: 'Shopping cart settings',
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Settings />,
    description: 'General configuration',
    disabled: true,
  },
];

const optionsWithCustomContent = [
  {
    value: 'oem',
    label: 'OEM',
    iconName: 'products',
    iconAlign: 'start',
    customContent: (
      <ul style={{ margin: 0, paddingLeft: '16px' }}>
        <li>Factory original parts</li>
        <li>Vehicle-specific fit</li>
      </ul>
    ),
  },
  {
    value: 'aftermarket',
    label: 'Aftermarket',
    iconName: 'system',
    iconAlign: 'start',
    customContent: (
      <ul style={{ margin: 0, paddingLeft: '16px' }}>
        <li>Wide selection</li>
        <li>Competitive pricing</li>
      </ul>
    ),
  },
];

export default {
  title: 'Components/TileButtonGroup',
  tags: ['autodocs'],
  component: TileButtonGroup,
  args: {
    size: 'small',
  },
  argTypes: {
    columns: {
      control: 'number',
      description: 'Number of columns in the grid',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    onChange: { action: 'changed' },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
  },
};

export const Default = {
  args: {
    testId: 'tile-button-group',
    options: defaultOptions,
    value: 'air-fuel',
    multiple: false,
    columns: 3,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <TileButtonGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

export const MultipleSelection = {
  args: {
    testId: 'tile-button-group-multiple',
    options: defaultOptions,
    value: ['air-fuel', 'engine'],
    multiple: true,
    columns: 3,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <TileButtonGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Set `multiple` to `true` to allow selecting multiple tiles. In this mode, `value` is an array and `onChange` returns an array.',
      },
    },
  },
};

export const WithIconComponents = {
  args: {
    testId: 'tile-button-group-icons',
    options: optionsWithIcons,
    value: 'shipping',
    multiple: false,
    columns: 3,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <TileButtonGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Options can use Material UI icons via the `icon` prop.',
      },
    },
  },
};

export const Medium = {
  args: {
    testId: 'tile-button-group-medium',
    options: optionsWithDescriptions,
    value: 'oem',
    size: 'medium',
    multiple: false,
    columns: 2,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ width: '700px' }}>
        <TileButtonGroup
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      </div>
    );
  },
};

export const Disabled = {
  args: {
    testId: 'tile-button-group-disabled',
    options: optionsWithDisabled,
    value: 'shipping',
    multiple: false,
    columns: 3,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <TileButtonGroup
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

export const WithCustomContent = {
  args: {
    testId: 'tile-button-group-custom-content',
    options: optionsWithCustomContent,
    value: 'oem',
    size: 'medium',
    multiple: false,
    columns: 2,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ width: '700px' }}>
        <TileButtonGroup
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      </div>
    );
  },
};
