import React, { useState } from 'react';
import SelectableList from '.';

export default {
  title: 'Components/Lists/SelectableList',
  tags: ['autodocs'],
  component: SelectableList,
  argTypes: {
    listItemCount: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of list items to generate',
    },
  },
};

const generateListItems = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `List Item #${index + 1}`,
    subLabel: `This is the description for list item ${index + 1}`,
  }));
};

const SelectableListTemplate = (args) => {
  const { listItemCount = 6, ...rest } = args;
  const [selectedValues, setSelectedValues] = useState(args.value || []);
  const items = generateListItems(listItemCount);

  return (
    <SelectableList
      {...rest}
      items={items}
      value={selectedValues}
      onChange={setSelectedValues}
    />
  );
};

export const SingleSelection = {
  render: SelectableListTemplate,
  args: {
    testId: 'selectable-list-single',
    multiple: false,
    listItemCount: 6,
    value: ['item-2'],
  },
};

export const MultipleSelection = {
  render: SelectableListTemplate,
  args: {
    testId: 'selectable-list-multiple',
    multiple: true,
    listItemCount: 6,
    value: ['item-2', 'item-4'],
  },
};

export const WithScroll = {
  render: (args) => {
    const { listItemCount = 10, ...rest } = args;
    const [selectedValues, setSelectedValues] = useState(args.value || []);
    const items = generateListItems(listItemCount);

    return (
      <div style={{ height: '300px', overflow: 'auto', border: '1px solid var(--grey-300)' }}>
        <SelectableList
          {...rest}
          items={items}
          value={selectedValues}
          onChange={setSelectedValues}
        />
      </div>
    );
  },
  args: {
    testId: 'selectable-list-scroll',
    multiple: true,
    listItemCount: 10,
    value: [],
  },
};
