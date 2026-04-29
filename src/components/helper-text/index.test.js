import { cleanup, render } from '@testing-library/react';

import HelperText from '.';

describe('HelperText', () => {
  afterEach(cleanup);

  it('renders text when text prop is provided', () => {
    const { getByText } = render(<HelperText text="Helper message" />);

    expect(getByText('Helper message')).toBeInTheDocument();
  });

  it('renders children when children is provided', () => {
    const { getByText } = render(
      <HelperText>
        <span>Child content</span>
      </HelperText>,
    );

    expect(getByText('Child content')).toBeInTheDocument();
  });

  it('prefers text prop over children when both are provided', () => {
    const { getByText, queryByText } = render(
      <HelperText text="From text prop">
        Child content
      </HelperText>,
    );

    expect(getByText('From text prop')).toBeInTheDocument();
    expect(queryByText('Child content')).not.toBeInTheDocument();
  });

  it('returns null when neither text nor children is provided', () => {
    const { container } = render(<HelperText />);

    expect(container.firstChild).toBeNull();
  });

  it('returns null when text is empty string and no children', () => {
    const { container } = render(<HelperText text="" />);

    expect(container.firstChild).toBeNull();
  });

  it('renders when error is true', () => {
    const { getByText } = render(<HelperText error text="Error message" />);

    expect(getByText('Error message')).toBeInTheDocument();
  });

  it('renders with disableMargin without throwing', () => {
    const { getByText } = render(
      <HelperText disableMargin text="No margin" />,
    );

    expect(getByText('No margin')).toBeInTheDocument();
  });
});
