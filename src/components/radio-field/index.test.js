import { render } from '@testing-library/react';
import RadioField from './index';

const renderComponent = (props = {}) => (
  render(
    <RadioField
      value="automatic"
      label="Automatic"
      helperText="Automatically applied"
      testId="radio"
      {...props}
    />,
  )
);

describe('RadioField', () => {
  it('renders label and helper text', () => {
    const { getByText } = renderComponent();

    expect(getByText('Automatic')).toBeInTheDocument();
    expect(
      getByText('Automatically applied'),
    ).toBeInTheDocument();
  });
});
