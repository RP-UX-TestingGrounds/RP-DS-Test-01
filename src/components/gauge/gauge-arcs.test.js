import React from 'react';
import { render } from '@testing-library/react';
import GaugeArcs from './gauge-arcs';

describe('GaugeArcs', () => {
  const defaultProps = {
    sections: [
      { color: 'red' },
      { color: 'green' },
    ],
    clampedActiveSegments: 1,
    totalSections: 2,
    startAngle: -90,
    totalAngle: 180,
    actualCx: 100,
    actualCy: 100,
    arcRadius: 50,
    gapAngle: 0,
    strokeWidth: 10,
  };

  it('renders correct number of paths', () => {
    const { container } = render(
      <svg>
        <GaugeArcs {...defaultProps} />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(2);
  });

  it('renders segments with their defined colors', () => {
    const { container } = render(
      <svg>
        <GaugeArcs {...defaultProps} />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths[0].getAttribute('stroke')).toBe('red');
    expect(paths[1].getAttribute('stroke')).toBe('green');
  });

  it('handles string color array', () => {
    const props = {
      ...defaultProps,
      sections: ['blue', 'yellow'],
    };
    const { container } = render(
      <svg>
        <GaugeArcs {...props} />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths[0].getAttribute('stroke')).toBe('blue');
    expect(paths[1].getAttribute('stroke')).toBe('yellow');
  });
});
