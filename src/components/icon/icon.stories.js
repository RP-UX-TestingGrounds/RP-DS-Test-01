import React from 'react';
import Icon from '.';
import { SVG_ICONS } from './icon-constants';

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'A flexible Icon component that renders SVG icons. Choose from the available icons using the name prop.',
      },
    },
  },
};

const documentation = {
  name: {
    description: 'Icon name from our supported icon set',
    table: {
      type: {
        summary: 'string',
      },
    },
    options: Object.keys(SVG_ICONS),
    control: {
      type: 'select',
    },
  },
  width: {
    description: 'Width of the icon (height will match width for square icons)',
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '24',
      },
    },
    control: {
      type: 'number',
    },
  },
  fill: {
    description: 'Fill color of the icon',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'var(--primary-main)',
      },
    },
    control: {
      type: 'color',
    },
  },
};

export const Default = {
  args: {
    name: 'account',
    width: 24,
    fill: 'var(--primary-main)',
  },
  argTypes: {
    ...documentation,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive story where you can change the icon name, size, and color.',
      },
    },
  },
};

export const IconGallery = {
  args: {
    width: 24,
    fill: 'var(--primary-main)',
  },
  argTypes: {
    ...documentation,
    name: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {Object.keys(SVG_ICONS).map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Icon
            name={iconName}
            width={args.width}
            fill={args.fill}
          />
          <span style={{ fontSize: '1rem', textAlign: 'center' }}>
            {iconName}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A grid showing all available icons with their default styling and names.',
      },
    },
  },
};

export const WithCustomProps = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how additional props (className, style, etc.) are passed through via the ...rest spread operator.',
      },
    },
  },
  args: {
    name: 'messages',
    width: 24,
    fill: 'var(--primary-main)',
    style: { marginLeft: '5em', padding: '2em 1em', border: '1px dashed #ccc' },
    className: 'custom-icon',
  },
  argTypes: {
    style: {
      control: {
        type: 'object',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
    ...documentation,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <p>Icon with custom class name and style props</p>
      <Icon
        name={args.name}
        width={args.width}
        fill={args.fill}
        className={args.className}
        style={args.style}
      />
    </div>
  ),
};
