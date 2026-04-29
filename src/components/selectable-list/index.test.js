import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectableList from '.';

describe('SelectableList', () => {
  afterEach(cleanup);

  const defaultItems = [
    { value: 'item-1', label: 'Item 1' },
    { value: 'item-2', label: 'Item 2' },
    { value: 'item-3', label: 'Item 3' },
  ];

  function renderSelectableList(props) {
    return {
      user: userEvent.setup(),
      ...render(
        <SelectableList
          items={defaultItems}
          {...props}
        />,
      ),
    };
  }

  it('renders all list items', () => {
    const { getByText } = renderSelectableList({ testId: 'selectable-list' });

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
  });

  it('renders checkboxes for all items', () => {
    const { getAllByRole } = renderSelectableList({ testId: 'selectable-list' });

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('marks items as checked based on value prop', () => {
    const { getAllByRole } = renderSelectableList({
      testId: 'selectable-list',
      value: ['item-1', 'item-3'],
    });

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  describe('single selection mode', () => {
    it('calls onChange with single item array when item is clicked', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: false,
        value: [],
        onChange,
      });

      await user.click(getByText('Item 2'));

      expect(onChange).toHaveBeenCalledWith(['item-2']);
    });

    it('calls onChange with empty array when selected item is clicked again', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: false,
        value: ['item-2'],
        onChange,
      });

      await user.click(getByText('Item 2'));

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('replaces selection when different item is clicked', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: false,
        value: ['item-1'],
        onChange,
      });

      await user.click(getByText('Item 2'));

      expect(onChange).toHaveBeenCalledWith(['item-2']);
    });
  });

  describe('multiple selection mode', () => {
    it('calls onChange with item added to array when unchecked item is clicked', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: true,
        value: ['item-1'],
        onChange,
      });

      await user.click(getByText('Item 2'));

      expect(onChange).toHaveBeenCalledWith(['item-1', 'item-2']);
    });

    it('calls onChange with item removed from array when checked item is clicked', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: true,
        value: ['item-1', 'item-2'],
        onChange,
      });

      await user.click(getByText('Item 1'));

      expect(onChange).toHaveBeenCalledWith(['item-2']);
    });

    it('allows selecting multiple items', async () => {
      const onChange = jest.fn();
      const { user, getByText } = renderSelectableList({
        testId: 'selectable-list',
        multiple: true,
        value: [],
        onChange,
      });

      await user.click(getByText('Item 1'));
      expect(onChange).toHaveBeenCalledWith(['item-1']);
    });
  });

  it('renders with empty items array', () => {
    const { getByTestId, queryByRole } = renderSelectableList({
      testId: 'selectable-list',
      items: [],
      value: [],
    });

    expect(getByTestId('selectable-list')).toBeInTheDocument();
    expect(queryByRole('checkbox')).not.toBeInTheDocument();
  });
});
