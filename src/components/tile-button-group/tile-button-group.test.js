import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TileButtonGroup from '.';

const defaultOptions = [
  { value: 'oem', label: 'OEM', description: 'Original Equipment Manufacturer' },
  { value: 'aftermarket', label: 'Aftermarket', description: 'Third-party parts' },
  { value: 'remanufactured', label: 'Remanufactured', description: 'Rebuilt parts' },
];

describe('TileButtonGroup', () => {
  afterEach(cleanup);

  it('renders all options with test ids', () => {
    const { getByTestId, getByText } = render(
      <TileButtonGroup
        testId="tile-group"
        options={defaultOptions}
        value={null}
        onChange={() => {}}
      />,
    );

    expect(getByTestId('tile-group')).toBeInTheDocument();
    expect(getByText('OEM')).toBeInTheDocument();
    expect(getByText('Aftermarket')).toBeInTheDocument();
    expect(getByText('Remanufactured')).toBeInTheDocument();
    expect(getByTestId('tile-group-oem')).toBeInTheDocument();
  });

  describe('single selection mode', () => {
    it('calls onChange with single value when tile is clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      const { getByTestId } = render(
        <TileButtonGroup
          testId="tile-group"
          options={defaultOptions}
          value={null}
          onChange={handleChange}
        />,
      );

      await user.click(getByTestId('tile-group-oem'));
      expect(handleChange).toHaveBeenCalledWith('oem');
    });
  });

  describe('multiple selection mode', () => {
    it('adds to selection when clicking unselected tile', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      const { getByTestId } = render(
        <TileButtonGroup
          testId="tile-group"
          options={defaultOptions}
          value={['oem']}
          onChange={handleChange}
          multiple
        />,
      );

      await user.click(getByTestId('tile-group-aftermarket'));
      expect(handleChange).toHaveBeenCalledWith(['oem', 'aftermarket']);
    });

    it('removes from selection when clicking selected tile', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      const { getByTestId } = render(
        <TileButtonGroup
          testId="tile-group"
          options={defaultOptions}
          value={['oem', 'aftermarket']}
          onChange={handleChange}
          multiple
        />,
      );

      await user.click(getByTestId('tile-group-oem'));
      expect(handleChange).toHaveBeenCalledWith(['aftermarket']);
    });
  });

  it('renders options with iconName', () => {
    const optionsWithIconName = [
      { value: 'account', label: 'Account', iconName: 'account' },
    ];

    const { getByTestId, container } = render(
      <TileButtonGroup
        testId="tile-group"
        options={optionsWithIconName}
        value={null}
        onChange={() => {}}
      />,
    );

    expect(getByTestId('tile-group-account')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
