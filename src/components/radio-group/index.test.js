import { render, fireEvent, cleanup } from '@testing-library/react';
import RadioGroup from './index';
import RadioField from '../radio-field';

afterEach(() => {
  cleanup();
});

describe('RadioGroup', () => {
  it('renders group label', () => {
    const { getByText } = render(
      <RadioGroup name="discount" label="Discount Type">
        <RadioField value="auto" label="Automatic" />
      </RadioGroup>,
    );

    expect(getByText('Discount Type')).toBeInTheDocument();
  });

  it('handles selection change', () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <RadioGroup name="discount" onChange={handleChange}>
        <RadioField value="auto" label="Automatic" />
      </RadioGroup>,
    );

    fireEvent.click(getByLabelText('Automatic'));
    expect(handleChange).toHaveBeenCalled();
  });
});
