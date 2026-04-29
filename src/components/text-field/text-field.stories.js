import React from 'react';
import { Search, Clear } from '@mui/icons-material';
import { action } from 'storybook/actions';

import TextField from '.';

export default {
  title: 'Components/Inputs/TextField',
  tags: ['autodocs'],
  component: (args) => (
    <TextField
      {...args}
    />
  ),
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
  slotProps: {
    description: 'Props applied to the text field (htmlInput, input, inputLabel).',
    table: {
      type: {
        summary: 'object',
        htmlInput: 'object',
        input: 'object',
        inputLabel: 'object',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onClear: {
    description: 'Callback fired when the clear icon is clicked. Makes the end icon clickable.',
    table: {
      type: {
        summary: 'function',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  startIcon: {
    description: 'Icon to be displayed at the start of the text field',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
    control: {
      type: 'radio',
      labels: {
        none: 'None',
        person: 'Person',
      },
    },
  },
  type: {
    description: 'The type of the input element. It should be a valid HTML5 input type.',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'text',
      },
    },
    options: ['text', 'password', 'number', 'date', 'time', 'email'],
    control: {
      type: 'select',
      labels: {
        text: 'Text',
        password: 'Password',
        number: 'Number',
        date: 'Date',
        time: 'Time',
        email: 'Email',
      },
    },
  },
  variant: {
    description: 'The variant to use for the text field.',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'filled',
      },
    },
    options: ['filled', 'outlined'],
    control: {
      type: 'select',
      labels: {
        filled: 'Filled',
        outlined: 'Outlined',
      },
    },
  },
  size: {
    description: 'The size of the text field.',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'normal',
      },
    },
    options: ['normal', 'small'],
    control: {
      type: 'select',
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
  slotProps: {
    htmlInput: {},
  },
  label: 'Label',
  name: 'text-field-name',
  onClear: undefined,
  placeholder: 'Placeholder',
  required: false,
  startIcon: undefined,
  testId: 'test-id',
  type: 'text',
  variant: 'filled',
  size: 'normal',
};

export const Primary = {
  args: {
    ...args,
    defaultValue: 'Default Value',
    helperText: 'Helper Text',
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

export const Outlined = {
  args: {
    ...args,
    variant: 'outlined',
    label: null,
  },
  argTypes: {
    ...documentation,
  },
};

export const Disabled = {
  args: {
    ...args,
    disabled: true,
    value: 'Disabled Value',
  },
  argTypes: {
    ...documentation,
  },
};

export const Small = {
  args: {
    ...args,
    size: 'small',
  },
  argTypes: {
    ...documentation,
  },
};
export const WithError = {
  args: {
    ...args,
    error: true,
    value: 'Error Value',
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
  },
  argTypes: {
    ...documentation,
  },
};

export const WithIcon = {
  args: {
    ...args,
    icon: <Search />,
  },
};

export const WithStartIcon = {
  args: {
    ...args,
    startIcon: <Search />,
    placeholder: 'Enter your name',
    variant: 'outlined',
    label: null,
  },
};

export const WithClearableIcon = {
  args: {
    ...args,
    icon: <Clear />,
    onClear: action('onClear'),
    placeholder: 'Click the X to clear',
    label: null,
  },
  argTypes: {
    ...documentation,
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

export const DateField = {
  args: {
    ...args,
    label: 'ETA',
    slotProps: {
      htmlInput: {
        min: '2025-01-01',
        max: '2026-01-01',
      },
    },
    type: 'date',
  },
  argTypes: {
    ...documentation,
  },
};

export const TimeField = {
  args: {
    ...args,
    label: 'Delivery Time',
    type: 'time',
  },
  argTypes: {
    ...documentation,
  },
};

export const NumberField = {
  args: {
    ...args,
    label: 'Quantity',
    slotProps: {
      htmlInput: {
        min: 0,
        max: 10,
        step: 2,
      },
    },
    placeholder: 'Placeholder',
    type: 'number',
  },
  argTypes: {
    ...documentation,
  },
};

export const Password = {
  args: {
    ...args,
    label: 'Password',
    type: 'password',
  },
  argTypes: {
    ...documentation,
  },
};

export const Email = {
  args: {
    ...args,
    label: 'Email',
    autoComplete: 'email',
    slotProps: {
      htmlInput: {
        maxLength: 254,
      },
    },
    placeholder: 'example@email.com',
    type: 'email',
  },
  argTypes: {
    ...documentation,
  },
};
