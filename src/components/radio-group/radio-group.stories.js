import RadioGroup from '.';
import RadioField from '../radio-field';

export default {
  title: 'Components/Inputs/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'RadioGroup that groups multiple RadioField components together. It supports vertical and horizontal layouts, optional group labels, helper text, error states.',
      },
    },
  },
};

export const Vertical = () => (
  <RadioGroup
    name="exampleVertical"
    label="Choose an Option"
    helperText="Please select one option from the group"
  >
    <RadioField value="option1" label="Option 1" />
    <RadioField value="option2" label="Option 2" />
  </RadioGroup>
);

export const Horizontal = () => (
  <RadioGroup
    name="exampleHorizontal"
    label="Select an Option"
    row
    helperText="Please select one option from the group"
  >
    <RadioField value="option1" label="Option 1" />
    <RadioField value="option2" label="Option 2" />
  </RadioGroup>
);

export const VerticalWithOptionHelperText = () => (
  <RadioGroup
    name="exampleVerticalOptions"
    label="Choose an Option"
  >
    <RadioField
      value="option1"
      label="Option 1"
      helperText="Helper text for option 1"
    />
    <RadioField
      value="option2"
      label="Option 2"
      helperText="Helper text for option 2"
    />
  </RadioGroup>
);

export const HorizontalWithOptionHelperText = () => (
  <RadioGroup
    name="exampleHorizontalOptions"
    label="Select an Option"
    row
  >
    <RadioField
      value="option1"
      label="Option 1"
      helperText="Helper text for option 1"
    />
    <RadioField
      value="option2"
      label="Option 2"
      helperText="Helper text for option 2"
    />
  </RadioGroup>
);
export const VerticalWithLabelOptionHelperAndError = () => (
  <RadioGroup
    name="exampleVerticalFullError"
    label="Choose an Option"
    error
    helperText="This field is required"
  >
    <RadioField
      value="option1"
      label="Option 1"
      helperText="Helper text for option 1"
    />
    <RadioField
      value="option2"
      label="Option 2"
      helperText="Helper text for option 2"
    />
  </RadioGroup>
);
