import React from 'react';
import PropTypes from 'prop-types';

export default function TabPanel({
  children,
  index,
  testId,
  value,
  ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      data-test-id={`tab-panel-${testId || index}`}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  testId: PropTypes.string,
};
