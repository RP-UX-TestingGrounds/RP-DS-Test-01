import React from 'react';
import SVG from '.';

import { svgs } from './svgs';

export default {
  title: 'Components/SVG',
  tags: ['autodocs'],
  component: (args) => (
    <div
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid var(--secondary-color)',
        padding: '0 1rem 2rem 1rem',
      }}
    >
      <p>This box has a width/height of 300px</p>

      <SVG {...args} />
    </div>
  ),
};

const documentation = {
  testId: {
    description: 'Test ID for the SVG component',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
    control: {
      type: 'text',
    },
  },
  fill: {
    description: 'Fill color of the SVG icon',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'currentColor',
      },
    },
    control: {
      type: 'color',
    },
  },
  svg: {
    description: 'SVG icon name',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'text',
      },
    },
    options: Object.keys(svgs),
    control: {
      type: 'select',
    },
  },
  width: {
    description: 'Width of the SVG icon',
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'auto',
      },
    },
    control: {
      type: 'number',
    },
  },
};

export const Default = {
  args: {
    testId: 'default-badge',
    svg: 'partsInOrbit',
  },
  argTypes: {
    ...documentation,
  },
};

export const WithWidth = {
  args: {
    testId: 'default-badge',
    svg: 'partsInOrbit',
    width: 100,
  },
  argTypes: {
    ...documentation,
  },
};

export const WithFillColor = {
  args: {
    testId: 'default-badge',
    svg: 'partsInOrbit',
    fill: 'var(--primary-color)',
  },
  argTypes: {
    ...documentation,
  },
};
