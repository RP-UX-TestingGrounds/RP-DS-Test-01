import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '.';

describe('Checkbox', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return {
      user: userEvent.setup(),
      ...render(<Checkbox {...props} />),
    };
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({
      testId: 'default-checkbox',
      variant: 'default',
    });

    expect(getByTestId('default-checkbox')).toBeInTheDocument();
  });

  it('supports disabling the checkbox', async () => {
    const { getByTestId } = renderComponent({
      testId: 'disabled-checkbox',
      disabled: true,
    });

    const checkbox = getByTestId('disabled-checkbox');
    expect(checkbox).toBeInTheDocument();

    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).not.toBeChecked();
    expect(input).toBeDisabled();
  });

  it('supports setting event handlers', async () => {
    const onChange = jest.fn();
    const { getByTestId, user } = renderComponent({
      testId: 'onchange-checkbox',
      onChange,
    });

    const checkbox = getByTestId('onchange-checkbox');
    expect(getByTestId('onchange-checkbox')).toBeInTheDocument();

    const input = checkbox.querySelector('input[type="checkbox"]');
    await user.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toBeChecked();
  });

  it('supports setting indeterminate state', () => {
    const { getByTestId } = renderComponent({
      testId: 'indeterminate-checkbox',
      indeterminate: true,
    });

    const checkbox = getByTestId('indeterminate-checkbox');
    expect(checkbox).toBeInTheDocument();

    const input = checkbox.querySelector('input[type="checkbox"][data-indeterminate="true"]');
    expect(input).toBeInTheDocument();
  });

  it('supports setting a checked value', () => {
    const { getByTestId } = renderComponent({
      testId: 'checked-checkbox',
      checked: true,
      value: 'testing',
    });

    const checkbox = getByTestId('checked-checkbox');
    expect(checkbox).toBeInTheDocument();

    const input = checkbox.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
    expect(input.value).toEqual('testing');
  });
});
