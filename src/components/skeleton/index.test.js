import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Skeleton from '.';

describe('Skeleton', () => {
  afterEach(cleanup);

  it('renders with testId', () => {
    const { container } = render(
      <Skeleton testId="test-skeleton" />,
    );
    expect(container.querySelector('[data-test-id="test-skeleton"]')).toBeInTheDocument();
  });

  it.each([
    ['text'],
    ['circular'],
    ['rectangular'],
    ['rounded'],
  ])('renders %s variant', (variant) => {
    const { container } = render(
      <Skeleton
        testId="skeleton"
        variant={variant}
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element.className).toMatch(new RegExp(variant, 'i'));
  });

  it.each([
    ['wave'],
    ['pulse'],
  ])('renders %s animation', (animation) => {
    const { container } = render(
      <Skeleton
        animation={animation}
        testId="skeleton"
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element.className).toMatch(new RegExp(animation, 'i'));
  });

  it('renders without animation when false', () => {
    const { container } = render(
      <Skeleton
        animation={false}
        testId="skeleton"
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element.className).not.toMatch(/wave|pulse/i);
  });

  it.each([
    [300, 100, '300px', '100px'],
    ['100%', '50px', '100%', '50px'],
  ])('applies width %s and height %s', (width, height, expectedWidth, expectedHeight) => {
    const { container } = render(
      <Skeleton
        height={height}
        testId="skeleton"
        width={width}
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element).toHaveStyle({ height: expectedHeight, width: expectedWidth });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Skeleton
        className="custom-class"
        testId="skeleton"
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element.className).toContain('custom-class');
  });

  it('applies sx prop', () => {
    const { container } = render(
      <Skeleton
        sx={{ fontSize: '2rem' }}
        testId="skeleton"
      />,
    );
    const element = container.querySelector('[data-test-id="skeleton"]');
    expect(element).toHaveStyle({ fontSize: '2rem' });
  });
});
