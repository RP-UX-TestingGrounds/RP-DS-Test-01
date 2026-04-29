import React from 'react';
import SubnavChip from '.';

export default {
  title: 'Components/SubnavChip',
  tags: ['autodocs'],
  component: (args) => (
    <SubnavChip {...args} />
  ),
};

export const Primary = {
  args: {
    label: 'Chip Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    selected: false,
    disabled: false,
  },
};

export const Selected = {
  args: {
    label: 'Chip Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    selected: true,
  },
};

export const Disabled = {
  args: {
    label: 'Chip Content',
    index: 1,
    testId: 'test-id',
    badge: '',
    disabled: true,
  },
};

export const WithBadge = {
  args: {
    label: 'Chip Content',
    badge: '33+',
    index: 1,
    testId: 'test-id',
    selected: false,
    disabled: false,
  },
};
