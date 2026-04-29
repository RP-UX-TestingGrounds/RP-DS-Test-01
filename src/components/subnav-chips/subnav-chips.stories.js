import React, { useState } from 'react';

import SubnavChips from '.';
import SubnavChip from '../subnav-chip';

export default {
  title: 'Components/SubnavChips',
  tags: ['autodocs'],
  component: SubnavChips,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  argTypes: {
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
  },
};

// Controlled component example
function ControlledSubnavChips(args) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (newIndex) => {
    setSelectedIndex(newIndex);
    const log = (newIndex === null) ? 'deselected' : newIndex;
    args.onChange?.(log);
  };

  return (
    <SubnavChips onChange={handleChange} selectedIndex={selectedIndex}>
      <SubnavChip label="All" index={0} />
      <SubnavChip label="Active" index={1} />
      <SubnavChip label="Completed" index={2} />
      <SubnavChip label="Archived" index={3} />
    </SubnavChips>
  );
}

// Uncontrolled component example
function UncontrolledSubnavChips(args) {
  const handleChange = (newIndex) => {
    const log = (newIndex === null) ? 'deselected' : newIndex;
    args.onChange?.(log);
  };

  return (
    <SubnavChips onChange={handleChange} defaultSelectedIndex={1}>
      <SubnavChip label="All" index={0} />
      <SubnavChip label="Active" index={1} />
      <SubnavChip label="Completed" index={2} />
      <SubnavChip label="Archived" index={3} />
    </SubnavChips>
  );
}

// With badges example
function SubnavChipsWithBadges(args) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (newIndex) => {
    setSelectedIndex(newIndex);
    const log = (newIndex === null) ? 'deselected' : newIndex;
    args.onChange?.(log);
  };

  return (
    <SubnavChips onChange={handleChange} selectedIndex={selectedIndex}>
      <SubnavChip
        label="All"
        index="all"
        badge="150"
      />
      <SubnavChip
        label="Active"
        index="active"
        badge="45"
      />
      <SubnavChip
        label="Archived"
        index="archived"
        badge="16"
      />
    </SubnavChips>
  );
}

// With custom onClick handlers
function SubnavChipsWithCustomHandlers(args) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (newIndex) => {
    setSelectedIndex(newIndex);
    const log = (newIndex === null) ? 'deselected' : newIndex;
    args.onChange?.(log);
  };

  const handleCustomClick = () => {
    args.onClick?.('custom');
  };

  return (
    <SubnavChips onChange={handleChange} selectedIndex={selectedIndex}>
      <SubnavChip
        label="All"
        index={0}
        onClick={handleCustomClick}
      />
      <SubnavChip label="Active" index={1} />
      <SubnavChip label="Completed" index={2} />
      <SubnavChip label="Archived" index={3} />
    </SubnavChips>
  );
}

export const Controlled = {
  render: (args) => <ControlledSubnavChips {...args} />,
};

export const Uncontrolled = {
  render: (args) => <UncontrolledSubnavChips {...args} />,
};

export const WithBadges = {
  render: (args) => <SubnavChipsWithBadges {...args} />,
};

export const WithCustomHandlers = {
  render: (args) => <SubnavChipsWithCustomHandlers {...args} />,
};
