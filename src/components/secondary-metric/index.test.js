import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryMetric from './index';

describe('SecondaryMetric', () => {
  it('renders secondary metric with value only', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-value-only"
        value="$25K"
      />,
    );

    expect(container.querySelector('[data-test-id="secondary-metric-value-only"]')).toBeInTheDocument();
    expect(container.textContent).toContain('$25K');
  });

  it('renders secondary metric with value and label', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-with-label"
        value="$25K"
        label="Secondary"
      />,
    );

    expect(container.querySelector('[data-test-id="secondary-metric-with-label"]')).toBeInTheDocument();
    expect(container.textContent).toContain('$25K');
    expect(container.textContent).toContain('Secondary');
  });

  it('renders with different value formats', () => {
    const { rerender, container } = render(
      <SecondaryMetric
        testId="secondary-metric-percentage"
        value="85%"
        label="Growth"
      />,
    );

    expect(container.textContent).toContain('85%');
    expect(container.textContent).toContain('Growth');

    rerender(
      <SecondaryMetric
        testId="secondary-metric-number"
        value="1,234"
        label="Orders"
      />,
    );

    expect(container.textContent).toContain('1,234');
    expect(container.textContent).toContain('Orders');
  });

  it('applies custom className', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-custom-class"
        value="$50K"
        label="Custom"
        className="custom-secondary-class"
      />,
    );

    const metricElement = container.querySelector('[data-test-id="secondary-metric-custom-class"]');
    expect(metricElement).toHaveClass('custom-secondary-class');
  });

  it('renders without label when not provided', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-no-label"
        value="$100K"
      />,
    );

    expect(container.textContent).toContain('$100K');
    // Should not render any label text
    expect(container.textContent).not.toContain('Secondary');
  });

  it('handles empty string label', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-empty-label"
        value="$75K"
        label=""
      />,
    );

    expect(container.textContent).toContain('$75K');
  });

  it('handles long values and labels', () => {
    const { container } = render(
      <SecondaryMetric
        testId="secondary-metric-long"
        value="$1,234,567.89"
        label="Very Long Secondary Metric Label"
      />,
    );

    expect(container.textContent).toContain('$1,234,567.89');
    expect(container.textContent).toContain('Very Long Secondary Metric Label');
  });
});
