import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import IconButton from './index';

describe('IconButton', () => {
  afterEach(cleanup);

  function renderComponent(props = {}) {
    const {
      children = <span>Test Icon</span>,
      ...rest
    } = props;

    return render(
      <IconButton
        {...rest}
      >
        {children}
      </IconButton>,
    );
  }

  describe('IconButton', () => {
    it('should render with default props', () => {
      const { getByRole } = renderComponent();
      const button = getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle user interactions', () => {
      const handleClick = jest.fn();
      const { getByRole } = renderComponent({
        onClick: handleClick,
      });

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle prop changes', () => {
      const { rerender, getByRole } = renderComponent({
        color: 'primary',
      });

      const button = getByRole('button');
      expect(button).toBeInTheDocument();

      rerender(
        <IconButton color="error">
          <span>Test Icon</span>
        </IconButton>,
      );

      expect(button).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = renderComponent({
        children: <span>Custom Icon</span>,
      });
      expect(getByText('Custom Icon')).toBeInTheDocument();
    });
  });

  describe('IconButton props', () => {
    it('should handle testId prop', () => {
      const { getByTestId } = renderComponent({
        testId: 'test-button',
      });
      expect(getByTestId('test-button')).toBeInTheDocument();
    });

    it('should handle color prop', () => {
      const { getByRole } = renderComponent({
        color: 'primary',
      });
      const button = getByRole('button');
      expect(button).toHaveStyle({
        '--color-main': 'var(--primary-main)',
        '--color-light': 'var(--primary-light)',
        '--color-dark': 'var(--primary-dark)',
      });
    });

    it('should handle className prop', () => {
      const { getByRole } = renderComponent({
        className: 'custom-class',
      });
      const button = getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should handle disabled prop', () => {
      const { getByRole } = renderComponent({
        disabled: true,
      });
      const button = getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should handle onClick prop', () => {
      const handleClick = jest.fn();
      const { getByRole } = renderComponent({
        onClick: handleClick,
      });

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('IconButton functionality', () => {
    it('should apply custom style variables for different colors', () => {
      const { getByRole, rerender } = renderComponent({
        color: 'primary',
      });
      let button = getByRole('button');
      expect(button).toHaveStyle({
        '--color-main': 'var(--primary-main)',
        '--color-light': 'var(--primary-light)',
        '--color-dark': 'var(--primary-dark)',
      });

      rerender(
        <IconButton color="error">
          <span>Test Icon</span>
        </IconButton>,
      );
      button = getByRole('button');
      expect(button).toHaveStyle({
        '--color-main': 'var(--error-main)',
        '--color-light': 'var(--error-light)',
        '--color-dark': 'var(--error-dark)',
      });
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      const { getByRole } = renderComponent({
        onClick: handleClick,
        disabled: true,
      });

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should render without testId when not provided', () => {
      const { getByRole } = renderComponent();
      const button = getByRole('button');
      expect(button).not.toHaveAttribute('data-test-id');
    });

    it('should render with testId when provided', () => {
      const { getByRole } = renderComponent({
        testId: 'custom-test-id',
      });
      const button = getByRole('button');
      expect(button).toHaveAttribute('data-test-id', 'custom-test-id');
    });

    it('should handle multiple className values', () => {
      const { getByRole } = renderComponent({
        className: 'class1 class2',
      });
      const button = getByRole('button');
      expect(button).toHaveClass('class1', 'class2');
    });
  });
});
