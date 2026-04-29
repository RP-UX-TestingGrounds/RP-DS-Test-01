import dayjs from 'dayjs';

export const DATE_RANGE_SHORTCUTS = {
  LAST_7_DAYS: {
    label: 'Last 7 days',
    getValue: () => [dayjs().subtract(7, 'day'), dayjs()],
  },

  LAST_30_DAYS: {
    label: 'Last 30 days',
    getValue: () => [dayjs().subtract(30, 'day'), dayjs()],
  },

  THIS_WEEK: {
    label: 'This week',
    getValue: () => [dayjs().startOf('week'), dayjs().endOf('week')],
  },

  THIS_MONTH: {
    label: 'This month',
    getValue: () => [dayjs().startOf('month'), dayjs().endOf('month')],
  },

  LAST_MONTH: {
    label: 'Last month',
    getValue: () => {
      const lastMonth = dayjs().subtract(1, 'month');
      return [lastMonth.startOf('month'), lastMonth.endOf('month')];
    },
  },

  CLEAR: {
    label: 'Clear',
    getValue: () => [null, null],
  },
};

export const DASHBOARD_SHORTCUTS = {
  LAST_7_DAYS: {
    label: 'Last 7 Days',
    getValue: () => [dayjs().subtract(6, 'day'), dayjs()],
  },

  LAST_30_DAYS: {
    label: 'Last 30 Days',
    getValue: () => [dayjs().subtract(29, 'day'), dayjs()],
  },

  LAST_60_DAYS: {
    label: 'Last 60 Days',
    getValue: () => [dayjs().subtract(59, 'day'), dayjs()],
  },

  THIS_MONTH: {
    label: 'This Month',
    getValue: () => [
      dayjs().startOf('month'),
      dayjs().endOf('month'),
    ],
  },

  LAST_MONTH: {
    label: 'Last Month',
    getValue: () => {
      const lastMonth = dayjs().subtract(1, 'month');
      return [
        lastMonth.startOf('month'),
        lastMonth.endOf('month'),
      ];
    },
  },

  LAST_3_MONTHS: {
    label: 'Last 3 Months',
    getValue: () => [
      dayjs().subtract(2, 'month').startOf('month'),
      dayjs().endOf('month'),
    ],
  },

  LAST_6_MONTHS: {
    label: 'Last 6 Months',
    getValue: () => [
      dayjs().subtract(5, 'month').startOf('month'),
      dayjs().endOf('month'),
    ],
  },
};
