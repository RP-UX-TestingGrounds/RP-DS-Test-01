import React from 'react';
import {
  Print,
} from '@mui/icons-material';
import IconButton from '.';

const colors = ['primary', 'default', 'error', 'warning', 'success'];
const sizes = ['small', 'medium', 'large'];

export default {
  title: 'Components/IconButton',
  tags: ['autodocs'],
  component: (args) => {
    return (
      <IconButton {...args}>
        <Print />
      </IconButton>
    );
  },
};

export const Default = {
  args: {
    testId: 'primary-button-test-id',
    color: 'primary',
    children: 'Button',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
    color: {
      control: 'select',
      options: colors,
    },
  },
};

export const Colors = {
  args: {
    testId: 'contained-button-test-id',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`contained-${size}`}>
            {colors.map((color) => {
              return (
                <IconButton
                  {...args}
                  size={size}
                  color={color}
                  key={`contained-${size}-${color}`}
                >
                  <Print />
                </IconButton>
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};
