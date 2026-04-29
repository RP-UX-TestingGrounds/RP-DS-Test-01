import React, { Fragment } from 'react';
import {
  fireEvent,
  render,
  cleanup,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectField from '.';
import MenuItem from './menu-item';

describe('SelectField', () => {
  afterEach(cleanup);

  function renderComponent(targetProps) {
    const defaultProps = {
      testId: 'select-field-id',
      label: 'Label',
      name: 'test-field',
      id: 'test-field-id',
    };

    const props = {
      ...defaultProps,
      ...targetProps,
    };

    return {
      user: userEvent.setup(),
      ...render(<Fragment>
        <SelectField {...props}>
          <MenuItem value="">Undefined</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="Default Value">Default Value</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </SelectField>
        <a href="#" data-test-id="link-id">Link</a>
      </Fragment>),
    };
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({
      defaultValue: 'Default Value',
    });
    expect(getByTestId('select-field-id')).toBeInTheDocument();
  });

  it('supports disabling the input', async () => {
    const { getByTestId, getByLabelText, queryByRole } = renderComponent({
      disabled: true,
      defaultValue: 'Default Value',
    });
    expect(getByTestId('select-field-id')).toBeInTheDocument();

    // attempt to change the value
    const selectEl = getByLabelText('Label');
    expect(selectEl).toHaveAttribute('aria-disabled', 'true');
    fireEvent.mouseDown(selectEl);

    const optionsPopupEl = queryByRole('listbox', { name: 'Label' });
    expect(optionsPopupEl).not.toBeInTheDocument();
  });

  it('supports setting event handlers', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const {
      getByTestId,
      getByLabelText,
      queryByRole,
      user,
    } = renderComponent({
      onChange,
      disabled: false,
      defaultValue: 'Default Value',
      onFocus,
      onBlur,
    });
    expect(getByTestId('select-field-id')).toBeInTheDocument();

    // attempt to change the value
    const selectEl = getByLabelText('Label');
    await user.click(selectEl);
    expect(onFocus).toHaveBeenCalledTimes(1);

    const optionsPopupEl = queryByRole('listbox', { name: 'Label' });
    expect(optionsPopupEl).toBeInTheDocument();

    await user.click(within(optionsPopupEl).getByText(/Option 3/i));

    expect(onChange).toHaveBeenCalledTimes(1);

    await user.click(getByTestId('link-id'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});

describe('disabled options', () => {
  afterEach(cleanup);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ];

  const renderSelect = (props = {}) => render(
    <SelectField
      id="test-select"
      label="Label"
      testId="test-id"
      options={options}
      defaultValue="option1"
      {...props}
    />,
  );

  it('renders disabled options with aria-disabled', async () => {
    const { getAllByRole } = renderSelect();
    await userEvent.click(getAllByRole('combobox')[0]);
    expect(getAllByRole('option')[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('defaults to first enabled option when no defaultValue is provided', () => {
    const { getAllByRole } = renderSelect({
      options: [{ value: 'option1', label: 'Option 1', disabled: true }, { value: 'option2', label: 'Option 2' }],
      defaultValue: undefined,
    });
    expect(getAllByRole('combobox')[0]).toHaveTextContent('Option 2');
  });

  it('disables checkbox inside a disabled MenuItem', async () => {
    const { getAllByRole } = renderSelect({ multiple: true, checkbox: true, defaultValue: ['option1'] });
    await userEvent.click(getAllByRole('combobox')[0]);
    expect(within(getAllByRole('option')[1]).getByRole('checkbox')).toBeDisabled();
  });
});
