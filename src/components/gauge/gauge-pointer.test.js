import React from 'react';
import { render } from '@testing-library/react';
import GaugePointer from './gauge-pointer';

describe('GaugePointer', () => {
  const defaultProps = {
    actualCx: 100,
    actualCy: 100,
    currentAngle: 45,
    arcRadius: 50,
  };

  it('renders correctly', () => {
    const { container } = render(
      <svg>
        <GaugePointer {...defaultProps} />
      </svg>,
    );
    // Check for rotation in transform: 45 - 40 = 5
    const group = container.querySelector('g');
    expect(group.getAttribute('transform')).toContain('translate(100, 100) rotate(5)');

    expect(container.querySelector('path')).toBeTruthy();
    expect(container.querySelector('circle')).toBeTruthy();
  });
});
