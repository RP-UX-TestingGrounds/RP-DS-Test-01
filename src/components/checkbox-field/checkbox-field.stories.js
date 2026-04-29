import React from 'react';
import { action } from 'storybook/actions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../button';
import FormikField from '../formik-field';
import CheckboxField from '.';

export default {
  title: 'Components/Inputs/CheckboxField',
  tags: ['autodocs'],
  component: CheckboxField,
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
    label: 'Accept terms and conditions',
    name: 'terms',
    testId: 'terms-checkbox',
  },
};

export const Checked = {
  args: {
    checked: true,
    disabled: false,
    label: 'I agree',
    name: 'agree',
    testId: 'agree-checkbox',
  },
};

export const Disabled = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checkbox',
    name: 'disabled',
    testId: 'disabled-checkbox',
  },
};

export const Indeterminate = {
  args: {
    checked: true,
    disabled: false,
    indeterminate: true,
    label: 'Partially selected',
    name: 'partial',
    testId: 'partial-checkbox',
  },
};

export const WithError = {
  args: {
    checked: false,
    disabled: false,
    error: true,
    helperText: 'You must accept the terms to continue',
    label: 'Accept terms',
    name: 'terms',
    testId: 'error-checkbox',
  },
};

export const WithHelperText = {
  args: {
    checked: false,
    disabled: false,
    helperText: 'Check this box to receive notifications',
    label: 'Subscribe to newsletter',
    name: 'subscribe',
    testId: 'helper-checkbox',
  },
};

export const LabelStart = {
  args: {
    checked: false,
    disabled: false,
    label: 'Label on the left',
    labelPlacement: 'start',
    name: 'label-start',
    testId: 'label-start-checkbox',
  },
};

export const WithChangeHandler = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked || false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
      action('changed')(event.target.checked);
    };

    return (
      <CheckboxField
        {...args}
        checked={checked}
        onChange={handleChange}
      />
    );
  },
  args: {
    checked: false,
    label: 'Interactive checkbox',
    name: 'interactive',
    testId: 'interactive-checkbox',
  },
};

export const WithFormik = {
  render: ({ defaultValue, validationSchema, ...args }) => {
    const formik = useFormik({
      initialValues: {
        agreeToTerms: defaultValue,
        subscribeNewsletter: false,
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
          InputField={CheckboxField}
          {...args}
        />
        <FormikField
          formik={formik}
          InputField={CheckboxField}
          name="subscribeNewsletter"
          testId="subscribe-newsletter"
          label="Subscribe to newsletter"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <Button onClick={() => formik.handleSubmit()} color="primary">
            Submit Form
          </Button>
          <Button onClick={() => formik.resetForm()}>
            Reset Form
          </Button>
        </div>
      </div>
    );
  },
  args: {
    defaultValue: false,
    label: 'I agree to the terms and conditions',
    name: 'agreeToTerms',
    testId: 'agree-to-terms',
    validationSchema: yup.object({
      agreeToTerms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
  },
};

export const MultipleCheckboxes = {
  render: () => {
    const [values, setValues] = React.useState({
      option1: false,
      option2: true,
      option3: false,
    });

    const handleChange = (name) => (event) => {
      setValues({
        ...values,
        [name]: event.target.checked,
      });
      action('changed')({ name, checked: event.target.checked });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <CheckboxField
          checked={values.option1}
          label="Option 1"
          name="option1"
          onChange={handleChange('option1')}
          testId="option1-checkbox"
        />
        <CheckboxField
          checked={values.option2}
          label="Option 2"
          name="option2"
          onChange={handleChange('option2')}
          testId="option2-checkbox"
        />
        <CheckboxField
          checked={values.option3}
          label="Option 3"
          name="option3"
          onChange={handleChange('option3')}
          testId="option3-checkbox"
        />
      </div>
    );
  },
};
