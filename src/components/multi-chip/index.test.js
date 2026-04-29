import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import MultiChip from '.';

describe('MultiChip', () => {
  afterEach(cleanup);

  beforeAll(() => {
    document.documentElement.style.setProperty('--multi-chip-min-height', '3.5rem');
    document.documentElement.style.setProperty('--multi-chip-max-height', '13.5rem');
  });

  const items = [
    { id: 1, label: 'Nissan: D0206-4Z81CNW' },
    { id: 2, label: 'Toyota: A2300-33X' },
  ];

  function renderComponent(props = {}) {
    return render(
      <MultiChip
        items={items}
        testId="test-id"
        {...props}
      />,
    );
  }

  it('should render chips correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Nissan: D0206-4Z81CNW')).toBeInTheDocument();
    expect(getByText('Toyota: A2300-33X')).toBeInTheDocument();
  });

  it('should render the correct number of chips', () => {
    const { container } = renderComponent();
    const chips = container.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBe(2);
  });

  it('should handle delete action', () => {
    const onDelete = jest.fn();

    const { container } = renderComponent({ onDelete });

    const deleteIcons = container.querySelectorAll('.MuiChip-deleteIcon');

    fireEvent.click(deleteIcons[0]);

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('should render container with list role', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('list')).toBeInTheDocument();
  });
});
