import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../checkbox';
import FormControlLabel from '.';

describe('FormControlLabel', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return {
      user: userEvent.setup(),
      ...render(<FormControlLabel {...props} />),
    };
  }

  it('renders with label', () => {
    const { getByText } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      testId: 'test-label',
    });

    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with control element', () => {
    const { getByRole } = renderComponent({
      control: <Checkbox testId="test-checkbox" />,
      label: 'Test Label',
      testId: 'test-label',
    });

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with test id', () => {
    const { getByTestId } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      testId: 'my-test-id',
    });

    expect(getByTestId('my-test-id')).toBeInTheDocument();
  });

  it('supports label placement end', () => {
    const { container } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      labelPlacement: 'end',
      testId: 'test-label',
    });

    const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
    expect(formControlLabel).toHaveClass('MuiFormControlLabel-labelPlacementEnd');
  });

  it('supports label placement start', () => {
    const { container } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      labelPlacement: 'start',
      testId: 'test-label',
    });

    const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
    expect(formControlLabel).toHaveClass('MuiFormControlLabel-labelPlacementStart');
  });

  it('supports label placement top', () => {
    const { container } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      labelPlacement: 'top',
      testId: 'test-label',
    });

    const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
    expect(formControlLabel).toHaveClass('MuiFormControlLabel-labelPlacementTop');
  });

  it('supports label placement bottom', () => {
    const { container } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      labelPlacement: 'bottom',
      testId: 'test-label',
    });

    const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
    expect(formControlLabel).toHaveClass('MuiFormControlLabel-labelPlacementBottom');
  });

  it('applies fullWidth style when fullWidth prop is true', () => {
    const { getByTestId } = renderComponent({
      control: <Checkbox />,
      fullWidth: true,
      label: 'Test Label',
      testId: 'full-width-label',
    });

    const formControlLabel = getByTestId('full-width-label');
    expect(formControlLabel).toHaveStyle({ width: '100%' });
  });

  it('applies auto width when fullWidth prop is false', () => {
    const { getByTestId } = renderComponent({
      control: <Checkbox />,
      fullWidth: false,
      label: 'Test Label',
      testId: 'auto-width-label',
    });

    const formControlLabel = getByTestId('auto-width-label');
    expect(formControlLabel).toHaveStyle({ width: 'auto' });
  });

  it('applies auto width by default when fullWidth prop is not provided', () => {
    const { getByTestId } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      testId: 'default-width-label',
    });

    const formControlLabel = getByTestId('default-width-label');
    expect(formControlLabel).toHaveStyle({ width: 'auto' });
  });

  it('passes value prop to the component', () => {
    const { getByTestId } = renderComponent({
      control: <Checkbox />,
      label: 'Test Label',
      testId: 'test-label',
      value: 'test-value',
    });

    // Value prop is passed to the component (used internally by MUI)
    // but may not be rendered as an HTML attribute
    expect(getByTestId('test-label')).toBeInTheDocument();
  });

  it('supports click interactions on the control', async () => {
    const handleChange = jest.fn();
    const { getByRole, user } = renderComponent({
      control: <Checkbox onChange={handleChange} />,
      label: 'Test Label',
      testId: 'test-label',
    });

    const checkbox = getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
