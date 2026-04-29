import React from 'react';
import { Search, Clear } from '@mui/icons-material';
import PropTypes from 'prop-types';

import TextField from '../text-field';

export default function SearchTextField({
  onClear,
  placeholder,
  testId,
  ...other
}) {
  return (
    <TextField
      icon={onClear ? <Clear /> : undefined}
      onClear={onClear}
      placeholder={placeholder}
      startIcon={<Search />}
      testId={testId}
      variant="outlined"
      {...other}
    />
  );
}

SearchTextField.propTypes = {
  onClear: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
