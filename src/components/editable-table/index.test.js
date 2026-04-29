import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import EditableTable from '.';

describe('EditableTable', () => {
  afterEach(cleanup);
  const headers = [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }];
  const fieldValues = [
    { brand: 'volvo', parts: 'plug' },
  ];
  const onUpdate = jest.fn();

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <EditableTable
        headers={headers}
        fieldValues={fieldValues}
        onUpdate={onUpdate}
      />,
    );
    expect(getByTestId('editable-column-table')).toBeInTheDocument();
    expect(getByTestId('header-cell-0')).toBeInTheDocument();
    expect(getByTestId('table-row-0')).toBeInTheDocument();
    expect(getByTestId('remove-button-0')).toBeInTheDocument();
    expect(getByTestId(`input-0-${headers[0].key}`)).toBeInTheDocument();
  });

  it('renders headers correctly', () => {
    const { getByTestId } = render(
      <EditableTable
        headers={headers}
        fieldValues={fieldValues}
        onUpdate={onUpdate}
      />,
    );
    headers.forEach((header, index) => {
      expect(getByTestId(`header-cell-${index}`)).toHaveTextContent(header.label);
    });
  });

  it('renders row input field correctly', () => {
    const { getByTestId } = render(
      <EditableTable
        headers={headers}
        fieldValues={fieldValues}
        onUpdate={onUpdate}
      />,
    );
    fieldValues.forEach((value, rowIndex) => {
      headers.forEach((header) => {
        const input = getByTestId(`input-${rowIndex}-${header.key}`);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(value[header.key]);
      });
    });
  });

  it('handle row removal', () => {
    const { getByTestId } = render(
      <EditableTable
        headers={headers}
        fieldValues={fieldValues}
        onUpdate={onUpdate}
      />,
    );
    const button = getByTestId('remove-button-0');
    fireEvent.click(button);
    expect(onUpdate).toHaveBeenCalledWith([]);
  });

  it('handle input change', () => {
    const { getByTestId } = render(
      <EditableTable
        headers={headers}
        fieldValues={fieldValues}
        onUpdate={onUpdate}
      />,
    );
    const input = getByTestId(`input-0-${headers[0].key}`);
    expect(input).toHaveValue('volvo');
    fireEvent.change(input, { target: { value: 'volvo1' } });
    expect(onUpdate).toHaveBeenCalledWith([
      { brand: 'volvo1', parts: 'plug' },
    ]);
  });
});
