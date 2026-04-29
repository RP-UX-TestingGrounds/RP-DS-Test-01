import { action } from 'storybook/actions';

import SearchTextField from '.';

export default {
  title: 'Components/Inputs/SearchTextField',
  tags: ['autodocs'],
  component: SearchTextField,
};

const documentation = {
  onClear: {
    description: 'Callback fired when the clear icon is clicked. When provided, shows a clear icon.',
    table: {
      type: {
        summary: 'function',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  placeholder: {
    description: 'Placeholder text for the search input.',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  testId: {
    description: 'Test ID for the search input component.',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  size: {
    description: 'The size of the search input field.',
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
      labels: {
        normal: 'normal',
        small: 'small',
      },
    },
  },
};

const args = {
  placeholder: 'Search...',
  testId: 'search-text-field',
  size: 'normal',
};

export const Primary = {
  args: {
    ...args,
  },
  argTypes: {
    ...documentation,
  },
};

export const WithClear = {
  args: {
    ...args,
    onClear: action('onClear'),
    placeholder: 'Search products...',
  },
  argTypes: {
    ...documentation,
  },
};

export const Disabled = {
  args: {
    ...args,
    disabled: true,
    placeholder: 'Search disabled...',
  },
  argTypes: {
    ...documentation,
  },
};
