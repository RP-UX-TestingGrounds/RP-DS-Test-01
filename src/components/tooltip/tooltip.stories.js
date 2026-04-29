import Tooltip from './index';

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Tooltip content shown on hover',
    },
    testId: {
      control: { type: 'text' },
      description: 'Optional test id for the wrapper',
    },
  },
};

export const Default = {
  args: {
    title: 'This metric has an issue or needs clarification.',
  },
};

export const WithTestId = {
  args: {
    testId: 'kpi-tooltip-demo',
    title: 'Tooltip with test id for testing.',
  },
};
