import React, {
  useState, useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import ReorderableTextFields from '.';

export default {
  title: 'Modules/ReorderableTextFields',
  tags: ['autodocs'],
};

export const Usage = {
  render: () => {
    const [field, setFields] = useState([
      'item 1', 'item 2', 'item 3',
    ]);

    const handleAddItem = () => {
      setFields((prevItems) => [
        ...prevItems,
        '',
      ]);
    };

    const onUpdate = useCallback((updatedItems) => {
      setFields(updatedItems);
    }, []);

    return (
    <div>
      <h2>Draggable and Reorderable Text Fields</h2>
      <button
         color=" primary"
         onClick={handleAddItem} value="Add text field"
      >
        Add Fields
      </button>
      <ReorderableTextFields
        items={field}
        onUpdate={onUpdate}
      />
    </div>
    );
  },
};

export const ReadOnlyField = {
  render: () => {
    const [field, setFields] = useState([
      'item 1', 'item 2', 'item 3',
    ]);

    const handleAddItem = () => {
      setFields((prevItems) => [
        ...prevItems,
        '',
      ]);
    };

    const onUpdate = useCallback((updatedItems) => {
      setFields(updatedItems);
    }, []);

    return (
    <div>
      <h2>Disabled Text Fields</h2>
      <button
         color=" primary"
         onClick={handleAddItem} value="Add text field"
      >
        Add Fields
      </button>
      <ReorderableTextFields
        items={field}
        onUpdate={onUpdate}
        disabled={true}
      />
    </div>
    );
  },
};

export const DynamicFields = {
  render: ({ count }) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
      setItems((prevItems) => {
        if (prevItems.length < count) {
          return [
            ...prevItems,
            ...Array.from({ length: count - prevItems.length }, (_, index) => `Field ${prevItems.length + index + 1}`),
          ];
        }
        return prevItems.slice(0, count);
      });
    }, [count]);

    const handleUpdate = useCallback((newItems) => {
      setItems(newItems);
    }, []);

    return (
    <ReorderableTextFields items={items} onUpdate={handleUpdate} />
    );
  },
};

DynamicFields.args = {
  count: 3,
};

DynamicFields.propTypes = {
  count: PropTypes.number,
};
