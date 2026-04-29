import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { action } from 'storybook/actions';

import TextField from '../text-field';
import SelectField from '../select-field';
import FormikField from '.';
import Button from '../button';

export default {
  title: 'Components/Inputs/FormikField',
  tags: [],
  component: ({ defaultValue, validationSchema, ...args }) => {
    const formik = useFormik({
      initialValues: {
        test: defaultValue,
        secondary: 'Secondary Default Value',
      },
      validationSchema,
      onSubmit: (values) => {
        action('submitted')(values);
      },
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <FormikField
          formik={formik}
          {...args}
        />
        <FormikField
          formik={formik}
          name="secondary"
          testId="test-id-2"
          label="Secondary Field"
          placeholder="Secondary Placeholder"
          InputField={TextField}
        />
        <Button onClick={() => formik.handleSubmit()} color="primary">
          Submit Form
        </Button>
        <Button onClick={() => formik.resetForm()}>
          Reset Form
        </Button>
      </div>
    );
  },
};

export const Primary = {
  args: {
    name: 'test',
    testId: 'test-id',
    label: 'Test Field',
    placeholder: 'Test Placeholder',
    defaultValue: 'Test Default Value',
    helperText: 'Test Helper Text',
    validationSchema: yup.object({
      test: yup
        .string('Enter your test')
        .max(12, 'Test should be less than 12 characters')
        .required('Test is required'),
    }),
    InputField: TextField,
  },
};

export const WithCustomEvents = {
  args: {
    ...Primary.args,
  },
  render: ({ validationSchema, ...args }) => {
    const formik = useFormik({
      initialValues: {
        test: args.defaultValue,
        secondary: 'Secondary Default Value',
      },
      validationSchema,
    });

    const handleChange = (e) => {
      const { name } = e.target;
      const formikValue = formik.values[name];
      action('custom-changed')(formikValue);
    };
    const handleBlur = (e) => {
      const { name } = e.target;
      const formikValue = formik.values[name];
      action('custom-blurred')(formikValue);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <FormikField
          formik={formik}
          onChange={handleChange}
          onBlur={handleBlur}
          {...args}
        />
        <FormikField
          formik={formik}
          name="secondary"
          testId="test-id-2"
          label="Secondary Field"
          placeholder="Secondary Placeholder"
          InputField={TextField}
        />
        <Button onClick={() => formik.handleSubmit()} color="primary">
          Submit Form
        </Button>
        <Button onClick={() => formik.resetForm()}>
          Reset Form
        </Button>
      </div>
    );
  },
};

export const FormikSelectField = {
  args: {
    ...Primary.args,
    InputField: SelectField,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    validationSchema: yup.object({
      test: yup
        .string('Enter your test')
        .notOneOf(['option1', 'option2'], 'That one is not allowed, sorry')
        .required('Test is required'),
    }),
  },
};

export const MultipleSelectField = {
  args: {
    ...Primary.args,
    InputField: SelectField,
    multiple: true,
    checkbox: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: ['option1', 'option2', 'option3'],
    validationSchema: yup.object({
      test: yup.array().of(yup.string())
        .min(1, 'Please select at least one option')
        .max(2, 'You can select a maximum of two options'),
    }),
  },
};
