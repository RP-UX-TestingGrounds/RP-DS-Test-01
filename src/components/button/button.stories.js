import React, { useState } from 'react';
import {
  ChevronRight,
  Done,
  Print,
  ShoppingCart,
  ArrowDownward,
} from '@mui/icons-material';
import { CircularProgress, Skeleton } from '@mui/material';
import Button from '.';

const colors = ['primary', 'inherit', 'error', 'warning', 'success'];
const variants = ['contained', 'outlined', 'text'];
const sizes = ['small', 'medium', 'large'];

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  component: Button,
};

export const Default = {
  args: {
    testId: 'inherit-button-test-id',
    color: 'inherit',
    children: 'Button',
    size: 'medium',
    variant: 'contained',
    disabled: false,
  },
};

export const Contained = {
  args: {
    testId: 'contained-button-test-id',
    color: 'primary',
    children: 'Contained',
    variant: 'contained',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`contained-${size}`}>
            {colors.map((color) => {
              return (
                <Button
                  {...args}
                  size={size}
                  color={color}
                  key={`contained-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Outlined = {
  args: {
    testId: 'outlined-button-test-id',
    color: 'primary',
    children: 'Outlined',
    variant: 'outlined',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`outlined-${size}`}>
            {colors.map((color) => {
              return (
                <Button
                  {...args}
                  size={size}
                  color={color}
                  key={`outlined-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Text = {
  args: {
    testId: 'text-button-test-id',
    color: 'primary',
    children: 'Text',
    variant: 'text',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`text-${size}`}>
            {colors.map((color) => {
              return (
                <Button
                  {...args}
                  size={size}
                  color={color}
                  key={`text-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const WithIconBefore = {
  args: {
    testId: 'with-icon-before-button-test-id',
    color: 'primary',
    children: 'Complete',
    size: 'small',
    icon: <Done />,
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {variants.map((variant) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`variant-button-${variant}`}>
            {colors.map((color) => {
              return (
                <Button
                  {...args}
                  variant={variant}
                  color={color}
                  key={`variant-button-${variant}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const WithIconAfter = {
  args: {
    testId: 'with-icon-after-button-test-id',
    color: 'primary',
    children: 'Print',
    icon: <Print />,
    iconPosition: 'end',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {variants.map((variant) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`variant-button-${variant}`}>
            {colors.map((color) => {
              return (
                <Button
                  {...args}
                  variant={variant}
                  color={color}
                  key={`variant-button-${variant}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const LoginScreen = {
  args: {
    fullWidth: true,
    testId: 'login-screen-test-id',
    color: 'primary',
  },
  render: ({ ...args }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '500px',
        }}
      >
        <Skeleton
          variant="rectangular"
          fullWidth height={50}
        />
        <Skeleton
          variant="rectangular"
          fullWidth height={50}
        />
        {isLoading ? (
          <>
            <Button
              {...args}
              disabled={true}
              icon={<CircularProgress size={16} color="inherit"/>}
            >
              Signing in...
            </Button>
            <Button
              {...args}
              disabled={false}
              variant="text"
              onClick={() => setIsLoading(false)}
            >
              Reset
            </Button>
          </>
        ) : (
          <Button
           {...args}
           icon={<ChevronRight />}
           iconPosition="end"
           onClick={() => setIsLoading(true)}
          >
            Login
          </Button>
        )}
      </div>
    );
  },
};

export const Example = {
  args: {
    testId: 'usage-button-test-id',
    variant: 'contained',
    disabled: false,
    size: 'medium',
  },
  render: ({ ...args }) => {
    const [clickedButton, setClickedButton] = useState('None');
    return (
      <>
        <div
          style={
            {
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }
          }
        >
          <Button
            {...args}
            color="inherit"
            onClick={() => setClickedButton('Default button clicked')}
            icon={<Done />}
          >
            Default
          </Button>
          <Button
            {...args}
            color="primary"
            onClick={() => setClickedButton('Primary button clicked')}
            icon={<ShoppingCart />}
          >
            Primary
          </Button>
          <Button
            {...args}
            color="secondary"
            onClick={() => setClickedButton('Secondary button clicked')}
            icon={<ArrowDownward />}
          >
            Secondary
          </Button>
          <Button
            {...args}
            color="success"
            onClick={() => setClickedButton('Success button clicked')}
          >
            Success
          </Button>
          <Button
            {...args}
            color="error"
            onClick={() => setClickedButton('Error button clicked')}
          >
            Error
          </Button>
          <Button
            {...args}
            color="warning"
            onClick={() => setClickedButton('Warning button clicked')}
          >
            Warning
          </Button>
        </div >
        <p
          style={
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid',
              height: '20rem',
              textAlign: 'center',
              fontSize: '2rem',
            }
          }
        >
          {clickedButton}
        </p>
      </>
    );
  },
};
