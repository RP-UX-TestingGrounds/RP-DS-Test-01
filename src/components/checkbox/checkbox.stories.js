import Checkbox, { CHECKBOX_COLORS } from '.';

export default {
  title: 'Components/Inputs/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  argTypes: {
    color: {
      control: 'select',
      options: CHECKBOX_COLORS,
    },
  },
};

export const Default = {
  args: {
    testId: 'default-checkbox',
    disabled: false,
    indeterminate: false,
  },
};

export const Checked = {
  args: {
    testId: 'default-checkbox',
    disabled: false,
    indeterminate: false,
    checked: true,
  },
};

export const Disabled = {
  args: {
    testId: 'default-checkbox',
    disabled: true,
    indeterminate: false,
    checked: true,
  },
};

export const Indeterminate = {
  args: {
    testId: 'default-checkbox',
    disabled: false,
    indeterminate: true,
    checked: true,
  },
};

export const Color = {
  args: {
    testId: 'default-checkbox',
    color: 'primary',
    checked: true,
  },
};
