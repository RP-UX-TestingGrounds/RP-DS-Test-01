import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import AmpersandProvider from '.';
import EditableTable from '../../components/editable-table';

describe('AmpersandProvider', () => {
  afterEach(cleanup);

  function renderComponent() {
    const headers = [{ key: 'brand', label: 'Brand' }, { key: 'parts', label: 'Parts' }];
    const fieldValues = [
      { brand: 'volvo', parts: 'plug' },
    ];

    return render(
      <AmpersandProvider>
        <EditableTable
          headers={headers}
          fieldValues={fieldValues}
        />
      </AmpersandProvider>,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('editable-column-table')).toBeInTheDocument();
    expect(getByTestId('header-cell-0')).toBeInTheDocument();
    expect(getByTestId('table-row-0')).toBeInTheDocument();
    expect(getByTestId('remove-button-0')).toBeInTheDocument();
    expect(getByTestId('input-0-brand')).toBeInTheDocument();
  });

  it('input box should change border color on focus', async () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('input-0-brand');
    const outLinedInputRoot = input.closest('.MuiOutlinedInput-root');
    fireEvent.focus(input);
    await (() => {
      const style = outLinedInputRoot.querySelector('.MuiOutlinedInput-notchedOutline');
      expect(style.border).toBe('1px solid #9f9f9f');
    });
  });

  it('input box should change border color on hover', async () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('input-0-brand');
    const outLinedInputRoot = input.closest('.MuiOutlinedInput-root');
    fireEvent.mouseOver(input);
    await (() => {
      const style = outLinedInputRoot.querySelector('fieldset.MuiOutlinedInput-notchedOutline');
      expect(style.borderColor).toBe('#9f9f9f');
    });
  });
});
