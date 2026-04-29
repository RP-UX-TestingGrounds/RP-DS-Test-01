import React, { Fragment } from 'react';
import { Flare, Search } from '@mui/icons-material';

import SelectField from '.';
import MenuItem from './menu-item';

export default {
  title: 'Components/Inputs/SelectField',
  tags: ['autodocs'],
  component: ({
    open,
    ...args
  }) => {
    return (
      <SelectField
        open={open}
        {...args}
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="default">Default Value</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </SelectField>
    );
  },
};

const documentation = {
  autoComplete: {
    description: `Used to [autocomplete form values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).`,
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'off',
      },
    },
  },
  autoFocus: {
    description: 'If `true`, the input will be focused during the first mount.',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  icon: {
    description: 'Icon to be displayed in the text field',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
    options: ['none', 'search'],
    mapping: {
      none: undefined,
      search: <Search />,
    },
    control: {
      type: 'radio',
      labels: {
        none: 'None',
        search: 'Search',
      },
    },
  },
  inputProps: {
    description: 'Props applied to the input element.',
    table: {
      type: {
        summary: 'object',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const args = {
  autoComplete: 'off',
  autoFocus: false,
  defaultValue: '',
  disabled: false,
  error: false,
  helperText: undefined,
  icon: undefined,
  id: 'text-field-id',
  inputProps: {},
  label: 'Label',
  name: 'text-field-name',
  portal: true,
  required: false,
  testId: 'test-id',
};

export const Primary = {
  args: {
    ...args,
    helperText: 'Helper Text',
    defaultValue: 'default',
  },
  argTypes: {
    ...documentation,
  },
};

export const Uncontrolled = {
  args: {
    ...args,
  },
  argTypes: {
    ...documentation,
  },
};

export const Disabled = {
  args: {
    ...args,
    disabled: true,
  },
  argTypes: {
    ...documentation,
  },
};

export const WithError = {
  args: {
    ...args,
    error: true,
    helperText: 'Helper Text',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithoutLabel = {
  args: {
    ...args,
    label: undefined,
    defaultValue: 'default',
  },
  argTypes: {
    ...documentation,
  },
};

export const Multiple = {
  args: {
    ...args,
    label: 'Label',
    multiple: true,
    checkbox: false,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
      { value: 'option6', label: 'Option 6' },
      { value: 'option7', label: 'Option 7' },
      { value: 'option8', label: 'Option 8' },
      { value: 'option9', label: 'Option 9' },
      { value: 'option10', label: 'Option 10' },
    ],
    defaultValue: ['option1', 'option2', 'option3'],
  },
  argTypes: {
    ...documentation,
  },
};

export const MultipleCheckbox = {
  args: {
    ...args,
    label: 'Label',
    multiple: true,
    checkbox: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
      { value: 'option6', label: 'Option 6' },
      { value: 'option7', label: 'Option 7' },
      { value: 'option8', label: 'Option 8' },
      { value: 'option9', label: 'Option 9' },
      { value: 'option10', label: 'Option 10' },
    ],
    defaultValue: ['option1', 'option2', 'option3'],
  },
  argTypes: {
    ...documentation,
  },
};

export const MultipleChip = {
  args: {
    ...args,
    label: 'Label',
    multiple: true,
    chip: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ],
    defaultValue: ['option1', 'option2', 'option3'],
  },
  argTypes: {
    ...documentation,
  },
};

const manyOptions = Array.from({ length: 60 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

export const MultipleChipWithMaxDisplayRows = {
  args: {
    ...args,
    label: 'Brand / Category (many options)',
    multiple: true,
    chip: true,
    maxDisplayRows: 4,
    options: manyOptions,
    defaultValue: manyOptions.slice(0, 8).map((o) => o.value),
    helperText: 'Selection area shows up to 4 rows of chips then scrolls. Use maxDisplayRows to prevent overflow in modals.',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithOptions = {
  args: {
    ...args,
    defaultValue: 'option2',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: (<Fragment><Flare />&nbsp; Option 2</Fragment>) },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const WithHelperText = {
  args: {
    ...args,
    helperText: 'Helper Text',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithHighlightedOption = {
  args: {
    ...args,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Admin-only option (example)', highlighted: true },
    ],
    defaultValue: undefined,
  },
  argTypes: {
    ...documentation,
  },
};

export const WithDisabledOption = {
  args: {
    ...args,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
    ],
    defaultValue: 'option1',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithMenuMaxHeight = {
  args: {
    ...args,
    label: 'Brand (menu height limited)',
    menuMaxHeight: 200,
    options: manyOptions,
    defaultValue: 'option-1',
    helperText: 'Use menuMaxHeight to cap dropdown height (e.g. in modals). Shown here with 200px.',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithPortalFalse = {
  args: {
    ...args,
    label: 'Select in modal context',
    portal: false,
    options: manyOptions.slice(0, 10),
    defaultValue: 'option-1',
    helperText: 'Use portal={false} when the select is inside a modal so the menu stacks correctly. Default portal={true} keeps keyboard ArrowUp/ArrowDown working (see MUI #34218).',
  },
  argTypes: {
    ...documentation,
  },
};

export const MenuMaxHeightAndPortalFalse = {
  args: {
    ...args,
    label: 'Brand / Category (modal-style)',
    portal: false,
    menuMaxHeight: 300,
    multiple: true,
    chip: true,
    options: manyOptions.slice(0, 20),
    defaultValue: ['option-1', 'option-2'],
    helperText: 'Modal usage: portal={false} + menuMaxHeight. Pass maxDisplayRows to cap the chip area height.',
  },
  argTypes: {
    ...documentation,
  },
};
