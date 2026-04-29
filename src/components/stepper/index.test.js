import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stepper from './index';

describe('Stepper', () => {
  const steps = ['Step One', 'Step Two', 'Step Three'];

  afterEach(cleanup);

  function renderComponent(props = {}) {
    const { activeStep = 0, ...rest } = props;
    return render(
      <Stepper
        activeStep={activeStep}
        steps={steps}
        {...rest}
      />,
    );
  }

  it('should render all step labels', () => {
    const { getByText } = renderComponent();
    steps.forEach((label) => expect(getByText(label)).toBeInTheDocument());
  });

  it('should apply the correct state classes to each step label', () => {
    const { getByText } = renderComponent({ activeStep: 1 });
    expect(getByText('Step One')).toHaveClass('Mui-completed');
    expect(getByText('Step Two')).toHaveClass('Mui-active');
    expect(getByText('Step Three')).toHaveClass('Mui-disabled');
  });
});
