import React, { useState, useRef } from 'react';
import { action } from 'storybook/actions';
import {
  Delete,
  Download,
  Edit,
  MoreVert,
  Print,
  Share,
} from '@mui/icons-material';
import IconMenu from './index';
import Menu from '../menu';
import IconButton, { ICON_BUTTON_COLORS, ICON_BUTTON_SIZES } from '../icon-button';

export default {
  title: 'Components/IconMenu',
  component: IconMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'IconMenu is a convenience component that combines an IconButton with a Menu dropdown.',
      },
    },
  },
  argTypes: {
    anchorOrigin: {
      control: 'object',
      description: 'Position of the menu relative to the anchor element',
    },
    buttonColor: {
      control: 'select',
      description: 'Color variant of the icon button',
      options: ICON_BUTTON_COLORS,
    },
    buttonDisabled: {
      control: 'boolean',
      description: 'Whether the icon button is disabled',
    },
    buttonSize: {
      control: 'select',
      description: 'Size of the icon button',
      options: ICON_BUTTON_SIZES,
    },
    icon: {
      control: false,
      description: 'The icon component to display in the button (defaults to MoreHoriz)',
    },
    iconPosition: {
      control: 'select',
      description: 'Position of icons in menu items',
      options: ['end', 'start'],
    },
    items: {
      control: 'object',
      description: 'Array of menu item objects with label, value, and optional properties. Each item can have its own onClick handler (recommended) or you can use the shared onItemClick prop.',
    },
    onItemClick: {
      description: 'Optional shared callback fired when any menu item is clicked. Alternatively, each item can have its own onClick handler (recommended for clarity).',
    },
    optionIcon: {
      control: 'boolean',
      description: 'Whether to display icons for menu items',
    },
    testId: {
      control: 'text',
      description: 'Test ID for the menu component',
    },
    transformOrigin: {
      control: 'object',
      description: 'Position to transform from when opening the menu',
    },
  },
};

const defaultItems = [
  {
    label: 'Download',
    onClick: action('download-clicked'),
    value: 'download',
  },
  {
    label: 'Print',
    onClick: action('print-clicked'),
    value: 'print',
  },
  {
    label: 'Share',
    onClick: action('share-clicked'),
    value: 'share',
  },
  {
    label: 'Delete',
    onClick: action('delete-clicked'),
    value: 'delete',
  },
];

const itemsWithoutHandlers = [
  { label: 'Download', value: 'download' },
  { label: 'Print', value: 'print' },
  { label: 'Share', value: 'share' },
  { label: 'Delete', value: 'delete' },
];

const itemsWithIcons = [
  {
    icon: <Download />,
    label: 'Download',
    onClick: action('download-clicked'),
    value: 'download',
  },
  {
    icon: <Print />,
    label: 'Print',
    onClick: action('print-clicked'),
    value: 'print',
  },
  {
    icon: <Share />,
    label: 'Share',
    onClick: action('share-clicked'),
    value: 'share',
  },
  {
    icon: <Edit />,
    label: 'Edit',
    onClick: action('edit-clicked'),
    value: 'edit',
  },
  {
    icon: <Delete />,
    label: 'Delete',
    onClick: action('delete-clicked'),
    value: 'delete',
  },
];

const handleItemClick = action('item-clicked');

export const Default = {
  args: {
    items: defaultItems,
    testId: 'icon-menu',
  },
};

export const WithCustomIcon = {
  args: {
    icon: MoreVert,
    items: defaultItems,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'The icon can be customized by passing any Material-UI icon component.',
      },
    },
  },
};

export const WithItemIcons = {
  args: {
    items: itemsWithIcons,
    optionIcon: true,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu items can include icons for better visual clarity.',
      },
    },
  },
};

export const WithColoredButton = {
  args: {
    buttonColor: 'primary',
    items: defaultItems,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'The icon button color can be customized to match your design system.',
      },
    },
  },
};

export const SmallSize = {
  args: {
    buttonSize: 'small',
    items: defaultItems,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'The icon button can be rendered in different sizes.',
      },
    },
  },
};

export const Disabled = {
  args: {
    buttonDisabled: true,
    items: defaultItems,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'The icon button can be disabled to prevent interaction.',
      },
    },
  },
};

export const WithSharedClickHandler = {
  args: {
    items: itemsWithoutHandlers,
    onItemClick: handleItemClick,
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternative pattern: use a shared onItemClick handler instead of individual onClick handlers. Useful when all items need similar processing or when you need to handle the clicked item in a centralized way.',
      },
    },
  },
};

export const WithDisabledItems = {
  args: {
    items: [
      {
        label: 'Download',
        onClick: action('download-clicked'),
        value: 'download',
      },
      {
        disabled: true,
        label: 'Print',
        onClick: action('print-clicked'),
        value: 'print',
      },
      {
        label: 'Share',
        onClick: action('share-clicked'),
        value: 'share',
      },
      {
        disabled: true,
        label: 'Delete',
        onClick: action('delete-clicked'),
        value: 'delete',
      },
    ],
    testId: 'icon-menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual menu items can be disabled.',
      },
    },
  },
};

export const WithCustomAnchorPosition = {
  args: {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    items: defaultItems,
    testId: 'icon-menu',
    transformOrigin: {
      horizontal: 'right',
      vertical: 'top',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'The menu position can be customized using anchorOrigin and transformOrigin.',
      },
    },
  },
};

const itemsWithColor = [
  { label: 'Edit', value: 'edit' },
  { label: 'Share', value: 'share' },
  { label: 'Print', value: 'print' },
  { label: 'Delete', value: 'delete', color: 'danger' },
];

export const WithItemColor = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => setMenuOpen(true);
    const handleMenuClose = () => setMenuOpen(false);

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-color-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <MoreVert />
        </IconButton>

        <Menu
          anchorElement={anchorRef.current}
          items={itemsWithColor}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          optionIcon={false}
          iconPosition="start"
          testId="menu-color"
        />
      </>
    );
  },
};
