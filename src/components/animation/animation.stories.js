import React from 'react';
import isChromatic from 'chromatic/isChromatic';
import Animation from '.';
import ANIMATIONS from './animation-constants';

export default {
  title: 'Components/Animation',
  tags: ['autodocs'],
  component: Animation,
  parameters: {
    docs: {
      description: {
        component: 'A flexible Animation component that renders Lottie animations. Choose from the available animations using the name prop.',
      },
    },
  },
};

const documentation = {
  name: {
    description: 'Animation name from our supported animation set',
    table: {
      type: {
        summary: 'string',
      },
    },
    options: Object.keys(ANIMATIONS),
    control: {
      type: 'select',
    },
  },
  width: {
    description: 'Width of the animation',
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '100',
      },
    },
    control: {
      type: 'number',
    },
  },
};

export const Default = {
  args: {
    name: 'aiLoader',
    width: 300,
    autoplay: !isChromatic(),
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
    width: 200,
    autoplay: !isChromatic(),
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
      {Object.keys(ANIMATIONS).map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Animation
            name={iconName}
            width={args.width}
            autoplay={args.autoplay}
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
    name: 'aiLoader',
    width: 300,
    fill: 'var(--primary-main)',
    style: { marginLeft: '5em', padding: '2em 1em', border: '1px dashed #ccc' },
    className: 'custom-icon',
    autoplay: !isChromatic(),
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
      <Animation
        name={args.name}
        width={args.width}
        autoplay={args.autoplay}
        className={args.className}
        style={args.style}
      />
    </div>
  ),
};
