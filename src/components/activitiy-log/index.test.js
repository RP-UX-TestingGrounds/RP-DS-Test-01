import React from 'react';
import { cleanup, render } from '@testing-library/react';

import ActivityLog from '.';

const mockHandlers = [
  {
    events: ['test_passed'],
    format: (info) => `${info.actor.label} successfully ran the test`,
  },
];

const mockItems = [
  {
    actor: {
      label: 'RP-User',
    },
    date: '2025-01-17T14:57:14Z',
    event: 'test_passed',
  },
];

describe('ActivityLog', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      testId,
      items,
      handlers,
      shouldRenderViewMore,
      onLoadMoreActivity,
    } = props;

    return render(
      <ActivityLog
        testId={testId}
        items={items}
        handlers={handlers}
        shouldRenderViewMore={shouldRenderViewMore}
        onLoadMoreActivity={onLoadMoreActivity}
      />,
    );
  }

  it('renders when no items', () => {
    const { getByTestId } = renderComponent({
      testId: 'empty-activity-log',
    });

    expect(getByTestId('empty-activity-log')).toBeInTheDocument();
    expect(getByTestId('empty-activity-log')).toHaveTextContent('No activity data');
  });

  it('uses handler correctly', () => {
    const { getByTestId } = renderComponent({
      testId: 'default-activity-log',
      items: mockItems,
      handlers: mockHandlers,
    });

    expect(getByTestId('default-activity-log')).toHaveTextContent('RP-User successfully ran the test');
  });

  it('renders default text if no handler', () => {
    const { getByTestId } = renderComponent({
      testId: 'nohandler-activity-log',
      items: mockItems,
      shouldRenderViewMore: true,
    });

    expect(getByTestId('nohandler-activity-log')).toHaveTextContent('Event:');
  });

  it('loads view more when specified', () => {
    const { getByTestId } = renderComponent({
      testId: 'viewmore-activity-log',
      items: mockItems,
      handlers: mockHandlers,
      onLoadMoreActivity: () => {},
      shouldRenderViewMore: true,
    });

    expect(getByTestId('view-more-activity__button')).toBeInTheDocument();
  });

  it('does not load view more when specified', () => {
    const { queryByTestId } = renderComponent({
      testId: 'viewmore-activity-log',
      items: mockItems,
      handlers: mockHandlers,
      onLoadMoreActivity: () => {},
      shouldRenderViewMore: false,
    });

    expect(queryByTestId('view-more-activity__button')).not.toBeInTheDocument();
  });

  it('handles bad data', () => {
    const badItems = [
      undefined,
      undefined,
    ];

    const { getByTestId } = renderComponent({
      testId: 'bad-data-activity-log',
      items: badItems,
      handlers: mockHandlers,
    });

    expect(getByTestId('bad-data-activity-log')).toBeInTheDocument();
  });
});
