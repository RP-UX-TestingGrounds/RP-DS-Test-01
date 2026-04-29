import React, { useState } from 'react';
import Switch from './index';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A switch component for toggling a single setting on or off. Based on MUI Switch.',
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
      description: 'The size of the component. `small` is equivalent to dense padding.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'large' },
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
      },
      description: 'The color of the component. It supports both default and custom theme colors.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'If `true`, the component is checked.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state. Use when the component is not controlled.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If `true`, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the state is changed.',
      table: {
        type: { summary: 'func' },
      },
    },
    value: {
      control: 'text',
      description: 'The value of the component. The DOM API casts this to a string.',
      table: {
        type: { summary: 'any' },
      },
    },
    testId: {
      control: 'text',
      description: 'Attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

const Template = (args) => {
  const [checked, setChecked] = useState(args.checked || false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return <Switch
{...args} checked={checked}
onChange={handleChange}
         />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  testId: 'switch-default',
};

export const Sizes = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px' }}>Large:</span>
        <Switch
          checked={checked}
          onChange={handleChange}
          size="large"
          testId="switch-large"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px' }}>Small:</span>
        <Switch
          checked={checked}
          onChange={handleChange}
          size="small"
          testId="switch-small"
        />
      </div>
    </div>
  );
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'The Switch component comes in two sizes: large (default) and small.',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
  testId: 'switch-disabled',
};

export const Colors = () => {
  const [state, setState] = useState({
    primary: true,
    secondary: true,
    success: true,
    error: true,
    info: true,
    warning: true,
    default: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Primary:</span>
        <Switch
checked={state.primary} onChange={handleChange}
name="primary" color="primary"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Secondary:</span>
        <Switch
checked={state.secondary} onChange={handleChange}
name="secondary" color="secondary"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Success:</span>
        <Switch
checked={state.success} onChange={handleChange}
name="success" color="success"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Error:</span>
        <Switch
checked={state.error} onChange={handleChange}
name="error" color="error"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Info:</span>
        <Switch
checked={state.info} onChange={handleChange}
name="info" color="info"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Warning:</span>
        <Switch
checked={state.warning} onChange={handleChange}
name="warning" color="warning"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Default:</span>
        <Switch
checked={state.default} onChange={handleChange}
name="default" color="default"
        />
      </div>
    </div>
  );
};
Colors.parameters = {
  docs: {
    description: {
      story: 'The Switch component comes with different color variations matching the theme palette.',
    },
  },
};
