import React from 'react';

import {
  Flare,
} from '@mui/icons-material';

import SVG from '../svg';
import EmptyMessage from '.';

export default {
  title: 'Components/EmptyMessage',
  tags: ['autodocs'],
  component: (args) => (
    <EmptyMessage {...args} />
  ),
};

export const Default = {
  args: {
    testId: 'default-badge',
    icon: (
      <SVG
        svg="partsInOrbit"
        width={100}
      />
    ),
    message: 'Nothing to see here. Move along.',
  },
};

export const WithIcon = {
  args: {
    testId: 'default-badge',
    icon: (
      <Flare
        style={{
          fontSize: '100px',
        }}
      />
    ),
    message: 'Nothing to see here. Move along.',
  },
};

export const NoIcon = {
  args: {
    testId: 'default-badge',
    message: 'Nothing to see here. Move along.',
  },
};
