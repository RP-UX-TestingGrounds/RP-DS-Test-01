import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListItem from '.';

describe('ListItem', () => {
  afterEach(cleanup);

  function renderListItem(props) {
    return {
      user: userEvent.setup(),
      ...render(<ListItem {...props} />),
    };
  }

  it('renders label and subLabel when provided', () => {
    const { getByText } = renderListItem({
      testId: 'list-item',
      label: 'My Label',
      subLabel: 'My SubLabel',
      value: 'test-value',
    });

    expect(getByText('My Label')).toBeInTheDocument();
    expect(getByText('My SubLabel')).toBeInTheDocument();
  });

  it('renders checkbox when showCheckbox is true', () => {
    const { getByRole } = renderListItem({
      testId: 'list-item',
      label: 'Label',
      value: 'test-value',
      showCheckbox: true,
    });

    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checkbox as checked when selected is true', () => {
    const { getByRole } = renderListItem({
      testId: 'list-item',
      label: 'Label',
      value: 'test-value',
      showCheckbox: true,
      selected: true,
    });

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange with value when clicked', async () => {
    const onChange = jest.fn();
    const { user, getByTestId } = renderListItem({
      testId: 'list-item',
      label: 'Label',
      value: 'my-value',
      onChange,
    });

    await user.click(getByTestId('list-item'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('my-value');
  });
});
