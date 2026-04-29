import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as MuiTooltip } from '@mui/material';
import { Info } from '@mui/icons-material';

const iconWrapperStyles = { display: 'inline-flex' };

function Tooltip({ testId, title }) {
  const wrapper = (
    <MuiTooltip
      slotProps={{
        popper: {
          modifiers: [{ name: 'offset', options: { offset: [0, -15] } }],
        },
      }}
      title={title}
    >
      <span style={iconWrapperStyles}>
        <Info fontSize="small" sx={{ color: 'var(--grey-600)' }} />
      </span>
    </MuiTooltip>
  );

  if (!testId) {
    return wrapper;
  }

  return (
    <span data-test-id={testId} style={iconWrapperStyles}>
      {wrapper}
    </span>
  );
}

Tooltip.propTypes = {
  testId: PropTypes.string,
  title: PropTypes.string,
};

export default Tooltip;
