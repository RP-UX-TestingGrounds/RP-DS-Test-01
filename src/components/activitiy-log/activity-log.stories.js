import React, { useState } from 'react';
import ActivityLog from '.';

export default {
  title: 'Components/ActivityLog',
  tags: ['autodocs'],
  component: ActivityLog,
  args: {
    isLoading: false,
    shouldRenderViewMore: true,
  },
};

const mockHandlers = [
  {
    events: ['activity_added'],
    format: (activity) => `${activity.actor.label} added activity`,
  },
  {
    events: ['activity_deleted'],
    format: (activity) => `${activity.actor.label} deleted activity`,
  },
];

const mockActivity = (actor, event, date) => {
  return {
    actor: {
      label: actor,
    },
    event,
    date,
  };
};

const mockItems = [
  mockActivity('Gandalf', 'activity_deleted', '2025-08-30T17:47:14Z'),
  mockActivity('Aragorn', 'activity_added', '2024-05-12T23:29:14Z'),
  mockActivity('Frodo', 'activity_added', '2025-08-30T17:54:14Z'),
  mockActivity('Tolkien', 'activity_added', '1954-07-29T12:01:14Z'),
  mockActivity('Bilbo', 'activity_added', '2024-05-12T23:17:14Z'),
  mockActivity('Gandalf', 'activity_deleted', '2024-05-12T23:25:14Z'),
];

export const Default = (args) => (
  <ActivityLog
    {...args}
    items={mockItems}
    handlers={mockHandlers}
    onLoadMoreActivity={() => {}}
  />
);

export const NoActivity = (args) => (
  <ActivityLog
    {...args}
    items={[]}
    handlers={mockHandlers}
    onLoadMoreActivity={() => {}}
  />
);

export const MoreActivity = {
  render: () => {
    const [items, setItems] = useState([
      mockActivity('Frodo', 'activity_added', '2025-08-30T17:54:14Z'),
      mockActivity('Gandalf', 'activity_deleted', '2025-08-30T17:47:14Z'),
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMore, setViewMore] = useState(true);

    const loadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
        setItems(mockItems);
        setViewMore(false);
        setIsLoading(false);
      }, 2000);
    };

    return <ActivityLog
              items={items}
              handlers={mockHandlers}
              onLoadMoreActivity={loadMore}
              shouldRenderViewMore={viewMore}
              isLoading={isLoading}
           />;
  },
};

export const MissingOrInvalidHandlers = (args) => (
  <ActivityLog
    {...args}
    items={mockItems}
    onLoadMoreActivity={() => {}}
  />
);
