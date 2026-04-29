import React from 'react';
import Spinner from './index';

export default {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: ({
    ...args
  }) => {
    return (
      <Spinner
        {...args}
      />
    );
  },
};

export const Small = {
  args: {
    size: 'small',
  },
};

export const Medium = {
  args: {
    size: 'medium',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};

export const Huge = {
  args: {
    size: 'huge',
  },
};
