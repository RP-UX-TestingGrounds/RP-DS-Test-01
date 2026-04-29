function convertToTwelveHour(time, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(time);
}

function extendedDateFormat(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export {
  convertToTwelveHour,
  extendedDateFormat,
};
