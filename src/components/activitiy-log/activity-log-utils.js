import { extendedDateFormat } from '../../utils/date-format';

export default function formatActivityByDate(items, locale = 'en-US') {
  const activityByDateObject = {};
  items.forEach((item) => {
    const date = extendedDateFormat(new Date(item?.date || null), locale);
    if (!activityByDateObject[date]) {
      activityByDateObject[date] = [];
    }
    activityByDateObject[date].push(item);
  });

  const activityByDateArray = [];

  Object.keys(activityByDateObject).forEach((date) => {
    activityByDateArray.push({
      date,
      data: activityByDateObject[date],
    });
  });

  const activityByDateSortedArray = activityByDateArray.sort((a, b) => {
    return +new Date(b.date) - +new Date(a.date);
  });

  return activityByDateSortedArray.map((oneDayActivity) => {
    const eventsSortedByDate = oneDayActivity.data.sort((a, b) => {
      return +new Date(b.date) - +new Date(a.date);
    });

    return {
      date: oneDayActivity.date,
      data: eventsSortedByDate,
    };
  });
}
