import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Button from '../button';

const DateRangeButtonField = React.forwardRef((props, ref) => {
  const {
    range,
    onOpen,
    ...other
  } = props;

  const [start, end] = range || [];

  const labelStart = dayjs(start).format('MMM D, YYYY');
  const labelEnd = dayjs(end).format('MMM D, YYYY');

  return (
    <Button
      ref={ref}
      variant="text"
      color="primary"
      onClick={onOpen}
      {...other}
    >
      {labelStart} – {labelEnd}
    </Button>
  );
});

DateRangeButtonField.displayName = 'DateRangeButtonField';

DateRangeButtonField.propTypes = {
  range: PropTypes.array,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
};

export default DateRangeButtonField;
