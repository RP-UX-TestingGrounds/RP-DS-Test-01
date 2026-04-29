/* eslint-disable import/order */
import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { DATE_RANGE_SHORTCUTS, DASHBOARD_SHORTCUTS } from './date-range.shortcuts';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';

import { action } from 'storybook/actions';

import DateRange from './date-range';

const documentation = {
  value: {
    description: 'Controlled selected date range value',
    table: {
      type: { summary: '[Dayjs | null, Dayjs | null]' },
    },
    control: false,
  },

  defaultValue: {
    description: 'Initial date range (uncontrolled mode)',
    table: {
      type: { summary: '[Dayjs, Dayjs]' },
    },
  },

  onChange: {
    description: 'Callback fired when date range changes',
    table: {
      type: { summary: '(value) => void' },
    },
    control: false,
  },

  minDate: {
    description: 'Minimum selectable date',
    table: {
      type: { summary: 'Dayjs' },
    },
  },

  maxDate: {
    description: 'Maximum selectable date',
    table: {
      type: { summary: 'Dayjs' },
    },
  },

  disabled: {
    description: 'Disables the DateRange picker',
    table: {
      type: { summary: 'boolean' },
    },
    defaultValue: { summary: false },
  },

  readOnly: {
    description: 'Renders read-only state (no edits allowed)',
    table: {
      type: { summary: 'boolean' },
    },
    defaultValue: { summary: false },
  },

  format: {
    description: 'Date display format',
    table: {
      type: { summary: 'string' },
    },
    defaultValue: { summary: 'MMM D, YYYY' },
  },

  calendars: {
    description: 'Number of visible months',
    table: {
      type: { summary: 'number' },
    },
    defaultValue: { summary: 1 },
  },

  shortcuts: {
    description: 'Preset date ranges list',
    table: {
      type: { summary: 'Array<{ label, getValue }>' },
    },
    control: false,
  },

  textFieldProps: {
    description: 'Props applied to both TextFields',
    table: {
      type: { summary: 'Object' },
    },
  },
};

const shortcuts = Object.values(DATE_RANGE_SHORTCUTS);
const dashboard = Object.values(DASHBOARD_SHORTCUTS);
const TODAY = '2025-12-25'; // ho ho ho
const LIMIT_DATE = '2026-12-30';

export default {
  title: 'Components/DateRange',
  component: DateRange,
  tags: ['autodocs'],
  argTypes: {
    ...documentation,
  },
};

const Wrapper = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Default = {
  args: {
    defaultValue: [dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)],
    format: 'MMM D, YYYY',
    disabled: false,
    readOnly: false,
    calendars: 1,
  },

  render: (args) => (
    <Wrapper>
      <DateRange
        {...args}
        onChange={action('item clicked')(args)}
      />
    </Wrapper>
  ),
};

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState([
      dayjs(TODAY).subtract(3, 'day'),
      dayjs(TODAY),
    ]);

    return (
      <Wrapper>
        <DateRange value={value} onChange={setValue} />
      </Wrapper>
    );
  },
};

export const WithMinMax = () => (
  <Wrapper>
    <DateRange
      minDate={dayjs(TODAY).subtract(30, 'day')}
      maxDate={dayjs(LIMIT_DATE)}
      defaultValue={[dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)]}
    />
  </Wrapper>
);

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: [dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)],
  },
  render: (args) => (
    <Wrapper>
      <DateRange {...args} />
    </Wrapper>
  ),
};

export const ReadOnly = () => (
  <Wrapper>
    <DateRange
      readOnly
      defaultValue={[dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)]}
    />
  </Wrapper>
);

export const CustomFormat = () => (
  <Wrapper>
    <DateRange
      format="YYYY-MM-DD"
      defaultValue={[dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)]}
    />
  </Wrapper>
);

export const CustomTextField = () => (
  <Wrapper>
    <DateRange
      textFieldProps={{
        size: 'medium',
        color: 'secondary',
        helperText: 'Choose wisely',
      }}
      defaultValue={[dayjs(TODAY).subtract(7, 'day'), dayjs(TODAY)]}
    />
  </Wrapper>
);

export const CalendarOnly = () => (
  <Wrapper>
    <DateRange
      calendars={2}
      showDaysOutsideCurrentMonth
      defaultValue={[dayjs(TODAY).subtract(14, 'day'), dayjs(TODAY)]}
    />
  </Wrapper>
);

export const WithShortcuts = {
  render: () => (
    <Wrapper>
      <DateRange shortcuts={shortcuts} calendars={2} />
    </Wrapper>
  ),
};

export const WithDashboarShortcuts = {
  render: () => (
    <Wrapper>
      <DateRange shortcuts={dashboard} calendars={2} />
    </Wrapper>
  ),
};

export const ShortcutsWithLimits = () => (
  <Wrapper>
    <DateRange
      shortcuts={dashboard}
      calendars={2}
      minDate={dayjs(TODAY).subtract(45, 'day')}
      maxDate={dayjs(LIMIT_DATE)}
    />
  </Wrapper>
);
