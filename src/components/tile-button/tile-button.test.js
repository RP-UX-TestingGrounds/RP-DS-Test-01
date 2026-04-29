import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from '@mui/icons-material';

import TileButton from '.';

describe('TileButton', () => {
  afterEach(cleanup);

  function renderTileButton(props = {}) {
    return render(
      <TileButton
        testId="tile-button"
        label="Test Label"
        {...props}
      />,
    );
  }

  it('renders label and description', () => {
    const { getByTestId, getByText } = renderTileButton({
      label: 'OEM',
      description: 'Original Equipment Manufacturer',
    });

    expect(getByTestId('tile-button')).toBeInTheDocument();
    expect(getByText('OEM')).toBeInTheDocument();
    expect(getByText('Original Equipment Manufacturer')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    const { getByTestId } = renderTileButton({
      onClick: handleClick,
    });

    const button = getByTestId('tile-button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon node', () => {
    const { getByTestId, container } = renderTileButton({ icon: <Settings /> });

    expect(getByTestId('tile-button')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with iconName', () => {
    const { getByTestId, container } = renderTileButton({ iconName: 'account' });

    expect(getByTestId('tile-button')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has disabled attribute and does not fire onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    const { getByTestId } = renderTileButton({
      disabled: true,
      onClick: handleClick,
    });

    const button = getByTestId('tile-button');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders customContent alongside description', () => {
    const { getByText } = renderTileButton({
      description: 'A description',
      customContent: <span>Rich content</span>,
    });

    expect(getByText('A description')).toBeInTheDocument();
    expect(getByText('Rich content')).toBeInTheDocument();
  });

  it('renders customContent without description', () => {
    const { getByText } = renderTileButton({
      customContent: <span>Rich content</span>,
    });

    expect(getByText('Rich content')).toBeInTheDocument();
  });

  it('defaults icon alignment to center', () => {
    const { getByTestId } = renderTileButton({ icon: <Settings /> });

    expect(getByTestId('tile-button')).toHaveStyle({ alignItems: 'center' });
  });

  it('aligns icon to start when iconAlign is start', () => {
    const { getByTestId } = renderTileButton({
      icon: <Settings />,
      iconAlign: 'start',
    });

    expect(getByTestId('tile-button')).toHaveStyle({ alignItems: 'start' });
  });
});
