import React from 'react';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import MenuButton from './index';

describe('MenuButton', () => {
  afterEach(cleanup);
  const defaultItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  function renderComponent(props) {
    return render(<MenuButton items={defaultItems} {...props} />);
  }

  it('renders with default props', () => {
    const { getByRole } = renderComponent();

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const { getByRole } = renderComponent({ placeholder: 'Choose option' });

    const button = getByRole('button');
    expect(button).toHaveTextContent('Choose option');
  });

  it('opens menu when clicked', () => {
    const { getByRole } = renderComponent();

    const button = getByRole('button');
    fireEvent.click(button);

    // Look for menu using getByRole
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  it('closes menu when item is clicked', async () => {
    const { getByRole, getAllByRole, queryByRole } = renderComponent();

    const button = getByRole('button');
    fireEvent.click(button);

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

  it('calls onChange when item is clicked', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByRole } = renderComponent({ onChange });

    const button = getByRole('button');
    fireEvent.click(button);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);

    const firstMenuItem = menuItems[0];
    expect(firstMenuItem).toBeInTheDocument();
    fireEvent.click(firstMenuItem);

    expect(onChange).toHaveBeenCalledWith(defaultItems[0]);
  });

  it('shows selected item when selectedValue is provided', () => {
    const { getByRole } = renderComponent({ selectedValue: 'option2' });

    const button = getByRole('button');
    expect(button).toHaveTextContent('Option 2');
  });

  it('shows default selected item when defaultSelectedValue is provided', () => {
    const { getByRole } = renderComponent({ defaultSelectedValue: 'option3' });

    const button = getByRole('button');
    expect(button).toHaveTextContent('Option 3');
  });

  it('does not update internal state when selectedValue prop is provided', () => {
    const { getByRole, rerender } = renderComponent({ selectedValue: 'option1' });

    let button = getByRole('button');
    expect(button).toHaveTextContent('Option 1');

    // Change selectedValue prop
    rerender(<MenuButton items={defaultItems} selectedValue="option2" />);

    button = getByRole('button');
    expect(button).toHaveTextContent('Option 2');
  });

  it('applies color theme correctly', () => {
    const { getByRole } = renderComponent({ color: 'error' });

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const { getByRole } = renderComponent({ disabled: true });

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders with testId', () => {
    const { container, getByRole } = renderComponent({ testId: 'test-menu-button' });

    // Check that the testId is applied to the container using querySelector
    const testElement = container.querySelector('[data-test-id="test-menu-button"]');
    expect(testElement).toBeInTheDocument();

    // Also check that the button is rendered
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies default scroll behavior', () => {
    const { getByRole } = renderComponent();

    const button = getByRole('button');
    fireEvent.click(button);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();

    // Check that the menu has scroll behavior (overflow-y: auto)
    const menuPaper = menu.closest('.MuiPaper-root');
    expect(menuPaper).toHaveStyle('overflow-y: auto');
    expect(menuPaper).toHaveStyle('overflow-x: hidden');
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
      const { getByRole, getAllByRole, findByText } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
      });

      const button = getByRole('button');
      fireEvent.click(button);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are rendered for items that have them
      expect(await findByText('🔵')).toBeInTheDocument();
      expect(await findByText('🟢')).toBeInTheDocument();
    });

    it('renders icons when optionIcon is true and iconPosition is end', async () => {
      const { getByRole, getAllByRole, findByText } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'end',
      });

      const button = getByRole('button');
      fireEvent.click(button);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are rendered for items that have them
      expect(await findByText('🔵')).toBeInTheDocument();
      expect(await findByText('🟢')).toBeInTheDocument();
    });

    it('does not render icons when optionIcon is false', async () => {
      const { getByRole, getAllByRole, queryByText } = renderComponent({
        items: itemsWithIcons,
        optionIcon: false,
      });

      const button = getByRole('button');
      fireEvent.click(button);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      // Check that icons are not rendered
      expect(queryByText('🔵')).not.toBeInTheDocument();
      expect(queryByText('🟢')).not.toBeInTheDocument();
    });

    it('handles items without icons gracefully', () => {
      const { getByRole, getAllByRole } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
      });

      const button = getByRole('button');
      fireEvent.click(button);

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
      const { getByRole, getAllByRole } = renderComponent({
        items: itemsWithIcons,
        optionIcon: true,
        iconPosition: 'start',
        onChange: onItemClick,
      });

      const button = getByRole('button');
      fireEvent.click(button);

      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = getAllByRole('menuitem');
      const firstMenuItem = menuItems[0];
      fireEvent.click(firstMenuItem);

      expect(onItemClick).toHaveBeenCalledWith(itemsWithIcons[0]);
    });
  });
});
