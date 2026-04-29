/* eslint-disable react/prop-types */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import GroupField from './group-field';

// Simple mock input component (works for Switch, Checkbox, etc)
const MockToggle = ({ checked, onChange, disabled }) => (
  <input
    type="checkbox"
    data-test-id="mock-toggle"
    checked={checked}
    disabled={disabled}
    onChange={onChange}
  />
);

const items = [
  { key: 'a', label: 'Alice' },
  { key: 'b', label: 'Bob' },
  { key: 'c', label: 'Charlie' },
];

describe('GroupField', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders title', () => {
    const { getByText } = render(
      <GroupField
        title="Test title"
        items={items}
        Component={MockToggle}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    expect(getByText('Test title')).toBeInTheDocument();
  });

  it('renders warning message when provided', () => {
    const { getByText } = render(
      <GroupField
        items={items}
        Component={MockToggle}
        value={[]}
        onChange={jest.fn()}
        helperText="Danger zone!"
      />,
    );

    expect(getByText('Danger zone!')).toBeInTheDocument();
  });

  it('does NOT render warning if not provided', () => {
    const { queryByText } = render(
      <GroupField
        items={items}
        Component={MockToggle}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    expect(queryByText('Danger zone!')).not.toBeInTheDocument();
  });

  it('toggles values and calls onChange correctly', () => {
    const handleChange = jest.fn();

    const { getAllByTestId } = render(
      <GroupField
        items={items}
        Component={MockToggle}
        value={['b']}
        onChange={handleChange}
      />,
    );

    const toggles = getAllByTestId('mock-toggle');
    // click Alice
    fireEvent.click(toggles[0]);
    expect(handleChange).toHaveBeenCalledWith(['b', 'a']);

    // click Bob (remove)
    fireEvent.click(toggles[1]);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('disables items when disabled=true', () => {
    const { getAllByTestId } = render(
      <GroupField
        items={[
          { key: 'a', label: 'Alice', disabled: true },
          { key: 'b', label: 'Bob' },
        ]}
        Component={MockToggle}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    const toggles = getAllByTestId('mock-toggle');

    expect(toggles[0]).toBeDisabled();
    expect(toggles[1]).not.toBeDisabled();
  });
});
