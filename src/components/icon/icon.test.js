import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Icon from '.';
import { SVG_ICONS } from './icon-constants';

describe('Icon', () => {
  afterEach(cleanup);

  it('renders an SVG element with correct icon data', () => {
    const { container } = render(<Icon name="account" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Let's verify that we rendered the correct icon according to the SVG configuration
    expect(svg).toHaveAttribute('viewBox', SVG_ICONS.account.viewBox);

    const paths = svg.querySelectorAll('path');
    expect(paths).toHaveLength(SVG_ICONS.account.paths.length);

    expect(paths[0]).toHaveAttribute('d', SVG_ICONS.account.paths[0].d);
  });

  it('renders nothing when invalid name is passed', () => {
    // Suppress console error for this test since we're  testing invalid prop
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Icon name="nonexistent-icon" />);

    expect(container.firstChild).toBeNull();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('applies custom width and height correctly', () => {
    const { container } = render(<Icon name="account" width={48} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('applies custom fill color to paths', () => {
    const customFill = '#ff0000';
    const { container } = render(<Icon name="account" fill={customFill} />);

    const svg = container.querySelector('svg');
    const paths = svg.querySelectorAll('path');

    // Check that paths without their own fill use the custom fill
    paths.forEach((path) => {
      const pathData = SVG_ICONS.account.paths.find((p) => p.d === path.getAttribute('d'));
      if (!pathData.fill) {
        expect(path).toHaveAttribute('fill', customFill);
      } else {
        expect(path).toHaveAttribute('fill', pathData.fill);
      }
    });
  });

  it('applies additional props passed in to the icon component', () => {
    const { container } = render(
      <Icon
        name="account"
        className="custom-icon"
        data-test-id="test-icon"
        style={{ margin: '10px' }}
      />,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-icon');
    expect(svg).toHaveAttribute('data-test-id', 'test-icon');
    expect(svg).toHaveStyle({ margin: '10px' });
  });
});
