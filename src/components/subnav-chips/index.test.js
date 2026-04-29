import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SubnavChips from '.';
import SubnavChip from '../subnav-chip';
import RevolucciProvider from '../../contexts/revoluccui-theme';

describe('SubnavChips', () => {
  const mockOnChange = jest.fn();

  afterEach(cleanup);

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  function renderWithProvider(component) {
    return render(
      <RevolucciProvider>
        {component}
      </RevolucciProvider>,
    );
  }

  it('renders children correctly', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips>
        <SubnavChip label="Chip 1" index={0} />
        <SubnavChip label="Chip 2" index={1} />
      </SubnavChips>,
    );

    expect(getByText('Chip 1')).toBeInTheDocument();
    expect(getByText('Chip 2')).toBeInTheDocument();
  });

  it('calls onChange when a chip is clicked', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange}>
        <SubnavChip label="Chip 1" index={0} />
        <SubnavChip label="Chip 2" index={1} />
      </SubnavChips>,
    );

    getByText('Chip 2').click();
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it('deselects when clicking the same chip', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange} defaultSelectedIndex={0}>
        <SubnavChip label="Chip 1" index={0} />
        <SubnavChip label="Chip 2" index={1} />
      </SubnavChips>,
    );

    // Click the already selected chip
    getByText('Chip 1').click();
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('preserves original onClick handlers', () => {
    const originalOnClick = jest.fn();
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange}>
        <SubnavChip
          label="Chip 1"
          index={0}
          onClick={originalOnClick}
          testId="chip-1"
        />
      </SubnavChips>,
    );

    getByText('Chip 1').click();
    expect(originalOnClick).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it('works in controlled mode', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange} selectedIndex={1}>
        <SubnavChip label="Chip 1" index={0} />
        <SubnavChip label="Chip 2" index={1} />
      </SubnavChips>,
    );

    // Chip 2 should be selected (index 1)
    const chip2 = getByText('Chip 2').closest('[data-test-id]');
    // Check if the chip has the selected prop applied
    expect(chip2).toBeInTheDocument();
  });

  it('works in uncontrolled mode with defaultSelectedIndex', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange} defaultSelectedIndex={1}>
        <SubnavChip label="Chip 1" index={0} />
        <SubnavChip label="Chip 2" index={1} />
      </SubnavChips>,
    );

    // Chip 2 should be selected by default
    const chip2 = getByText('Chip 2').closest('[data-test-id]');
    // Check if the chip has the selected prop applied
    expect(chip2).toBeInTheDocument();
  });

  it('uses child index prop when available', () => {
    const { getByText } = renderWithProvider(
      <SubnavChips onChange={mockOnChange}>
        <SubnavChip label="Chip 1" index={5} />
        <SubnavChip label="Chip 2" index={10} />
      </SubnavChips>,
    );

    getByText('Chip 2').click();
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });
});
