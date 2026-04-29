import React from 'react';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #9f9f9f',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#9f9f9f',
        },
      },
    },
  },
});

export default function AmpersandProvider({
  children,
}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

AmpersandProvider.propTypes = {
  children: PropTypes.node,
};
