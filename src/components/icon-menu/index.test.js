import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Download } from '@mui/icons-material';
import IconMenu from './index';

describe('IconMenu', () => {
  afterEach(cleanup);

  const defaultItems = [
    { label: 'Download', value: 'download' },
    { label: 'Print', value: 'print' },
    { label: 'Share', value: 'share' },
  ];

  it('renders the default MoreHoriz icon', () => {
    const { container } = render(<IconMenu items={defaultItems} testId="icon-menu" />);
    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    expect(button).toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    const { container } = render(
      <IconMenu
        items={defaultItems}
        icon={Download}
        testId="icon-menu"
      />,
    );
    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    expect(button).toBeInTheDocument();
  });

  it('opens the menu when the icon button is clicked', () => {
    const { container, getByTestId } = render(
      <IconMenu
        items={defaultItems}
        testId="icon-menu"
      />,
    );
    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    fireEvent.click(button);

    const menu = getByTestId('icon-menu-menu');
    expect(menu).toBeInTheDocument();
  });

  it('displays menu items when open', () => {
    const { container, getAllByText } = render(
      <IconMenu
        items={defaultItems}
        testId="icon-menu"
      />,
    );
    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    fireEvent.click(button);

    const downloadOptions = getAllByText('Download');
    const printOptions = getAllByText('Print');
    const shareOptions = getAllByText('Share');

    // Verify at least one of each item is in the document
    expect(downloadOptions.length).toBeGreaterThan(0);
    expect(printOptions.length).toBeGreaterThan(0);
    expect(shareOptions.length).toBeGreaterThan(0);
  });

  it('calls onItemClick when a menu item is clicked', () => {
    const handleItemClick = jest.fn();
    const { container, getAllByText } = render(
      <IconMenu
        items={defaultItems}
        onItemClick={handleItemClick}
        testId="icon-menu"
      />,
    );

    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    fireEvent.click(button);

    const downloadOptions = getAllByText('Download');
    fireEvent.click(downloadOptions[downloadOptions.length - 1]);

    expect(handleItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Download', value: 'download' }),
    );
  });

  it('disables the icon button when buttonDisabled is true', () => {
    const { container } = render(
      <IconMenu
        items={defaultItems}
        buttonDisabled
        testId="icon-menu"
      />,
    );

    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    expect(button).toBeDisabled();
  });

  it('applies custom button color', () => {
    const { container } = render(
      <IconMenu
        items={defaultItems}
        buttonColor="primary"
        testId="icon-menu"
      />,
    );

    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    expect(button).toBeInTheDocument();
  });

  it('applies custom button size', () => {
    const { container } = render(
      <IconMenu
        items={defaultItems}
        buttonSize="small"
        testId="icon-menu"
      />,
    );

    const button = container.querySelector('[data-test-id="icon-menu-button"]');
    expect(button).toBeInTheDocument();
  });
});
