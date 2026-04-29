import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Tooltip from './index';

describe('Tooltip', () => {
  it('renders info icon', () => {
    const { container } = render(<Tooltip title="Help text" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const { container, getByText } = render(
      <Tooltip title="This is the tooltip" />,
    );

    const icon = container.querySelector('svg');
    await act(async () => {
      fireEvent.mouseOver(icon);
    });

    await waitFor(() => {
      expect(getByText('This is the tooltip')).toBeInTheDocument();
    });
  });

  it('renders with testId when provided', () => {
    const { container } = render(
      <Tooltip testId="kpi-tooltip-1" title="Help" />,
    );

    expect(container.querySelector('[data-test-id="kpi-tooltip-1"]')).toBeInTheDocument();
  });
});
