import React from 'react';
import Gauge from '.';
import gaugeSections from './gauge-sections.json';

export default {
  title: 'Components/Metrics/Gauge',
  tags: ['autodocs'],
  component: Gauge,
  argTypes: {
    activeSegments: {
      control: {
        type: 'range', min: 0, max: 9, step: 1,
      },
    },
    cx: {
      control: 'text',
    },
    cy: {
      control: 'text',
    },
    height: {
      control: 'number',
    },
    innerRadius: {
      control: 'text',
    },
    outerRadius: {
      control: 'text',
    },
    width: {
      control: 'number',
    },
  },
};

export const Default = {
  args: {
    testId: 'default-gauge',
    activeSegments: 5,
    sections: gaugeSections.default,
  },
};

export const FiveSections = {
  args: {
    testId: 'five-sections-gauge',
    activeSegments: 3,
    sections: gaugeSections.fiveSections,
  },
};

export const ThreeSections = {
  args: {
    testId: 'three-sections-gauge',
    activeSegments: 2,
    sections: gaugeSections.threeSections,
  },
};

export const CustomSizesComparison = {
  render: () => (
    <div
style={{
  display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap',
}}
    >
      <div>
        <h3 style={{ fontFamily: 'var(--font-family)', marginBottom: '1rem' }}>400x400</h3>
        <Gauge
          testId="custom-size-gauge"
          activeSegments={6}
          width={400}
          height={400}
          sections={gaugeSections.default}
        />
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-family)', marginBottom: '1rem' }}>220x220 (with 10px margin)</h3>
        <Gauge
          testId="small-gauge"
          activeSegments={5}
          width={220}
          height={220}
          margin={10}
          sections={gaugeSections.default}
        />
      </div>
    </div>
  ),
};

export const FullCircle = {
  args: {
    testId: 'full-circle-gauge',
    activeSegments: 4,
    startAngle: 0,
    endAngle: 360,
    sections: gaugeSections.default,
  },
};

export const LiveUpdate = {
  args: {
    testId: 'live-update-gauge',
    activeSegments: 4,
    sections: gaugeSections.default,
  },
  render: (args) => {
    const [currentSegments, setSegments] = React.useState(args.activeSegments);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setSegments(Math.floor(Math.random() * 10));
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ padding: '40px' }}>
        <Gauge
          {...args}
          activeSegments={currentSegments}
        />
      </div>
    );
  },
};
