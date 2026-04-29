import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  styled,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import dayjs from 'dayjs';
import DateRangeButtonField from './date-range-button-field';
import Chip from '../chip/index';

const DayjsType = PropTypes.oneOfType([
  PropTypes.object, // dayjs instance
  PropTypes.instanceOf(Date), // JS Date fallback
]);

const normalizeRange = (range) => range?.map((d) => (d ? dayjs(d) : null));

const ShortcutsWrapper = styled('div')({
  gridRow: 2,
  gridColumn: 4,
});

const ShortcutsList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme?.spacing(2) || 16, // fallback if theme.spacing unavailable
  gap: '8px',
  paddingRight: theme?.spacing(2) || 8,
}));

const ShortcutItem = styled('div')({
  display: 'flex',
});

const StyledDateRangePickerDay = styled(DateRangePickerDay)({
  '&.MuiDateRangePickerDay-rangeIntervalDayHighlight:has(button)': {
    backgroundColor: 'hsla(from var(--primary-main) h s l / 0.12)',
  },
  '&.MuiDateRangePickerDay-rangeIntervalDayHighlight .MuiDateRangePickerDay-day:not(.Mui-selected):hover': {
    backgroundColor: 'hsla(from var(--primary-main) h s l / 0.24)',
  },
});

function CustomRangeShortcuts(props) {
  const safeItems = Array.isArray(props.items)
    ? props.items
    : [];
  if (safeItems.length === 0) {
    return null;
  }

  return (
    <ShortcutsWrapper>
      <ShortcutsList>
        {safeItems.map((item) => {
          return (
            <ShortcutItem key={item.label}>
              <Chip
                label={item.label}
                size="small"
                onClick={item.onClick}
                disabled={item.disabled}
              />
            </ShortcutItem>
          );
        })}
      </ShortcutsList>
    </ShortcutsWrapper>
  );
}

CustomRangeShortcuts.propTypes = {
  items: PropTypes.array,
};

export default function DateRange({
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  format = 'MMM D, YYYY',
  shortcuts = [],
  calendars = 1,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const fieldRef = React.useRef(null);
  // Uncontrolled mode
  const [internalRange, setInternalRange] = useState(
    normalizeRange(defaultValue) || [dayjs().subtract(7, 'day'), dayjs()],
  );

  // Controlled or uncontrolled
  const range = value !== undefined
    ? normalizeRange(value)
    : normalizeRange(internalRange);

  const handleChange = (newValue) => {
    if (value === undefined) {
      setInternalRange(newValue);
    }
    onChange?.(newValue);
  };

  // --- Shortcut normalization (THIS IS CRITICAL for customization)
  const resolvedShortcuts = useMemo(() => (
    shortcuts.map((item) => {
      const raw = item.getValue?.();
      const normalizeValue = normalizeRange(raw);

      const isValid = Array.isArray(normalizeValue)
        && normalizeValue.length === 2
        && normalizeValue.every((d) => d === null || dayjs(d).isValid());

      return {
        label: item.label,
        disabled: !isValid,
        onClick: () => {
          handleChange(normalizeValue);
        },
      };
    })
  ), [shortcuts]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={range}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        readOnly={readOnly}
        format={format}
        calendars={calendars}
        slots={{
          field: DateRangeButtonField,
          day: StyledDateRangePickerDay,
          shortcuts: CustomRangeShortcuts,
        }}
        slotProps={{
          field: {
            range,
            onOpen: () => setOpen(true),
            ref: fieldRef,
          },
          popper: {
            anchorEl: fieldRef.current, // fixes positioning
            placement: 'bottom-start',
          },
          shortcuts: {
            items: resolvedShortcuts,
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}

DateRange.propTypes = {
  /** Controlled value */
  value: PropTypes.arrayOf(DayjsType),
  /** Initial uncontrolled value */
  defaultValue: PropTypes.arrayOf(DayjsType),
  onChange: PropTypes.func,
  minDate: DayjsType,
  maxDate: DayjsType,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  format: PropTypes.string,
  /** Number of visible calendars */
  calendars: PropTypes.number,
  /** Shortcut list */
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      getValue: PropTypes.func.isRequired,
    }),
  ),
  /** TextField props passthrough */
  textFieldProps: PropTypes.object,
  ...DateRangePicker.propTypes,
};
