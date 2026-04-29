import React from 'react';
import PropTypes from 'prop-types';
import { render, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormikField from '.';
import TextField from '../text-field';
import SelectField from '../select-field';

// Mock components for testing
const MockInputField = ({
  testId,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  ...props
}) => (
  <div
    data-test-id={testId}
    data-error={String(!!error)}
    data-helper-text={helperText}
  >
    <input
      {...props}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      data-test-id={`${testId}-input`}
    />
  </div>
);

MockInputField.propTypes = {
  testId: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

describe('FormikField', () => {
  afterEach(cleanup);

  function renderWithFormik(targetProps, formikConfig = {}) {
    const defaultFormikConfig = {
      initialValues: {
        testField: 'initial value',
        errorField: '',
      },
      validationSchema: yup.object({
        testField: yup.string().required('Test field is required'),
        errorField: yup.string().min(5, 'Must be at least 5 characters'),
      }),
      onSubmit: jest.fn(),
    };

    const TestComponent = () => {
      const formik = useFormik({
        ...defaultFormikConfig,
        ...formikConfig,
      });

      const defaultProps = {
        formik,
        name: 'testField',
        testId: 'formik-field-test',
        InputField: MockInputField,
        ...targetProps,
      };

      return <FormikField {...defaultProps} />;
    };

    return {
      user: userEvent.setup(),
      ...render(<TestComponent />),
    };
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderWithFormik();
    expect(getByTestId('formik-field-test')).toBeInTheDocument();
  });

  it('passes formik field props to InputField', () => {
    const { getByTestId } = renderWithFormik();
    const input = getByTestId('formik-field-test-input');
    expect(input).toHaveValue('initial value');
  });

  it('passes through additional props to InputField', () => {
    const { getByTestId } = renderWithFormik({
      placeholder: 'Test placeholder',
      disabled: true,
    });
    const input = getByTestId('formik-field-test-input');
    expect(input).toHaveAttribute('placeholder', 'Test placeholder');
    expect(input).toBeDisabled();
  });

  it('displays error when field is touched and has error', async () => {
    const { getByTestId, user } = renderWithFormik({
      name: 'errorField',
      testId: 'error-field-test',
    });

    const input = getByTestId('error-field-test-input');
    const container = getByTestId('error-field-test');

    // Initially no error
    expect(container).toHaveAttribute('data-error', 'false');

    // Trigger validation by typing and blurring
    await act(async () => {
      await user.type(input, 'abc');
      await user.tab();
    });

    // Should show error after blur
    expect(container).toHaveAttribute('data-error', 'true');
    expect(container).toHaveAttribute('data-helper-text', 'Must be at least 5 characters');
  });

  it('displays custom helper text when no error', () => {
    const { getByTestId } = renderWithFormik({
      helperText: 'Custom helper text',
    });

    const container = getByTestId('formik-field-test');
    expect(container).toHaveAttribute('data-helper-text', 'Custom helper text');
  });

  it('prioritizes error message over custom helper text', async () => {
    const { getByTestId, user } = renderWithFormik({
      name: 'errorField',
      testId: 'error-field-test',
      helperText: 'Custom helper text',
    });

    const input = getByTestId('error-field-test-input');
    const container = getByTestId('error-field-test');

    // Initially shows custom helper text
    expect(container).toHaveAttribute('data-helper-text', 'Custom helper text');

    // Trigger validation error
    await act(async () => {
      await user.type(input, 'abc');
      await user.tab();
    });

    // Should show error message instead of custom helper text
    expect(container).toHaveAttribute('data-helper-text', 'Must be at least 5 characters');
  });

  it('calls formik onChange when input changes', async () => {
    const { getByTestId, user } = renderWithFormik();
    const input = getByTestId('formik-field-test-input');

    await act(async () => {
      await user.type(input, ' new text');
    });
    expect(input).toHaveValue('initial value new text');
  });

  it('calls custom onChange handler in addition to formik onChange', async () => {
    const customOnChange = jest.fn();
    const { getByTestId, user } = renderWithFormik({
      onChange: customOnChange,
    });

    const input = getByTestId('formik-field-test-input');
    await act(async () => {
      await user.type(input, 'a');
    });

    expect(customOnChange).toHaveBeenCalled();
  });

  it('calls formik onBlur when input loses focus', async () => {
    const { getByTestId, user } = renderWithFormik();
    const input = getByTestId('formik-field-test-input');

    await act(async () => {
      await user.click(input);
      await user.tab();
    });

    // The field should be marked as touched after blur
    expect(input).toHaveValue('initial value');
  });

  it('calls custom onBlur handler in addition to formik onBlur', async () => {
    const customOnBlur = jest.fn();
    const { getByTestId, user } = renderWithFormik({
      onBlur: customOnBlur,
    });

    const input = getByTestId('formik-field-test-input');
    await act(async () => {
      await user.click(input);
      await user.tab();
    });

    expect(customOnBlur).toHaveBeenCalled();
  });

  it('works with TextField component', () => {
    const { getByTestId } = renderWithFormik({
      InputField: TextField,
      label: 'Test Label',
    });

    expect(getByTestId('formik-field-test')).toBeInTheDocument();
  });

  it('works with SelectField component', () => {
    const { getByTestId } = renderWithFormik({
      InputField: SelectField,
      label: 'Test Select',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
    }, {
      initialValues: {
        testField: 'option1',
        errorField: '',
      },
    });

    expect(getByTestId('formik-field-test')).toBeInTheDocument();
  });

  it('handles undefined formik field props gracefully', () => {
    const { getByTestId } = renderWithFormik({
      name: 'nonExistentField',
    });

    const input = getByTestId('formik-field-test-input');
    expect(input).toHaveValue('');
  });

  it('passes testId to InputField', () => {
    const { getByTestId } = renderWithFormik({
      testId: 'custom-test-id',
    });

    expect(getByTestId('custom-test-id')).toBeInTheDocument();
    expect(getByTestId('custom-test-id-input')).toBeInTheDocument();
  });

  it('handles formik field meta correctly', async () => {
    const { getByTestId, user } = renderWithFormik({
      name: 'errorField',
      testId: 'error-field-test',
    });

    const input = getByTestId('error-field-test-input');
    const container = getByTestId('error-field-test');

    // Initially not touched, no error
    expect(container).toHaveAttribute('data-error', 'false');

    // Type invalid value and blur to trigger validation
    await act(async () => {
      await user.type(input, 'ab');
      await user.tab();
    });

    // Should show error
    expect(container).toHaveAttribute('data-error', 'true');
  });

  it('does not show error when field is not touched', () => {
    const { getByTestId } = renderWithFormik({
      name: 'errorField',
      testId: 'error-field-test',
    });

    const container = getByTestId('error-field-test');
    // Even though there's a validation error, it shouldn't show because field isn't touched
    expect(container).toHaveAttribute('data-error', 'false');
  });
});
