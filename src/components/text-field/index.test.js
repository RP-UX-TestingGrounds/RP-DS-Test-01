import React, { Fragment } from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextField from '.';

describe('TextField', () => {
  afterEach(cleanup);

  function renderComponent(targetProps) {
    const defaultProps = {
      testId: 'text-field-id',
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
        <TextField {...props} />
        <a href="#" data-test-id="link-id">Link</a>
      </Fragment>),
    };
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({});
    expect(getByTestId('text-field-id')).toBeInTheDocument();
  });

  it('supports disabling the input', async () => {
    const { getByTestId, getByLabelText, user } = renderComponent({
      disabled: true,
      defaultValue: 'Default Value',
    });
    expect(getByTestId('text-field-id')).toBeInTheDocument();
    // attempt to change the value
    const input = getByLabelText('Label');
    expect(input).toBeDisabled();
    await user.type(input, ' New Value');
    expect(input.value).toBe('Default Value');
  });

  it('supports setting event handlers', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByTestId, getByLabelText, user } = renderComponent({
      onChange,
      onFocus,
      onBlur,
    });
    expect(getByTestId('text-field-id')).toBeInTheDocument();
    const input = getByLabelText('Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    await user.type(input, 'New Value');
    await user.click(getByTestId('link-id'));

    expect(onChange).toHaveBeenCalledTimes(9);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('supports adding a clear icon', async () => {
    const onClear = jest.fn();
    const { getByTestId, user } = renderComponent({
      icon: <div>Clear</div>,
      onClear,
    });

    const clearIcon = getByTestId('text-field-id_clear');
    expect(clearIcon).toBeInTheDocument();
    await user.click(clearIcon);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('passes through slot props to corresponding input elements', () => {
    const slotProps = {
      htmlInput: {
        'data-test-id': 'html-input-id',
      },
      input: {
        sx: {
          color: 'red',
        },
      },
      inputLabel: {
        'data-test-id': 'input-label-id',
      },
    };

    const { getByLabelText, getByTestId } = renderComponent({ slotProps });

    // Verify htmlInput received the data-test-id
    const htmlInput = getByTestId('html-input-id');
    expect(htmlInput).toBeInTheDocument();
    expect(htmlInput).toBe(getByLabelText('Label'));

    // Verify inputLabel received the data-test-id
    const inputLabel = getByTestId('input-label-id');
    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel.textContent).toBe('Label');

    // Verify input (wrapper) received the sx prop by checking computed styles
    const inputWrapper = htmlInput.closest('.MuiInputBase-root');
    expect(inputWrapper).toBeInTheDocument();
    expect(inputWrapper).toHaveStyle({ color: 'red' });
  });

  describe('defaultValues', () => {
    it('defaults to defaultValue if no value is provided', () => {
      const { getByLabelText } = renderComponent({
        defaultValue: 'Default Value',
      });
      const input = getByLabelText('Label');
      expect(input.value).toBe('Default Value');
    });

    it('default to value even if value is falsey', () => {
      const { getByLabelText } = renderComponent({
        defaultValue: 'Default Value',
        value: '',
      });
      const input = getByLabelText('Label');
      expect(input.value).toBe('');
    });
  });
});
