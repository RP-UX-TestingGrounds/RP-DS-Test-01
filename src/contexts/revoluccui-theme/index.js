import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LicenseInfo } from '@mui/x-license';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import getMuiLocaleData from './mui-locales';

// Register the MUI X license key - Recommended method of hardcoding
// See: https://mui.com/x/introduction/licensing/#license-key-installation
// (Must be done before any other MUI X imports)
const MUI_X_LICENSE = 'ddad29ff82f8070e75d9f1cb54d9410aTz0xMjE1MDAsRT0xNzk0MDA5NTk5MDAwLFM9cHJvLExNPXBlcnBldHVhbCxQVj1RMy0yMDI0LEtWPTI=';
LicenseInfo.setLicenseKey(MUI_X_LICENSE);

const baseTheme = {
  cssVariables: {
    nativeColor: true,
  },
  palette: {
    primary: {
      main: 'var(--primary-main)',
      light: 'var(--primary-light)',
      dark: 'var(--primary-dark)',
      contrastText: 'var(--on-primary)',
    },
    secondary: {
      main: 'var(--secondary-main)',
      light: 'var(--secondary-light)',
      dark: 'var(--secondary-dark)',
      contrastText: 'var(--on-secondary)',
    },
    error: {
      main: 'var(--error-main)',
      light: 'var(--error-light)',
      dark: 'var(--error-dark)',
      contrastText: 'var(--on-error)',
    },
    warning: {
      main: 'var(--warning-main)',
      light: 'var(--warning-light)',
      dark: 'var(--warning-dark)',
      contrastText: 'var(--on-warning)',
    },
    success: {
      main: 'var(--success-main)',
      light: 'var(--success-light)',
      dark: 'var(--success-dark)',
      contrastText: 'var(--on-success)',
    },
    info: {
      main: 'var(--info-main)',
      light: 'var(--info-light)',
      dark: 'var(--info-dark)',
      contrastText: 'var(--on-info)',
    },
    inherit: {
      main: 'var(--default-main)',
      light: 'var(--default-light)',
      dark: 'var(--default-dark)',
      contrastText: 'var(--on-default)',
    },
    TableCell: {
      border: 'var(--surface-border-color)',
    },
    text: {
      primary: 'var(--text-primary)',
    },
  },
  typography: {
    fontFamily: 'var(--font-family)',
    fontWeight: 'var(--font-weight-regular)',
    htmlFontSize: 10, // define base font size
    body1: {
      fontSize: 'var(--body-font-size)',
    },
    body2: {
      fontSize: 'var(--body-font-size)',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};

export default function RevolucciProvider({
  children,
  locale = 'en_US',
}) {
  const localeData = useMemo(() => getMuiLocaleData(locale), [locale]);

  const localeTheme = useMemo(() => {
    return createTheme.apply(null, [baseTheme, ...localeData]);
  }, [localeData]);

  return (
    <ThemeProvider theme={localeTheme}>
      {children}
    </ThemeProvider>
  );
}

RevolucciProvider.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string,
};
