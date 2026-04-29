import React, { useState } from 'react';
import SwitchField from './index';

export default {
  title: 'Components/SwitchField',
  component: SwitchField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper component that combines a Switch with a FormControlLabel. It supports form integration including Formik compatibility and optional tooltip support.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'large'] },
      description: 'The size of the switch component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'large' },
      },
    },
    labelPlacement: {
      control: { type: 'select', options: ['end', 'start', 'top', 'bottom'] },
      description: 'The position of the label.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'end' },
      },
    },
    label: {
      control: 'text',
      description: 'The text displayed next to the switch.',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip displayed when hovering over the label.',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'If `true`, the component is checked.',
    },
    disabled: {
      control: 'boolean',
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute of the input element.',
    },
    testId: {
      control: 'text',
      description: 'Attribute for testing purposes.',
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || false);

  const handleChange = (event) => {
    setValue(event.target.checked);
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return (
    <SwitchField
      {...args}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Enable Feature',
  name: 'default',
  size: 'large',
  value: false,
  testId: 'switch-field-default',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: 'Enable Feature',
  tooltip: 'This enables feature.',
  name: 'with-tooltip',
  size: 'large',
  value: false,
  testId: 'switch-field-tooltip',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Switch',
  size: 'small',
  name: 'small',
  value: false,
  testId: 'switch-field-small',
};

export const LabelStart = Template.bind({});
LabelStart.args = {
  label: 'Label',
  labelPlacement: 'start',
  name: 'label-start',
  size: 'large',
  value: false,
  testId: 'switch-field-start',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Switch',
  disabled: true,
  name: 'disabled',
  size: 'large',
  value: false,
  testId: 'switch-field-disabled',
};

export const WithFormikFieldCompatibility = (args) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return (
    <SwitchField
      {...args}
      value={checked}
      onChange={handleChange}
      label="Formik Compatible"
      name="formik"
      size="large"
    />
  );
};

WithFormikFieldCompatibility.args = {
  testId: 'switch-field-formik',
};
