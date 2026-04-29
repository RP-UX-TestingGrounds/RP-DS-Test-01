import Radio from './index';

export default {
  title: 'Components/Inputs/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export const Default = () => <Radio />;

export const Checked = () => <Radio checked />;

export const Disabled = () => <Radio disabled />;
