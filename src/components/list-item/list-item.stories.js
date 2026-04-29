import ListItem from '.';

const defaultLabel = 'List Item Example';
const defaultSubLabel = 'I am an example list item with some secondary text. Try hovering over me!';

export default {
  title: 'Components/Lists/ListItem',
  tags: ['autodocs'],
  component: ListItem,
  args: {
    label: defaultLabel,
    subLabel: defaultSubLabel,
    value: 'item-1',
  },
};

export const Default = {
  args: {
    testId: 'list-item-default',
  },
};

export const Selected = {
  args: {
    selected: true,
    testId: 'list-item-selected',
  },
};

export const WithCheckbox = {
  args: {
    showCheckbox: true,
    testId: 'list-item-checkbox',
  },
};

export const WithCheckboxSelected = {
  args: {
    showCheckbox: true,
    selected: true,
    testId: 'list-item-checkbox-selected',
  },
};

export const LabelOnly = {
  args: {
    subLabel: undefined,
    testId: 'list-item-label-only',
  },
};
