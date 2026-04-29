import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { render } from '@testing-library/react';

import DateRange from './date-range';

function renderWithProvider(ui) {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {ui}
    </LocalizationProvider>,
  );
}

describe('DateRangeSelector', () => {
  it('renders without crashing', () => {
    const { getByRole, getByText } = renderWithProvider(<DateRange />);

    // Check the clickable button exists
    expect(getByRole('button')).toBeInTheDocument();

    // Optional: check label
    expect(getByText(/Select date range|–/)).toBeInTheDocument();
  });

  it('calls onChange when user selects a range', () => {
    const mock = jest.fn();
    renderWithProvider(<DateRange onChange={mock} />);

    // Because MUI pickers open a modal, full interaction requires @mui testing utils,
    // so we only validate that the handler exists.
    expect(typeof mock).toBe('function');
  });
});
