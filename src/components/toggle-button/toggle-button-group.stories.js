import React, { useState } from 'react';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  ViewList,
  ViewModule,
  ViewQuilt,
} from '@mui/icons-material';
import ToggleButtonGroup from './toggle-button-group';
import ToggleButton from './toggle-button';

const sizes = ['small', 'medium', 'large'];

export default {
  title: 'Components/ToggleButtonGroup',
  tags: ['autodocs'],
  component: ToggleButtonGroup,
  argTypes: {
    onChange: { action: 'changed' },
    value: {
      control: 'radio',
      description: 'Currently selected value',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
};

export const Default = {
  args: {
    exclusive: true,
    size: 'medium',
    testId: 'toggle-button-group-test-id',
    value: 'left',
  },
  render: (args) => {
    const [alignment, setAlignment] = useState(args.value);

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
        args.onChange?.(newAlignment);
      }
    };

    return (
      <ToggleButtonGroup
        {...args}
        aria-label="text alignment"
        exclusive
        onChange={handleChange}
        value={alignment}
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRight />
        </ToggleButton>
        <ToggleButton
          value="justify"
          aria-label="justified"
          disabled
        >
          <FormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Multiple = {
  args: {
    exclusive: false,
    size: 'medium',
    testId: 'multiple-toggle-button-group-test-id',
    value: ['bold'],
  },
  argTypes: {
    value: {
      control: 'check',
      description: 'Currently selected values',
      options: ['bold', 'italic', 'underlined'],
    },
  },
  render: (args) => {
    const [formats, setFormats] = useState(args.value);

    const handleChange = (event, newFormats) => {
      setFormats(newFormats);
      args.onChange?.(newFormats);
    };

    return (
      <ToggleButtonGroup
        {...args}
        aria-label="text formatting"
        onChange={handleChange}
        value={formats}
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBold />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalic />
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
          <FormatUnderlined />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Standalone = {
  args: {
    selected: false,
    size: 'medium',
    testId: 'standalone-toggle-button-test-id',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the button is selected',
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selected);

    return (
      <ToggleButton
        {...args}
        onChange={() => {
          setSelected(!selected);
          args.onChange?.(!selected);
        }}
        selected={selected}
        value="check"
      >
        ✓
      </ToggleButton>
    );
  },
};

export const Vertical = {
  args: {
    exclusive: true,
    orientation: 'vertical',
    size: 'medium',
    testId: 'vertical-toggle-button-group-test-id',
    value: 'list',
  },
  argTypes: {
    value: {
      control: 'radio',
      description: 'Currently selected value',
      options: ['list', 'module', 'quilt'],
    },
  },
  render: (args) => {
    const [view, setView] = useState(args.value);

    const handleChange = (event, newView) => {
      if (newView !== null) {
        setView(newView);
        args.onChange?.(newView);
      }
    };

    return (
      <ToggleButtonGroup
        {...args}
        aria-label="view"
        exclusive
        onChange={handleChange}
        orientation="vertical"
        value={view}
      >
        <ToggleButton value="list" aria-label="list">
          <ViewList />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModule />
        </ToggleButton>
        <ToggleButton value="quilt" aria-label="quilt">
          <ViewQuilt />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Sizes = {
  args: {
    exclusive: true,
    testId: 'sizes-toggle-button-group-test-id',
    value: 'left',
  },
  argTypes: {
    value: {
      control: 'radio',
      description: 'Currently selected value',
      options: ['left', 'center', 'right'],
    },
  },
  render: (args) => {
    const [alignment, setAlignment] = useState(args.value);

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sizes.map((size) => (
          <ToggleButtonGroup
            {...args}
            aria-label={`${size} sizes`}
            exclusive
            key={size}
            onChange={handleChange}
            size={size}
            value={alignment}
          >
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        ))}
      </div>
    );
  },
};

export const PreservesTextCasing = {
  render: () => (
    <ToggleButtonGroup>
      <ToggleButton value="true">TRUE</ToggleButton>
      <ToggleButton value="false">false</ToggleButton>
    </ToggleButtonGroup>
  ),
};
