import React, { useState } from 'react';
import EditableTable from '.';
import AmpersandProvider from '../../contexts/ampersand-theme';

export default {
  title: 'Modules/EditableTable',
  tags: ['autodocs'],
};

export const Usage = {
  render: () => {
    const headers = [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }];
    const [rows, setRows] = useState([{ brand: 'Brand A', parts: 'Part A' }]);

    const handleAddRow = () => {
      const newItem = {
        id: `${rows.length + 1}`,
        brand: '',
        parts: '',
      };
      setRows([...rows, newItem]);
    };

    const handleRowUpdate = (updatedRows) => {
      setRows(updatedRows);
    };
    return (
      <AmpersandProvider>
        <button onClick={handleAddRow}>Add Row</button>
          <EditableTable
            headers={headers}
            fieldValues={rows}
            onUpdate={handleRowUpdate}
          />
      </AmpersandProvider>
    );
  },
};

export const DynamicEditableTable = {
  args: {
    headers: [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }],
    fieldValues: [
      {
        brand: 'volv',
        parts: 'plug',
      },
      {
        brand: 'suv',
        parts: 'wheel',
      },
    ],
  },
  render: (args) => <EditableTable {...args} />,
};
DynamicEditableTable.args = {
  headers: [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }],
  fieldValues: [
    { brand: 'volv', parts: 'plug' },
    { brand: '', parts: '' },
  ],
};

export const ReadOnlyEditableTable = {
  args: {
    headers: [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }],
    fieldValues: [
      {
        brand: 'volv',
        parts: 'plug',
      },
      {
        brand: 'suv',
        parts: 'wheel',
      },
    ],
  },
  render: (args) => <EditableTable {...args} />,
};
ReadOnlyEditableTable.args = {
  headers: [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }],
  fieldValues: [
    { brand: 'volv', parts: 'plug' },
  ],
  disabled: true,
};
