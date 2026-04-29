import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxField from '.';

describe('CheckboxField', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return {
      user: userEvent.setup(),
      ...render(<CheckboxField {...props} />),
    };
  }

  it('renders with label', () => {
    const { getByText } = renderComponent({
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('renders checked checkbox', () => {
    const { getByTestId } = renderComponent({
      checked: true,
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it('renders unchecked checkbox', () => {
    const { getByTestId } = renderComponent({
      checked: false,
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).not.toBeChecked();
  });

  it('renders disabled checkbox', () => {
    const { getByTestId } = renderComponent({
      checked: false,
      disabled: true,
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).toBeDisabled();
  });

  it('renders with helper text', () => {
    const { getByText } = renderComponent({
      helperText: 'Helper text',
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    const { getByText } = renderComponent({
      error: true,
      helperText: 'Error message',
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    const helperText = getByText('Error message');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveAttribute('data-error', 'true');
  });

  it('calls onChange handler when clicked', async () => {
    const handleChange = jest.fn();
    const { getByTestId, user } = renderComponent({
      checked: false,
      label: 'Test Label',
      name: 'test',
      onChange: handleChange,
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    await user.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur handler when focus is lost', async () => {
    const handleBlur = jest.fn();
    const { getByTestId, user } = renderComponent({
      checked: false,
      label: 'Test Label',
      name: 'test',
      onBlur: handleBlur,
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    await user.click(input);
    await user.tab();

    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders indeterminate checkbox', () => {
    const { getByTestId } = renderComponent({
      checked: true,
      indeterminate: true,
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"][data-indeterminate="true"]');
    expect(input).toBeInTheDocument();
  });

  it('renders with label on start', () => {
    const { container } = renderComponent({
      label: 'Test Label',
      labelPlacement: 'start',
      name: 'test',
      testId: 'test-checkbox',
    });

    const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
    expect(formControlLabel).toHaveClass('MuiFormControlLabel-labelPlacementStart');
  });

  it('renders with test id', () => {
    const { getByTestId } = renderComponent({
      label: 'Test Label',
      name: 'test',
      testId: 'my-test-id',
    });

    const wrapper = getByTestId('my-test-id');
    expect(wrapper).toBeInTheDocument();
  });

  it('passes name attribute to checkbox', () => {
    const { getByTestId } = renderComponent({
      label: 'Test Label',
      name: 'my-checkbox',
      testId: 'test-checkbox',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('name', 'my-checkbox');
  });

  it('passes value attribute to checkbox', () => {
    const { getByTestId } = renderComponent({
      label: 'Test Label',
      name: 'test',
      testId: 'test-checkbox',
      value: 'checkbox-value',
    });

    const checkbox = getByTestId('test-checkbox-checkbox');
    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('value', 'checkbox-value');
  });
});
