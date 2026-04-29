import RadioField from './index';

export default {
  title: 'Components/Inputs/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'RadioField is a reusable radio option component that combines a radio input with a label and optional helper text. It supports checked, disabled, and error states.',
      },
    },
  },
};

export const Default = () => (
  <RadioField
    value="option-1"
    label="Option label"
    helperText="Helper text goes here"
  />
);

export const Checked = () => (
  <RadioField
    value="option-1"
    label="Option label"
    helperText="Helper text goes here"
    checked
  />
);

export const Error = () => (
  <RadioField
    value="option-1"
    label="Option label"
    error
    helperText="This field has an error"
  />
);

export const Disabled = () => (
  <RadioField
    value="option-1"
    label="Option label"
    helperText="This option is disabled"
    disabled
  />
);
