import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '../button';
import FormSection from '.';
import FormSubsection from '../form-subsection';
import FormikField from '../formik-field';
import TextField from '../text-field';
import StorySlot from '../../utils/story-slot';

export default {
  title: 'Components/Form/FormSection',
  tags: [],
  component: FormSection,
};

const documentation = {
  children: {
    description: 'Child elements to be stacked vertically within the section',
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
    description: 'Test ID of the form section',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  title: {
    description: 'Optional title for the section (creates semantic grouping)',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Personal Information',
  },
  render: (args) => (
    <FormSection {...args}>
      <StorySlot height="60px">Field 1</StorySlot>
      <StorySlot height="60px">Field 2</StorySlot>
      <StorySlot height="60px">Field 3</StorySlot>
    </FormSection>
  ),
  argTypes: {
    ...documentation,
  },
};

export const WithoutTitle = {
  render: () => (
    <FormSection>
      <StorySlot height="60px">Field 1</StorySlot>
      <StorySlot height="60px">Field 2</StorySlot>
      <StorySlot height="60px">Field 3</StorySlot>
    </FormSection>
  ),
  argTypes: {
    ...documentation,
  },
};

const WithFormikFieldsComponent = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
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
    }),
  });

  return (
    <FormSection title="Personal Information">
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
      <FormikField
        formik={formik}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        InputField={TextField}
      />
    </FormSection>
  );
};

export const WithFormikFields = {
  render: () => <WithFormikFieldsComponent />,
  argTypes: {
    ...documentation,
  },
};

/**
 * Use `FormSubsection` as a child when part of the section needs a title + actions on one row and its own body.
 * Omit it when a vertical stack of fields is enough.
 */
export const WithOptionalFormSubsection = {
  name: 'With optional FormSubsection',
  render: () => (
    <FormSection title="Settings group" testId="form-section-with-subsection">
      <StorySlot height="44px">FormFields, copy, or other blocks</StorySlot>
      <FormSubsection
        testId="subsection-example"
        title="Subsection with toolbar"
        actions={(
          <Button
            variant="outlined"
            color="primary"
            size="small"
            testId="subsection-add"
          >
            Add
          </Button>
        )}
      >
        <StorySlot height="52px">Body: list, MultiChip, table, etc.</StorySlot>
      </FormSubsection>
    </FormSection>
  ),
  argTypes: {
    ...documentation,
  },
};
