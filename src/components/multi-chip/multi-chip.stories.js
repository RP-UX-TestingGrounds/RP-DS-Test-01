import { useState } from 'react';
import MultiChip from '.';
import SelectField from '../select-field';
import MenuItem from '../menu/menu-item';

const items = [
  { id: 1, label: 'Option label 1' },
  { id: 2, label: 'Option label 2' },
  { id: 3, label: 'Option label 3' },
  { id: 4, label: 'Option label 4' },
  { id: 5, label: 'Option label 5' },
  { id: 6, label: 'Option label 6' },
  { id: 7, label: 'Option label 7' },
];

export default {
  title: 'Components/MultiChip',
  tags: ['autodocs'],
  component: MultiChip,
};

export const Default = {
  args: {
    items,
  },
};

export const Deletable = {
  render: (args) => {
    const [chipItems, setChipItems] = useState(items);

    const handleDelete = (id) => {
      setChipItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <MultiChip
        {...args}
        items={chipItems}
        onDelete={handleDelete}
      />
    );
  },
};

export const Scrollable = {
  render: () => {
    const manyItems = Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      label: `Option label ${index + 1}`,
    }));

    const [chipItems, setChipItems] = useState(manyItems);
    const handleDelete = (id) => {
      setChipItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <MultiChip
        items={chipItems}
        onDelete={handleDelete}
      />
    );
  },
};

export const WithSelectField = {
  render: (args) => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ];

    const [selectedItems, setSelectedItems] = useState([]);
    const chipItems = selectedItems.map((val) => {
      const option = options.find((o) => o.value === val);
      return { id: option.value, label: option.label };
    });

    const handleDelete = (id) => {
      setSelectedItems((prev) => prev.filter((v) => v !== id));
    };

    return (
      <div>
        <SelectField
          label="Select options"
          multiple
          value={selectedItems}
          onChange={(e) => setSelectedItems(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>

        <div style={{ marginTop: '1rem' }}>
          <MultiChip
            {...args}
            items={chipItems}
            onDelete={handleDelete}
          />
        </div>
      </div>
    );
  },
};
