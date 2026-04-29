import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleButton from './toggle-button';
import RevolucciProvider from '../../contexts/revoluccui-theme';

describe('ToggleButton', () => {
  afterEach(cleanup);

  function renderWithProvider(props) {
    return {
      user: userEvent.setup(),
      ...render(
        <RevolucciProvider>
          <ToggleButton {...props} />
        </RevolucciProvider>,
      ),
    };
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderWithProvider({
      testId: 'default-toggle-button',
      value: 'test',
      children: 'Toggle',
    });

    expect(getByTestId('default-toggle-button')).toBeInTheDocument();
    expect(getByTestId('default-toggle-button')).toHaveTextContent('Toggle');
  });

  it('should handle defaults', () => {
    const { getByTestId } = renderWithProvider({
      testId: 'default-toggle-button',
      value: 'test',
      children: 'Toggle',
      color: 'primary',
    });

    const button = getByTestId('default-toggle-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiToggleButton-root');
  });

  it('function should be called when button is clicked', async () => {
    const handleChange = jest.fn();
    const { getByTestId, user } = renderWithProvider({
      testId: 'onchange-toggle-button',
      value: 'test',
      children: 'Toggle',
      onChange: handleChange,
    });

    const button = getByTestId('onchange-toggle-button');
    await user.click(button);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports selected state', () => {
    const { getByTestId } = renderWithProvider({
      testId: 'selected-toggle-button',
      value: 'test',
      children: 'Toggle',
      selected: true,
    });

    const button = getByTestId('selected-toggle-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Mui-selected');
  });

  it('supports disabled state', () => {
    const { getByTestId } = renderWithProvider({
      testId: 'disabled-toggle-button',
      value: 'test',
      children: 'Toggle',
      disabled: true,
    });

    const button = getByTestId('disabled-toggle-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Mui-disabled');
  });

  it('supports different sizes', () => {
    const sizes = ['small', 'medium', 'large'];

    sizes.forEach((size) => {
      const { getByTestId, unmount } = renderWithProvider({
        testId: `toggle-button-${size}`,
        value: 'test',
        children: 'Toggle',
        size,
      });

      const button = getByTestId(`toggle-button-${size}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(`MuiToggleButton-size${size.charAt(0).toUpperCase() + size.slice(1)}`);
      unmount();
    });
  });

  it('supports different colors', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'success', 'info', 'default', 'inherit'];

    colors.forEach((color) => {
      const { getByTestId, unmount } = renderWithProvider({
        testId: `toggle-button-${color}`,
        value: 'test',
        children: 'Toggle',
        color,
      });

      const button = getByTestId(`toggle-button-${color}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('MuiToggleButton-root');
      unmount();
    });
  });

  it('applies custom className', () => {
    const { getByTestId } = renderWithProvider({
      testId: 'custom-class-toggle-button',
      value: 'test',
      children: 'Toggle',
      className: 'custom-class',
    });

    const button = getByTestId('custom-class-toggle-button');
    expect(button).toHaveClass('custom-class');
  });
});
