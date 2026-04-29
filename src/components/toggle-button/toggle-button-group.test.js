import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleButtonGroup from './toggle-button-group';
import ToggleButton from './toggle-button';
import RevolucciProvider from '../../contexts/revoluccui-theme';

describe('ToggleButtonGroup', () => {
  const mockOnChange = jest.fn();

  afterEach(cleanup);

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  function renderWithProvider(component) {
    return {
      user: userEvent.setup(),
      ...render(
        <RevolucciProvider>
          {component}
        </RevolucciProvider>,
      ),
    };
  }

  it('renders children correctly', () => {
    const { getByText } = renderWithProvider(
      <ToggleButtonGroup testId="test-group">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(getByText('Left')).toBeInTheDocument();
    expect(getByText('Right')).toBeInTheDocument();
  });

  it('calls onChange when a button is clicked in exclusive mode', async () => {
    const { getByText, user } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        exclusive
        onChange={mockOnChange}
        value="left"
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>,
    );

    await user.click(getByText('Right'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), 'right');
  });

  it('calls onChange when a button is clicked in multiple mode', async () => {
    const { getByText, user } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        exclusive={false}
        onChange={mockOnChange}
        value={['bold']}
      >
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
      </ToggleButtonGroup>,
    );

    await user.click(getByText('Italic'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), expect.arrayContaining(['bold', 'italic']));
  });

  it('passes color and size props to children', () => {
    const { getByTestId } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        color="secondary"
        size="large"
      >
        <ToggleButton value="left" testId="child-button">Left</ToggleButton>
      </ToggleButtonGroup>,
    );

    const childButton = getByTestId('child-button');
    expect(childButton).toBeInTheDocument();
    expect(childButton).toHaveClass('MuiToggleButton-sizeLarge');
  });

  it('supports horizontal orientation', () => {
    const { getByTestId } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        orientation="horizontal"
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>,
    );

    const group = getByTestId('test-group');
    expect(group).toBeInTheDocument();
    expect(group).not.toHaveClass('MuiToggleButtonGroup-vertical');
  });

  it('supports vertical orientation', () => {
    const { getByTestId } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        orientation="vertical"
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>,
    );

    const group = getByTestId('test-group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass('MuiToggleButtonGroup-vertical');
  });

  it('supports different sizes', () => {
    const sizes = ['small', 'medium', 'large'];

    sizes.forEach((size) => {
      const { getByTestId, unmount } = renderWithProvider(
        <ToggleButtonGroup
          testId={`test-group-${size}`}
          size={size}
        >
          <ToggleButton value="left">Left</ToggleButton>
        </ToggleButtonGroup>,
      );

      const group = getByTestId(`test-group-${size}`);
      expect(group).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    const { getByTestId } = renderWithProvider(
      <ToggleButtonGroup
        testId="test-group"
        className="custom-class"
      >
        <ToggleButton value="left">Left</ToggleButton>
      </ToggleButtonGroup>,
    );

    const group = getByTestId('test-group');
    expect(group).toHaveClass('custom-class');
  });
});
