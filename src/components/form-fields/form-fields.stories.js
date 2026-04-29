import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormFields from '.';
import FormSection from '../form-section';
import FormikField from '../formik-field';
import TextField from '../text-field';
import StorySlot from '../../utils/story-slot';
import RadioGroup from '../radio-group';
import RadioField from '../radio-field';

export default {
  title: 'Components/Form/FormFields',
  tags: [],
  component: FormFields,
};

const documentation = {
  children: {
    description: 'Child elements to be arranged horizontally (or vertically on small containers)',
    table: {
      type: {
        summary: 'node',
      },
    },
  },
  className: {
    description: 'Additional CSS class name',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  testId: {
    description: 'Test ID of the form fields container',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
};

export const Default = {
  render: () => (
    <FormFields>
      <StorySlot height="60px">Field 1</StorySlot>
      <StorySlot height="60px">Field 2</StorySlot>
      <StorySlot height="60px">Field 3</StorySlot>
    </FormFields>
  ),
  argTypes: {
    ...documentation,
  },
};

export const TwoFields = {
  render: () => (
    <FormFields>
      <StorySlot height="60px">Field 1</StorySlot>
      <StorySlot height="60px">Field 2</StorySlot>
    </FormFields>
  ),
  argTypes: {
    ...documentation,
  },
};

const WithFormikFieldsComponent = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required('First name is required'),
      lastName: yup
        .string()
        .required('Last name is required'),
    }),
  });

  return (
    <FormFields>
      <FormikField
        formik={formik}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        InputField={TextField}
      />
      <FormikField
        formik={formik}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        InputField={TextField}
      />
    </FormFields>
  );
};

export const WithFormikFields = {
  render: () => <WithFormikFieldsComponent />,
  argTypes: {
    ...documentation,
  },
};

export const ResponsiveBehavior = {
  render: () => (
    <div>
      <p style={{ marginBottom: 'var(--spacing-16)' }}>
        Resize the container below to see the fields stack vertically when its container is narrow (under 500px):
      </p>
      <div
        style={{
          width: '500px',
          height: '10px',
          backgroundColor: 'red',
          marginBottom: 'var(--spacing-16)',
        }}
      />
      <div
        style={{
          resize: 'horizontal',
          overflow: 'auto',
          borderBottom: '2px dashed #ccc',
          paddingBottom: '16px',
          minWidth: '300px',
          maxWidth: '100%',
        }}
      >
        <FormFields>
          <StorySlot height="60px">Field 1</StorySlot>
          <StorySlot height="60px">Field 2</StorySlot>
          <StorySlot height="60px">Field 3</StorySlot>
        </FormFields>
      </div>
    </div>
  ),
  argTypes: {
    ...documentation,
  },
};

const ComplexLayoutComponent = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      addressType: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
      firstName: yup
        .string()
        .required('First name is required'),
      lastName: yup
        .string()
        .required('Last name is required'),
      street: yup
        .string()
        .required('Street is required'),
      city: yup
        .string()
        .required('City is required'),
      state: yup
        .string()
        .required('State is required'),
      zip: yup
        .string()
        .required('ZIP code is required'),
      addressType: yup
        .string()
        .required('Address type is required'),
    }),
  });

  return (
    <FormSection>
      <FormFields>
        <FormSection title="Personal Information" flex={2}>
          <FormikField
            formik={formik}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            InputField={TextField}
          />
          <FormikField
            formik={formik}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            InputField={TextField}
          />
        </FormSection>

        <FormSection title="Billing Address" flex={3}>
          <FormikField
            formik={formik}
            name="street"
            label="Street Address"
            placeholder="Enter your street address"
            InputField={TextField}
          />
          <FormFields>
            <FormikField
              formik={formik}
              name="city"
              label="City"
              placeholder="City"
              InputField={TextField}
            />
            <FormikField
              formik={formik}
              name="state"
              label="State"
              placeholder="State"
              InputField={TextField}
            />
            <FormikField
              formik={formik}
              name="zip"
              label="ZIP"
              placeholder="ZIP"
              InputField={TextField}
            />
          </FormFields>
        </FormSection>
      </FormFields>
      <FormSection title="Shipping Address">
        <FormikField
          formik={formik}
          name="street"
          label="Street Address"
          placeholder="Enter your street address"
          InputField={TextField}
        />
        <FormFields>
          <FormikField
            formik={formik}
            name="city"
            label="City"
            placeholder="City"
            InputField={TextField}
          />
          <FormikField
            formik={formik}
            name="state"
            label="State"
            placeholder="State"
            InputField={TextField}
          />
          <FormikField
            formik={formik}
            name="zip"
            label="ZIP"
            placeholder="ZIP"
            InputField={TextField}
          />
        </FormFields>
      </FormSection>
      <FormSection >
        <RadioGroup
          name="addressType"
          label="Address Type"
          row
          value={formik.values.addressType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.addressType
            && Boolean(formik.errors.addressType)
          }
          helperText={
            formik.touched.addressType && formik.errors.addressType
              ? formik.errors.addressType
              : 'Select address type'
          }
        >
          <RadioField value="residential" label="Residential" />
          <RadioField value="commercial" label="Commercial" />
        </RadioGroup>
      </FormSection>
    </FormSection>
  );
};

export const ComplexLayout = {
  render: () => <ComplexLayoutComponent />,
  argTypes: {
    ...documentation,
  },
};
