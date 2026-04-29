import formatActivityByDate from './activity-log-utils';

describe('formatActivityByDate', () => {
  it('returns an empty array when given an empty array', () => {
    const result = formatActivityByDate([]);
    expect(result).toEqual([]);
  });

  it('groups items by real formatted date and sorts correctly', () => {
    const items = [
      { date: '2025-08-01T10:00:00Z' },
      { date: '2025-08-02T09:00:00Z' },
      { date: '2025-08-01T15:00:00Z' },
    ];

    const result = formatActivityByDate(items, 'en-US');

    expect(result).toEqual([
      {
        date: 'August 2, 2025',
        data: [{ date: '2025-08-02T09:00:00Z' }],
      },
      {
        date: 'August 1, 2025',
        data: [
          { date: '2025-08-01T15:00:00Z' },
          { date: '2025-08-01T10:00:00Z' },
        ],
      },
    ]);
  });

  it('sorts items within groups by descending time', () => {
    const items = [
      { id: 1, date: '2025-08-01T08:00:00Z' },
      { id: 2, date: '2025-08-01T20:00:00Z' },
    ];
    const result = formatActivityByDate(items, 'en-US');

    expect(result[0].data.map((activity) => activity.id)).toEqual([2, 1]);
  });

  it('sorts groups in descending date order', () => {
    const items = [
      { date: '2025-08-03T12:00:00Z' },
      { date: '2025-08-01T12:00:00Z' },
      { date: '2025-08-02T12:00:00Z' },
    ];

    const result = formatActivityByDate(items, 'en-US');

    expect(result.map((activityGroup) => activityGroup.date)).toEqual([
      'August 3, 2025',
      'August 2, 2025',
      'August 1, 2025',
    ]);
  });

  it('adapts to locale formatting (e.g., fr-CA)', () => {
    const items = [{ date: '2025-12-25T12:00:00Z' }];
    const result = formatActivityByDate(items, 'fr-CA');

    expect(result[0].date).toMatch('25 décembre 2025');
  });
});
