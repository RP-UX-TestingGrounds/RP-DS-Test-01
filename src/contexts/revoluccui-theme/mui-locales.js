import {
  enUS as enDataGrid,
  frFR as frDataGrid,
} from '@mui/x-data-grid-pro/locales';

function getLanguageFromLocale(locale) {
  return locale.split('_')[0];
}

/**
 * Get the MUI locale data for the given locale, eventually passed to createTheme
 * NOTE: As we add more MUI locale information, push additional data to the array below
 *
 * @param {string} locale - The locale to get the MUI locale (ex: en_US, fr_FR, etc.)
 * @returns {Array} - The MUI locale data
 */
export default function getMuiLocaleData(locale = 'en_US') {
  const localeData = [];
  const language = getLanguageFromLocale(locale);
  switch (language) {
    case 'fr':
      localeData.push(frDataGrid);
      break;
    case 'en':
    default:
      localeData.push(enDataGrid);
      break;
  }
  return localeData;
}
