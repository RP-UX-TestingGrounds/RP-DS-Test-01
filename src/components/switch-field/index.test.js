import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwitchField from './index';

describe('SwitchField Component', () => {
  const defaultProps = {
    name: 'test-name',
    size: 'large',
    onChange: jest.fn(),
    testId: 'test-field',
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders with label and switch', () => {
    const { getByText, getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
      />,
    );

    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByTestId('test-field-switch')).toBeInTheDocument();
  });

  test('passes checked state correctly to Switch', () => {
    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        checked
      />,
    );

    const switchInput = getByTestId('test-field-switch').querySelector('input');
    expect(switchInput).toBeChecked();
  });

  test('uses value as checked state if checked is undefined', () => {
    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        value
      />,
    );

    const switchInput = getByTestId('test-field-switch').querySelector('input');
    expect(switchInput).toBeChecked();
  });

  test('prioritizes checked prop over value', () => {
    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        checked={false}
        value
      />,
    );

    const switchInput = getByTestId('test-field-switch').querySelector('input');
    expect(switchInput).not.toBeChecked();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        onChange={handleChange}
      />,
    );

    const switchInput = getByTestId('test-field-switch').querySelector('input');

    fireEvent.click(switchInput);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles disabled state', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        disabled
        onChange={handleChange}
      />,
    );

    const switchInput = getByTestId('test-field-switch').querySelector('input');

    expect(switchInput).toBeDisabled();

    fireEvent.click(switchInput);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('supports label placement', () => {
    const { container } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        labelPlacement="start"
      />,
    );

    const labelRoot = container.querySelector('.MuiFormControlLabel-root');
    expect(labelRoot).toHaveClass('MuiFormControlLabel-labelPlacementStart');
  });

  test('renders tooltip when provided', () => {
    const { getByTestId } = render(
      <SwitchField
        {...defaultProps}
        label="Test Label"
        tooltip="Tooltip text"
      />,
    );

    expect(getByTestId('test-field-tooltip')).toBeInTheDocument();
  });
});
