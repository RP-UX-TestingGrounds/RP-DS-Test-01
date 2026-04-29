/* eslint-disable react/prop-types */
import React from 'react';

import { useFormik } from 'formik';
import { action } from 'storybook/actions';

import CheckboxField from '../checkbox-field/index';
import SwitchField from '../switch-field/index';

import GroupField from './group-field';

export default {
  title: 'Components/GroupField',
  component: GroupField,
  tags: ['autodocs'],
};

const people = [
  { key: 'gilad', label: 'Gilad Gray' },
  { key: 'jason', label: 'Jason Killian' },
  { key: 'antoine', label: 'Antoine Llorca' },
];

export const Switches = () => {
  const [value, setValue] = React.useState(['jason']);

  return (
    <GroupField
      name="assignees"
      testId="group-switches"
      title="Assign responsibility"
      items={people}
      Component={SwitchField}
      value={value}
      onChange={(val) => {
        setValue(val);
        action('onChange')(val);
      }}
      onBlur={action('onBlur')}
    />
  );
};

export const Checkboxes = () => {
  const [value, setValue] = React.useState(['gilad', 'antoine']);

  return (
    <GroupField
      name="reviewers"
      testId="group-checkboxes"
      title="Select reviewers"
      items={people}
      Component={CheckboxField}
      value={value}
      onChange={setValue}
      onBlur={action('onBlur')}
    />
  );
};

export const DisabledItems = () => {
  const [value, setValue] = React.useState(['gilad']);

  return (
    <GroupField
      name="permissions"
      testId="group-disabled"
      title="Permissions"
      items={[
        { key: 'gilad', label: 'Gilad Gray', disabled: true },
        { key: 'jason', label: 'Jason Killian' },
        { key: 'antoine', label: 'Antoine Llorca' },
      ]}
      Component={SwitchField}
      value={value}
      onChange={setValue}
      onBlur={action('onBlur')}
    />
  );
};

export const WithErrorMessage = () => {
  const [value, setValue] = React.useState(['gilad']);

  return (
    <GroupField
      name="danger"
      testId="group-error"
      title="Assign responsibility"
      items={people}
      Component={SwitchField}
      value={value}
      onChange={setValue}
      onBlur={action('onBlur')}
      error
      helperText="Be careful: this action affects production permissions."
    />
  );
};

export const FormikExample = () => {
  const formik = useFormik({
    initialValues: { reviewers: ['jason'] },
    onSubmit: action('Formik submit'),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GroupField
        name="reviewers"
        testId="formik-group"
        title="Formik controlled field"
        items={people}
        Component={CheckboxField}
        value={formik.values.reviewers}
        onChange={(val) => formik.setFieldValue('reviewers', val)}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.reviewers)}
        helperText={formik.errors.reviewers}
      />

      <pre style={{ marginTop: 16 }}>
        {JSON.stringify(formik.values, null, 2)}
      </pre>
    </form>
  );
};
