import React from 'react';
import { action } from 'storybook/actions';
import MenuButton from './index';
import { generateMenuItems } from './menu-items-helper';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A dropdown menu button component that displays a list of selectable options.',
      },
    },
  },
  argTypes: {
    testId: {
      control: 'text',
      description: 'Test ID for the component',
    },
    items: {
      control: 'object',
      description: 'Array of menu items with label, value, and optional disabled properties',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Button variant style',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'inherit'],
      description: 'Button color theme',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
    onChange: {
      action: 'item clicked',
      description: 'Callback function when a menu item is clicked',
    },
    selectedValue: {
      control: 'text',
      description: 'Currently selected value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no item is selected',
    },
    defaultSelectedValue: {
      control: 'text',
      description: 'Default selected value when component first renders (overridden by selectedValue)',
    },
    optionIcon: {
      control: 'boolean',
      description: 'Whether to show icons in menu items (requires icon property in items)',
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the icon: start (before label) or end (after label)',
    },
    menuMaxHeight: {
      control: 'text',
      description: 'Maximum height of the menu before showing scroll',
    },
  },
};

const Template = (args) => <MenuButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  testId: 'default-menu-button',
  items: generateMenuItems('default'),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  placeholder: 'Select an option',
};

export const WithDefaultSelection = Template.bind({});
WithDefaultSelection.args = {
  testId: 'default-selection-menu',
  items: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ],
  variant: 'text',
  color: 'primary',
  size: 'medium',
  placeholder: 'Select an option',
  defaultSelectedValue: 'b',
};

// Color variants - showing all colors visually
export const ColorVariants = () => {
  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'inherit'];
  const menuItems = generateMenuItems('default');

  const handleItemClick = (item) => {
    action('item clicked')(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {colors.map((color) => (
        <div key={`${color}-menu-button`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ minWidth: '80px', fontSize: '14px', fontWeight: '500' }}>
            {color}:
          </span>
          <MenuButton
            testId={`menu-button-${color}`}
            items={menuItems}
            variant="text"
            color={color}
            size="medium"
            placeholder={`${color} Menu`}
            onChange={handleItemClick}
          />
        </div>
      ))}
    </div>
  );
};

export const Disabled = Template.bind({});
Disabled.args = {
  testId: 'disabled-menu-button',
  items: generateMenuItems('default'),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  disabled: true,
  placeholder: 'Disabled',
};

export const WithDisabledItems = Template.bind({});
WithDisabledItems.args = {
  testId: 'disabled-items-menu-button',
  items: [
    { label: 'Available Option', value: 'available' },
    { label: 'Disabled Option', value: 'disabled', disabled: true },
    { label: 'Another Available', value: 'another' },
    { label: 'Also Disabled', value: 'also-disabled', disabled: true },
  ],
  variant: 'text',
  color: 'primary',
  size: 'medium',
  placeholder: 'Some items disabled',
};

export const WithActions = () => {
  const handleActionClick = (item) => {
    const timestamp = new Date().toLocaleTimeString();

    // Simulate different actions based on the item value
    switch (item.value) {
      case 'edit':
        action('edit')(`Editing item at ${timestamp}`);
        break;
      case 'delete':
        action('delete')('Item deleted!');
        break;
      case 'duplicate':
        action('duplicate')('Item duplicated!');
        break;
      case 'share':
        action('share')('Sharing item...');
        break;
      case 'export':
        action('export')('Exporting data...');
        break;
      default:
        action('action')(`Action: ${item.label}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
    >
      <MenuButton
        testId="actions-menu-button"
        items={generateMenuItems('actions')}
        variant="text"
        color="primary"
        size="medium"
        placeholder="Actions"
        onChange={handleActionClick}
      />
    </div>
  );
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  testId: 'scroll-menu-button',
  items: generateMenuItems('actions').concat(
    generateMenuItems('status'),
    generateMenuItems('users'),
  ),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  menuMaxHeight: '300px',
  placeholder: 'Select an option (scroll to see more)',
};

// Examples with option icons
export const WithStartIcons = Template.bind({});
WithStartIcons.args = {
  testId: 'countries-with-icons-menu-button',
  items: generateMenuItems('countries-with-icons'),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  optionIcon: true,
  iconPosition: 'start',
  placeholder: 'Select a country',
};

export const WithEndIcons = Template.bind({});
WithEndIcons.args = {
  testId: 'status-with-icons-menu-button',
  items: generateMenuItems('status-with-icons'),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  optionIcon: true,
  iconPosition: 'end',
  placeholder: 'Select a status',
};

export const WithLongItemsLabels = Template.bind({});
WithLongItemsLabels.args = {
  testId: 'status-with-long-items-labels',
  items: generateMenuItems('actions-long'),
  variant: 'text',
  color: 'primary',
  size: 'medium',
  optionIcon: true,
  iconPosition: 'end',
  placeholder: 'Select a status',
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  testId: 'grouped-menu-button',
  groups: [
    {
      label: 'Store',
      items: [
        { value: '[Store Name]', label: '[Store Name]' },
        { value: '[Store Phone]', label: '[Store Phone]' },
        { value: '[Store Address]', label: '[Store Address]' },
      ],
    },
    {
      label: 'Cart Saver',
      items: [
        { value: '[Checkout Link]', label: '[Checkout Link]' },
        { value: '[Cart Items]', label: '[Cart Items]' },
      ],
    },
    {
      label: 'User',
      items: [
        { value: '[Customer Name]', label: '[Customer Name]' },
        { value: '[Customer Email]', label: '[Customer Email]' },
      ],
    },
  ],
  variant: 'text',
  color: 'primary',
  size: 'medium',
  placeholder: 'Text Replacements',
};
