import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Animation from '.';

jest.mock('react-lottie', () => {
  // eslint-disable-next-line react/prop-types
  return function Lottie({ width, isClickToPauseDisabled, ...props }) {
    return (
      <div
        data-test-id="lottie-animation"
        data-width={width}
        data-is-click-to-pause-disabled={isClickToPauseDisabled}
        {...props}
      />
    );
  };
});

describe('Animation', () => {
  afterEach(cleanup);

  it('renders a Lottie animation with correct animation data', () => {
    const { getByTestId } = render(<Animation name="aiLoader" />);

    const lottieElement = getByTestId('lottie-animation');
    expect(lottieElement).toBeInTheDocument();
  });

  it('renders nothing when invalid name is passed', () => {
    // Suppress console error for this test since we're testing invalid prop
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Animation name="nonexistent-animation" />);

    expect(container.firstChild).toBeNull();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('applies custom width correctly', () => {
    const { getByTestId } = render(<Animation name="aiLoader" width={48} />);

    const lottieElement = getByTestId('lottie-animation');
    expect(lottieElement).toHaveAttribute('data-width', '48');
  });

  it('uses default width when not specified', () => {
    const { getByTestId } = render(<Animation name="aiLoader" />);

    const lottieElement = getByTestId('lottie-animation');
    expect(lottieElement).toHaveAttribute('data-width', '24');
  });

  it('applies additional props passed in to the animation component', () => {
    const { getByTestId } = render(
      <Animation
        name="aiLoader"
        className="custom-animation"
        data-test-id="test-animation"
        style={{ margin: '10px' }}
      />,
    );

    const lottieElement = getByTestId('test-animation');
    expect(lottieElement).toHaveClass('custom-animation');
    expect(lottieElement).toHaveAttribute('data-test-id', 'test-animation');
    expect(lottieElement).toHaveStyle({ margin: '10px' });
  });
});
