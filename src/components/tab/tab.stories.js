import React from 'react';
import Tab from '.';

export default {
  title: 'Components/Tab',
  tags: ['autodocs'],
  component: (args) => (
    <Tab {...args} />
  ),
};

export const Primary = {
  args: {
    label: 'Tab Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    selected: false,
    disabled: false,
  },
};

export const Selected = {
  args: {
    label: 'Tab Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    selected: true,
  },
};

export const Disabled = {
  args: {
    label: 'Tab Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    disabled: true,
  },
};

export const WithBadge = {
  args: {
    label: 'Tab Content',
    badge: '33+',
    index: 1,
    testId: 'test-id',
  },
};
