import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Menu from './index';
import IconButton from '../icon-button';

describe('Menu', () => {
  afterEach(cleanup);
  const defaultItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  function TestWrapper({ menuProps = {} }) {
    const [menuOpen, setMenuOpen] = useState(false);
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
          testId="test-anchor"
          onClick={handleMenuOpen}
        >
          <span>⋮</span>
        </IconButton>
        <Menu
          anchorElement={anchorRef.current}
          items={defaultItems}
          open={menuOpen}
          onClose={handleMenuClose}
          {...menuProps}
        />
      </>
    );
  }

  TestWrapper.propTypes = {
    menuProps: PropTypes.object,
  };

  function renderComponent(props) {
    return render(<TestWrapper menuProps={props} />);
  }

  it('renders with default props', () => {
    const { getByTestId } = renderComponent();

    const anchor = getByTestId('test-anchor');
    expect(anchor).toBeInTheDocument();
  });

  it('opens menu when anchor is clicked', () => {
    const { getByTestId, getByRole } = renderComponent();

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  it('closes menu when item is clicked', async () => {
    const {
      getByTestId, getByRole, getAllByRole, queryByRole,
    } = renderComponent();

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);

    const firstMenuItem = menuItems[0];
    expect(firstMenuItem).toBeInTheDocument();
    fireEvent.click(firstMenuItem);

    await waitFor(() => {
      expect(queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('calls onItemClick when item is clicked', () => {
    const onItemClick = jest.fn();
    const { getByTestId, getByRole, getAllByRole } = renderComponent({ onItemClick });

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);

    const firstMenuItem = menuItems[0];
    expect(firstMenuItem).toBeInTheDocument();
    fireEvent.click(firstMenuItem);

    expect(onItemClick).toHaveBeenCalledWith(defaultItems[0]);
  });

  it('calls onClose when menu is closed', async () => {
    const onClose = jest.fn();
    const { getByTestId, getByRole, getAllByRole } = renderComponent({ onClose });

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = getAllByRole('menuitem');
    const firstMenuItem = menuItems[0];
    fireEvent.click(firstMenuItem);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('handles disabled items', () => {
    const itemsWithDisabled = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2', disabled: true },
      { label: 'Option 3', value: 'option3' },
    ];

    const { getByTestId, getByRole, getAllByRole } = renderComponent({
      items: itemsWithDisabled,
    });

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    expect(menuItems[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with testId', async () => {
    const { getByTestId, getByRole } = renderComponent({ testId: 'test-menu' });

    // Check that the testId is applied to the menu paper using querySelector
    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    // Wait for menu to open
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    // The menu paper is rendered in a portal, so we need to query the document
    const testElement = document.querySelector('[data-test-id="test-menu"]');
    expect(testElement).toBeInTheDocument();
  });

  it('applies default scroll behavior', () => {
    const { getByTestId, getByRole } = renderComponent();

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    // Check that the menu has scroll behavior (overflow-y: auto)
    const menuPaper = menu.closest('.MuiPaper-root');
    expect(menuPaper).toHaveStyle('overflow-y: auto');
    expect(menuPaper).toHaveStyle('overflow-x: hidden');
  });

  it('preserves existing onClick handler on anchor element', () => {
    const anchorOnClick = jest.fn();
    const handleMenuOpen = jest.fn(() => {
      anchorOnClick();
    });

    function TestWrapperWithHandler() {
      const [menuOpen, setMenuOpen] = useState(false);
      const anchorRef = useRef(null);

      const handleMenuClose = () => {
        setMenuOpen(false);
      };

      return (
        <>
          <IconButton
            ref={anchorRef}
            testId="test-anchor-with-handler"
            onClick={() => {
              handleMenuOpen();
              setMenuOpen(true);
            }}
          >
            <span>⋮</span>
          </IconButton>
          <Menu
            anchorElement={anchorRef.current}
            items={defaultItems}
            open={menuOpen}
            onClose={handleMenuClose}
          />
        </>
      );
    }

    const { getByTestId, getByRole } = render(<TestWrapperWithHandler />);

    const anchor = getByTestId('test-anchor-with-handler');
    fireEvent.click(anchor);

    expect(anchorOnClick).toHaveBeenCalled();
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  it('calls item onClick handler when item has its own onClick', () => {
    const itemOnClick = jest.fn();
    const onItemClick = jest.fn();
    const itemsWithOnClick = [
      { label: 'Option 1', value: 'option1', onClick: itemOnClick },
      { label: 'Option 2', value: 'option2' },
    ];

    const { getByTestId, getAllByRole } = renderComponent({
      items: itemsWithOnClick,
      onItemClick,
    });

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menuItems = getAllByRole('menuitem');
    fireEvent.click(menuItems[0]);

    expect(itemOnClick).toHaveBeenCalledWith(itemsWithOnClick[0]);
    expect(onItemClick).toHaveBeenCalledWith(itemsWithOnClick[0]);
  });

  it('applies custom anchorOrigin and transformOrigin', () => {
    const anchorOrigin = {
      vertical: 'top',
      horizontal: 'right',
    };
    const transformOrigin = {
      vertical: 'bottom',
      horizontal: 'right',
    };

    const { getByTestId, getByRole } = renderComponent({
      anchorOrigin,
      transformOrigin,
    });

    const anchor = getByTestId('test-anchor');
    fireEvent.click(anchor);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  describe('optionIcon functionality', () => {
    const itemsWithIcons = [
      {
        label: 'Option 1',
        value: 'option1',
        icon: <span data-testid="icon-1">🔵</span>,
      },
      {
        label: 'Option 2',
        value: 'option2',
        icon: <span data-testid="icon-2">🟢</span>,
      },
      {
        label: 'Option 3',
        value: 'option3',
      },
    ];

    it('renders icons when optionIcon is true and iconPosition is start', async () => {
      const {
        getByTestId, getByRole, getAllByRole, findByText,
      } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
      });

      const anchor = getByTestId('test-anchor');
      fireEvent.click(anchor);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are rendered for items that have them
      expect(await findByText('🔵')).toBeInTheDocument();
      expect(await findByText('🟢')).toBeInTheDocument();
    });

    it('renders icons when optionIcon is true and iconPosition is end', async () => {
      const {
        getByTestId, getByRole, getAllByRole, findByText,
      } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'end',
      });

      const anchor = getByTestId('test-anchor');
      fireEvent.click(anchor);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are rendered for items that have them
      expect(await findByText('🔵')).toBeInTheDocument();
      expect(await findByText('🟢')).toBeInTheDocument();
    });

    it('does not render icons when optionIcon is false', async () => {
      const {
        getByTestId, getByRole, getAllByRole, queryByText,
      } = renderComponent({
        items: itemsWithIcons,
        optionIcon: false,
      });

      const anchor = getByTestId('test-anchor');
      fireEvent.click(anchor);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are not rendered
      expect(queryByText('🔵')).not.toBeInTheDocument();
      expect(queryByText('🟢')).not.toBeInTheDocument();
    });

    it('handles items without icons gracefully', () => {
      const { getByTestId, getByRole, getAllByRole } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
      });

      const anchor = getByTestId('test-anchor');
      fireEvent.click(anchor);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // All items should be rendered, even those without icons
      expect(menuItems[0]).toHaveTextContent('Option 1');
      expect(menuItems[1]).toHaveTextContent('Option 2');
      expect(menuItems[2]).toHaveTextContent('Option 3');
    });

    it('calls onItemClick with correct item data when item with icon is clicked', () => {
      const onItemClick = jest.fn();
      const { getByTestId, getByRole, getAllByRole } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
        onItemClick,
      });

      const anchor = getByTestId('test-anchor');
      fireEvent.click(anchor);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      const firstMenuItem = menuItems[0];
      fireEvent.click(firstMenuItem);

      expect(onItemClick).toHaveBeenCalledWith(itemsWithIcons[0]);
    });
  });
});
