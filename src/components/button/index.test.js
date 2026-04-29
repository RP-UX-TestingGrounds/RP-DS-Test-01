import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Button from '.';

describe('Button', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      variant,
      ...rest
    } = props;

    return render(
      <Button
        variant={variant}
        {...rest}
      />,
    );
  }

  it('renders without crashing', () => {
    const { getByRole } = renderComponent({
      children: 'Download',
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Download');
  });

  it('should handle defaults', () => {
    const { getByRole } = renderComponent({
      children: 'Download',
      color: 'primary',
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Download');
    expect(button.className).toMatch(/primary/i);
    expect(button.style.getPropertyValue('--color-main')).toBe('var(--primary-main)');
    expect(button.style.getPropertyValue('--action-base')).toBe('var(--color-main)');
  });

  it('function should be called when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = renderComponent({
      children: 'Download',
      onClick: handleClick,
    });
    const button = getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
