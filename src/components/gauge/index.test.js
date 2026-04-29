import React from 'react';
import { render } from '@testing-library/react';
import Gauge from '.';
import gaugeSections from './gauge-sections.json';

describe('Gauge', () => {
  it('component exists', () => {
    expect(Gauge).toBeDefined();
    expect(typeof Gauge).toBe('function');
  });

  it('throws error when sections prop is missing', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Gauge activeSegments={3} testId="test-gauge" />);
    }).toThrow('Gauge component requires sections prop with at least one section');

    consoleError.mockRestore();
  });

  it('validates sections configuration exists', () => {
    expect(gaugeSections.default).toBeDefined();
    expect(gaugeSections.default.length).toBe(9);
    expect(gaugeSections.threeSections).toBeDefined();
    expect(gaugeSections.threeSections.length).toBe(3);
  });
});
