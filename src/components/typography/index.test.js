import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Typography, {
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_TYPES,
  TYPOGRAPHY_TYPE_SIZE_PAIRS,
} from '.';

describe('Typography', () => {
  afterEach(cleanup);

  it('exports type/size constants for consumers', () => {
    expect(TYPOGRAPHY_TYPES).toEqual(['body', 'heading', 'title']);
    expect(TYPOGRAPHY_SIZES).toEqual(['lg', 'md', 'sm']);
    expect(TYPOGRAPHY_TYPE_SIZE_PAIRS).toEqual([
      { type: 'body', size: 'md' },
      { type: 'body', size: 'sm' },
      { type: 'heading', size: 'md' },
      { type: 'heading', size: 'sm' },
      { type: 'title', size: 'lg' },
      { type: 'title', size: 'md' },
      { type: 'title', size: 'sm' },
    ]);
  });

  it('renders children', () => {
    const { getByText } = render(<Typography>Label text</Typography>);
    expect(getByText('Label text')).toBeInTheDocument();
  });

  it('uses span as default component', () => {
    const { getByText } = render(<Typography>Inline</Typography>);
    expect(getByText('Inline').tagName).toBe('SPAN');
  });

  it('respects component prop', () => {
    const { getByText } = render(<Typography component="h2">Heading</Typography>);
    const el = getByText('Heading');
    expect(el.tagName).toBe('H2');
  });

  it('forwards id, role, and aria-level', () => {
    const { getByRole } = render(
      <Typography
        aria-level={3}
        component="h3"
        id="tax-title"
        role="heading"
        type="heading"
        size="md"
      >
        Title
      </Typography>,
    );
    const el = getByRole('heading', { name: 'Title' });
    expect(el).toHaveAttribute('id', 'tax-title');
    expect(el).toHaveAttribute('aria-level', '3');
  });

  it('renders each allowed type/size pair without error', () => {
    TYPOGRAPHY_TYPE_SIZE_PAIRS.forEach(({ type, size }) => {
      const { getByText, unmount } = render(
        <Typography type={type} size={size}>
          {type}
          -
          {size}
        </Typography>,
      );
      expect(getByText(`${type}-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies the same styles as body/md when type/size pair is invalid', () => {
    const { getByText, rerender } = render(
      <Typography type="body" size="md">
        Compare
      </Typography>,
    );
    const bodyMdFont = 'var(--typography-body-md-font-family)';
    expect(getByText('Compare')).toHaveStyle({ fontFamily: bodyMdFont });
    rerender(
      <Typography type="body" size="lg">
        Compare
      </Typography>,
    );
    expect(getByText('Compare')).toHaveStyle({ fontFamily: bodyMdFont });
  });
});
