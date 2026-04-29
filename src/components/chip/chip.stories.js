import { Done } from '@mui/icons-material';
import Chip from '.';

const chipSizes = ['small', 'medium'];
const chipVariants = ['filled', 'contained', 'outlined'];
const chipColors = ['default', 'primary', 'error', 'warning', 'info', 'success'];

export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  component: Chip,
};

export const Default = {
  args: {
    label: 'Chip',
    size: 'medium',
    variant: 'filled',
    color: 'default',
    disabled: false,
    testId: 'test-id',
    className: '',
    icon: null,
  },
};

export const Filled = {
  args: {
    label: 'Chip',
    variant: 'filled',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipSizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`filled-${size}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  size={size}
                  color={color}
                  key={`filled-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Contained = {
  args: {
    label: 'Chip',
    variant: 'contained',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipSizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`contained-${size}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  size={size}
                  color={color}
                  key={`contained-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Outlined = {
  args: {
    label: 'Chip',
    variant: 'outlined',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipSizes.map((size) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`outlined-${size}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  size={size}
                  color={color}
                  key={`outlined-${size}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Clickable = {
  args: {
    label: 'Chip',
    size: 'small',
    onClick: () => {},
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipVariants.map((variant) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`clickable-${variant}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  variant={variant}
                  color={color}
                  key={`clickable-${variant}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const Deletable = {
  args: {
    label: 'Chip',
    size: 'small',
    onDelete: () => {},
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipVariants.map((variant) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`deletable-${variant}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  variant={variant}
                  color={color}
                  key={`deletable-${variant}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};

export const WithIcon = {
  args: {
    label: 'Chip',
    icon: <Done />,
    size: 'small',
  },
  render: (args) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chipVariants.map((variant) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={`with-icon-${variant}`}>
            {chipColors.map((color) => {
              return (
                <Chip
                  {...args}
                  variant={variant}
                  color={color}
                  key={`with-icon-${variant}-${color}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>);
  },
};
