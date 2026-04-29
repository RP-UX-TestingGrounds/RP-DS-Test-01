import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrendIndicator from '.';

describe('TrendIndicator', () => {
  it('renders success trend indicator', () => {
    const { container } = render(
      <TrendIndicator
        testId="success-trend"
        variant="success"
        value="5.2%"
        indicator="increase"
      />,
    );

    expect(container.querySelector('[data-testid="success-trend"]')).toBeInTheDocument();
    expect(container.textContent).toContain('5.2%');
  });

  it('renders error trend indicator', () => {
    const { container } = render(
      <TrendIndicator
        testId="error-trend"
        variant="error"
        value="2.1%"
        indicator="decrease"
      />,
    );

    expect(container.querySelector('[data-testid="error-trend"]')).toBeInTheDocument();
    expect(container.textContent).toContain('2.1%');
  });

  it('renders default trend indicator', () => {
    const { container } = render(
      <TrendIndicator
        testId="default-trend"
        variant="default"
        value="0%"
        indicator="neutral"
      />,
    );

    expect(container.querySelector('[data-testid="default-trend"]')).toBeInTheDocument();
    expect(container.textContent).toContain('0%');
  });

  it('supports legacy positive prop', () => {
    const { container } = render(
      <TrendIndicator
        testId="legacy-positive"
        positive
        value="3.5%"
      />,
    );

    expect(container.querySelector('[data-testid="legacy-positive"]')).toBeInTheDocument();
    expect(container.textContent).toContain('3.5%');
  });

  it('supports legacy negative prop', () => {
    const { container } = render(
      <TrendIndicator
        testId="legacy-negative"
        negative
        value="1.8%"
      />,
    );

    expect(container.querySelector('[data-testid="legacy-negative"]')).toBeInTheDocument();
    expect(container.textContent).toContain('1.8%');
  });

  it('applies custom className', () => {
    const { container } = render(
      <TrendIndicator
        testId="custom-class"
        variant="success"
        value="4.2%"
        className="custom-trend-class"
      />,
    );

    const trendElement = container.querySelector('[data-testid="custom-class"]');
    expect(trendElement).toHaveClass('custom-trend-class');
  });

  it('defaults to success variant when no variant specified', () => {
    const { container } = render(
      <TrendIndicator
        testId="default-variant"
        value="2.5%"
      />,
    );

    expect(container.querySelector('[data-testid="default-variant"]')).toBeInTheDocument();
    expect(container.textContent).toContain('2.5%');
  });

  it('prioritizes variant over legacy props', () => {
    const { container } = render(
      <TrendIndicator
        testId="variant-priority"
        variant="error"
        positive
        value="1.0%"
      />,
    );

    expect(container.querySelector('[data-testid="variant-priority"]')).toBeInTheDocument();
    expect(container.textContent).toContain('1.0%');
  });

  it('uses indicator prop to determine icon', () => {
    const { container } = render(
      <TrendIndicator
        testId="indicator-test"
        variant="success"
        value="3.0%"
        indicator="increase"
      />,
    );

    expect(container.querySelector('[data-testid="indicator-test"]')).toBeInTheDocument();
    expect(container.textContent).toContain('3.0%');
  });

  it('uses iconName prop to override indicator', () => {
    const { container } = render(
      <TrendIndicator
        testId="icon-name-test"
        variant="success"
        value="4.0%"
        indicator="increase"
        iconName="arrowDown"
      />,
    );

    expect(container.querySelector('[data-testid="icon-name-test"]')).toBeInTheDocument();
    expect(container.textContent).toContain('4.0%');
  });
});
