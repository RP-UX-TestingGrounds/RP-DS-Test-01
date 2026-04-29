import React from 'react';
import Checkbox from '../checkbox';
import FormControlLabel from '.';

export default {
  title: 'Components/Inputs/FormControlLabel',
  tags: ['autodocs'],
  component: FormControlLabel,
};

export const Default = {
  args: {
    control: <Checkbox />,
    label: 'Default Checkbox',
    labelPlacement: 'end',
    testId: 'default-checkbox',
  },
};

export const LabelStart = {
  args: {
    control: <Checkbox />,
    label: 'Label on the left',
    labelPlacement: 'start',
    testId: 'label-start-checkbox',
  },
};

export const LabelTop = {
  args: {
    control: <Checkbox />,
    label: 'Label on top',
    labelPlacement: 'top',
    testId: 'label-top-checkbox',
  },
};

export const LabelBottom = {
  args: {
    control: <Checkbox />,
    label: 'Label on bottom',
    labelPlacement: 'bottom',
    testId: 'label-bottom-checkbox',
  },
};

export const FullWidth = {
  args: {
    control: <Checkbox />,
    fullWidth: true,
    label: 'Full width checkbox field',
    testId: 'full-width-checkbox',
  },
  render: (args) => (
    <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
      <FormControlLabel {...args} />
    </div>
  ),
};

export const FullWidthComparison = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Default (auto width)</h3>
        <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Auto width"
            testId="auto-width"
          />
        </div>
      </div>
      <div>
        <h3>Full Width</h3>
        <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
          <FormControlLabel
            control={<Checkbox />}
            fullWidth={true}
            label="Full width"
            testId="full-width"
          />
        </div>
      </div>
    </div>
  ),
};
