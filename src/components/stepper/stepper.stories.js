import Stepper from '.';

const steps = ['Step One', 'Step Two', 'Step Three'];

export default {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  component: Stepper,
};

export const Default = {
  args: {
    activeStep: 1,
    steps,
    testId: 'stepper-default',
  },
};
