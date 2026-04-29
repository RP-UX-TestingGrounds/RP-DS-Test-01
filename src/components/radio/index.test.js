import { render, fireEvent, cleanup } from '@testing-library/react';
import Radio from './index';

afterEach(() => {
  cleanup();
});

describe('Radio', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Radio />);
    expect(getByRole('radio')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Radio onChange={handleChange} />,
    );

    fireEvent.click(getByRole('radio'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled', () => {
    const { getByRole } = render(
      <Radio disabled />,
    );

    expect(getByRole('radio')).toBeDisabled();
  });
});
