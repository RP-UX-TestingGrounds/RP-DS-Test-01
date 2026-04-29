import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from './index';

describe('Switch Component', () => {
  afterEach(cleanup);

  test('renders with default props', () => {
    const { getByTestId } = render(<Switch testId="test-switch" />);
    const switchElement = getByTestId('test-switch');
    expect(switchElement).toBeInTheDocument();
    const input = switchElement.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  test('renders as checked when checked prop is true', () => {
    const { getByTestId } = render(
      <Switch
        testId="test-switch"
        checked={true}
        onChange={() => {}}
      />,
    );
    const switchElement = getByTestId('test-switch');
    const input = switchElement.querySelector('input');
    expect(input).toBeChecked();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Switch testId="test-switch" onChange={handleChange} />);
    const switchElement = getByTestId('test-switch');
    // We should click the input element itself to trigger the change event reliably
    const input = switchElement.querySelector('input');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Switch
        testId="test-switch"
        disabled
        onChange={handleChange}
      />,
    );
    const switchElement = getByTestId('test-switch');
    const input = switchElement.querySelector('input');
    expect(input).toBeDisabled();

    // Attempt to click
    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders large size by default and handles small size', () => {
    const { getByTestId, rerender } = render(<Switch testId="test-switch-default" />);
    const switchRootDefault = getByTestId('test-switch-default');

    // Default size should NOT have MuiSwitch-sizeSmall
    expect(switchRootDefault).not.toHaveClass('MuiSwitch-sizeSmall');

    rerender(<Switch testId="test-switch-small" size="small" />);
    const switchRootSmall = getByTestId('test-switch-small');

    // 'switchRootSmall' is likely finding the internal switchBase because testId is spread there.
    // If getByTestId finds the switchBase, we check its parent for the size class.
    // If it finds the root, we check the root.
    // Based on previous error messages, it finds switchBase (MuiSwitch-switchBase class present).
    expect(switchRootSmall.parentElement).toHaveClass('MuiSwitch-sizeSmall');
  });
});
