import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Chip from '.';

describe('Button', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      variant,
      ...rest
    } = props;

    return render(
      <Chip
        variant={variant}
        {...rest}
      />,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
    });
    const chip = getByTestId('test-id');
    expect(chip).toBeInTheDocument();
  });

  it('should handle defaults', () => {
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
      color: 'primary',
    });
    const chip = getByTestId('test-id');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Chip');
    expect(chip.className).toMatch(/filled/i);
    expect(chip.style.getPropertyValue('--color-main')).toBe('var(--primary-main)');
    expect(chip.style.getPropertyValue('--color-light')).toBe('var(--primary-light)');
    expect(chip.style.getPropertyValue('--color-dark')).toBe('var(--primary-dark)');
    expect(chip.style.getPropertyValue('--on-color')).toBe('var(--on-primary)');
    expect(chip.style.getPropertyValue('--on-color-light')).toBe('var(--on-primary-light)');
    expect(chip.style.getPropertyValue('--action-base')).toBe('var(--color-main)');
    expect(chip.style.getPropertyValue('--action-filled-base')).toBe('var(--color-light)');
    expect(chip.style.getPropertyValue('--is-greyscale')).toBe('0');
  });

  it('should recognize greyscale colors', () => {
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
      color: 'default',
    });
    const chip = getByTestId('test-id');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Chip');
    expect(chip.className).toMatch(/filled/i);
    expect(chip.style.getPropertyValue('--color-main')).toBe('var(--default-main)');
    expect(chip.style.getPropertyValue('--color-light')).toBe('var(--default-light)');
    expect(chip.style.getPropertyValue('--color-dark')).toBe('var(--default-dark)');
    expect(chip.style.getPropertyValue('--on-color')).toBe('var(--on-default)');
    expect(chip.style.getPropertyValue('--on-color-light')).toBe('var(--on-default-light)');
    expect(chip.style.getPropertyValue('--action-base')).toBe('var(--color-main)');
    expect(chip.style.getPropertyValue('--action-filled-base')).toBe('var(--color-light)');
    expect(chip.style.getPropertyValue('--is-greyscale')).toBe('1');
  });

  it('should handle contained variant', () => {
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
      variant: 'contained',
    });
    const chip = getByTestId('test-id');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Chip');
    expect(chip.className).toMatch(/filled/i);
    expect(chip.style.getPropertyValue('--action-base')).toBe('var(--color-main)');
    expect(chip.style.getPropertyValue('--action-filled-base')).toBe('var(--color-main)');
    expect(chip.style.getPropertyValue('--is-greyscale')).toBe('1');
  });

  it('should handle onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
      onClick,
    });
    const chip = getByTestId('test-id');
    chip.click();
    expect(onClick).toHaveBeenCalled();
    expect(chip.className).toMatch(/actionable/i);
  });

  it('should handle onDelete', () => {
    const onDelete = jest.fn();
    const { getByTestId } = renderComponent({
      label: 'Chip',
      testId: 'test-id',
      onDelete,
    });
    const chip = getByTestId('test-id');
    const deleteIcon = chip.querySelector('.MuiChip-deleteIcon');
    fireEvent.click(deleteIcon);
    fireEvent.click(chip); // chip is also clickable
    expect(deleteIcon).toBeInTheDocument();
    expect(onDelete).toHaveBeenCalledTimes(2);
    expect(chip.className).toMatch(/actionable/i);
  });
});
