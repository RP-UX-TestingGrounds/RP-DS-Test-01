import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleTile from '.';
import RevolucciProvider from '../../contexts/revoluccui-theme';

describe('ToggleTile', () => {
  afterEach(cleanup);

  function renderWithProvider(props) {
    const user = userEvent.setup();
    const utils = render(
      <RevolucciProvider>
        <ToggleTile {...props} />
      </RevolucciProvider>,
    );
    return { user, ...utils };
  }

  it('renders title and test id', () => {
    const { getByTestId, getByText } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Payment',
    });

    expect(getByTestId('toggle-tile')).toBeInTheDocument();
    expect(getByText('Payment')).toBeInTheDocument();
  });

  it('renders subtitle and children', () => {
    const { getByTestId, getByText } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Title',
      subtitle: 'Subtitle text',
      children: <span data-test-id="child">Child</span>,
    });

    expect(getByText('Subtitle text')).toBeInTheDocument();
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('renders chip with test id when chipLabel is set', () => {
    const { getByTestId, getByText } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Title',
      chipLabel: 'Active',
    });

    expect(getByTestId('toggle-tile-chip')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
  });

  it('renders action button and calls onClickAction', async () => {
    const onClickAction = jest.fn();
    const { user, getByTestId } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Title',
      actionLabel: 'Edit',
      onClickAction,
    });

    await user.click(getByTestId('toggle-tile-action'));
    expect(onClickAction).toHaveBeenCalledTimes(1);
  });

  it('renders switch and calls onToggleChange', async () => {
    const onToggleChange = jest.fn();
    const { user, getByRole } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Title',
      toggle: true,
      toggleValue: false,
      onToggleChange,
    });

    await user.click(getByRole('switch'));
    expect(onToggleChange).toHaveBeenCalled();
  });

  it('does not render toggle when toggle is false', () => {
    const { queryByTestId } = renderWithProvider({
      testId: 'toggle-tile',
      title: 'Title',
      toggle: false,
    });

    expect(queryByTestId('toggle-tile-toggle')).not.toBeInTheDocument();
  });
});
