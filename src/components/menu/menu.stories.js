import React, { useRef, useState } from 'react';
import { action } from 'storybook/actions';
import {
  Download,
  Print,
  Share,
  Delete,
  Edit,
} from '@mui/icons-material';
import Menu from './index';
import IconButton from '../icon-button';
import Button from '../button';

export default {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable menu component that attaches to any anchor element (like IconButton, Button, etc.) and displays a list of options when clicked.',
      },
    },
  },
  argTypes: {
    anchorElement: {
      description: 'The React element to attach the menu to (e.g., IconButton, Button, etc.)',
    },
    items: {
      control: 'object',
      description: 'Array of menu items with label, value, and optional disabled/icon properties',
    },
    onItemClick: {
      action: 'item clicked',
      description: 'Callback function when a menu item is clicked',
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
  },
};

const defaultItems = [
  { label: 'Edit', value: 'edit' },
  { label: 'Share', value: 'share' },
  { label: 'Delete', value: 'delete' },
];

const itemsWithIcons = [
  { label: 'Edit', value: 'edit', icon: <Edit /> },
  { label: 'Share', value: 'share', icon: <Share /> },
  { label: 'Print', value: 'print', icon: <Print /> },
  { label: 'Delete', value: 'delete', icon: <Delete /> },
];

const handleItemClick = (item) => {
  action('item clicked')(item);
};

export const WithIconButton = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={defaultItems}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          testId="menu"
        />
      </>
    );
  },
};

export const WithIconButtonAndIcons = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-trigger-icons"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={itemsWithIcons}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          optionIcon
          iconPosition="start"
          testId="menu-icons"
        />
      </>
    );
  },
};

export const WithButton = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    return (
      <>
        <Button
          ref={anchorRef}
          variant="outlined"
          color="primary"
          testId="menu-button-trigger"
          onClick={handleMenuOpen}
        >
          Actions
        </Button>
        <Menu
          anchorElement={anchorRef.current}
          items={defaultItems}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          testId="menu-button"
        />
      </>
    );
  },
};

export const WithDisabledItems = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-disabled-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={[
            { label: 'Available Option', value: 'available' },
            { label: 'Disabled Option', value: 'disabled', disabled: true },
            { label: 'Another Available', value: 'another' },
            { label: 'Also Disabled', value: 'also-disabled', disabled: true },
          ]}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          testId="menu-disabled"
        />
      </>
    );
  },
};

export const WithItemClickHandlers = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    const itemsWithHandlers = [
      {
        label: 'Edit',
        value: 'edit',
        onClick: () => action('edit clicked')(),
      },
      {
        label: 'Share',
        value: 'share',
        onClick: () => action('share clicked')(),
      },
      {
        label: 'Delete',
        value: 'delete',
        onClick: () => action('delete clicked')(),
      },
    ];

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-handlers-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={itemsWithHandlers}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          testId="menu-handlers"
        />
      </>
    );
  },
};

export const WithCustomPosition = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <IconButton
          ref={anchorRef}
          testId="menu-position-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={defaultItems}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          testId="menu-position"
        />
      </div>
    );
  },
};

export const MultipleInstances = {
  render: () => {
    const [menu1Open, setMenu1Open] = useState(true);
    const [menu2Open, setMenu2Open] = useState(true);
    const [menu3Open, setMenu3Open] = useState(true);
    const anchorRef1 = useRef(null);
    const anchorRef2 = useRef(null);
    const anchorRef3 = useRef(null);

    return (
      <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
        <IconButton
          ref={anchorRef1}
          testId="menu-1-trigger"
          color="primary"
          onClick={() => setMenu1Open(true)}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef1.current}
          items={defaultItems}
          onItemClick={handleItemClick}
          onClose={() => setMenu1Open(false)}
          open={menu1Open}
          testId="menu-1"
        />
        <IconButton
          ref={anchorRef2}
          testId="menu-2-trigger"
          color="error"
          onClick={() => setMenu2Open(true)}
        >
          <Download />
        </IconButton>
        <Menu
          anchorElement={anchorRef2.current}
          items={itemsWithIcons}
          onItemClick={handleItemClick}
          onClose={() => setMenu2Open(false)}
          open={menu2Open}
          optionIcon
          iconPosition="start"
          testId="menu-2"
        />
        <Button
          ref={anchorRef3}
          variant="text"
          color="primary"
          testId="menu-3-trigger"
          onClick={() => setMenu3Open(true)}
        >
          More Options
        </Button>
        <Menu
          anchorElement={anchorRef3.current}
          items={defaultItems}
          onItemClick={handleItemClick}
          onClose={() => setMenu3Open(false)}
          open={menu3Open}
          testId="menu-3"
        />
      </div>
    );
  },
};

export const WithItemColor = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const anchorRef = useRef(null);

    const handleMenuOpen = () => {
      setMenuOpen(true);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    const itemsWithDanger = [
      { label: 'Edit', value: 'edit', icon: <Edit /> },
      { label: 'Share', value: 'share', icon: <Share /> },
      { label: 'Print', value: 'print', icon: <Print /> },
      {
        label: 'Delete',
        value: 'delete',
        icon: <Delete />,
        color: 'danger',
      },
    ];

    return (
      <>
        <IconButton
          ref={anchorRef}
          testId="menu-danger-trigger"
          color="primary"
          onClick={handleMenuOpen}
        >
          <Download />
        </IconButton>

        <Menu
          anchorElement={anchorRef.current}
          items={itemsWithDanger}
          onItemClick={handleItemClick}
          onClose={handleMenuClose}
          open={menuOpen}
          optionIcon
          iconPosition="start"
          testId="menu-danger"
        />
      </>
    );
  },
};
