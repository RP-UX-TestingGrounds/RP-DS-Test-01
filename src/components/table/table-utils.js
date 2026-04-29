import { uniqueId } from 'lodash';
import NumberFormat from '@revolutionparts/number-format';

const NumberFormatter = NumberFormat();

export const SORT_DIRECTION_ASCENDING = 'asc';
export const SORT_DIRECTION_DESCENDING = 'desc';

export const ROW_DENSITY_KEYS = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const ROW_HEIGHTS = {
  [ROW_DENSITY_KEYS.sm]: 30,
  [ROW_DENSITY_KEYS.md]: 44,
  [ROW_DENSITY_KEYS.lg]: 58,
};

export const CELL_ALIGNMENT_DIRECTIONS = {
  right: 'right',
  left: 'left',
  center: 'center',
  justify: 'justify',
};

export function desc(a, b, orderBy, numeric) {
  const valueA = numeric && a[orderBy] ? NumberFormatter.stringToInt(a[orderBy]) : a[orderBy];
  const valueB = numeric && b[orderBy] ? NumberFormatter.stringToInt(b[orderBy]) : b[orderBy];
  if (valueB < valueA) {
    return -1;
  }
  if (valueB > valueA) {
    return 1;
  }
  return 0;
}

export function stableSort(array, getSortOrderFunc) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = getSortOrderFunc(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function getSortOrder(order, orderBy, numeric) {
  return order === SORT_DIRECTION_DESCENDING
    ? (a, b) => desc(a, b, orderBy, numeric)
    : (a, b) => -desc(a, b, orderBy, numeric);
}

export function sort(items, sortBy, sortDirection, numeric) {
  return stableSort(items, getSortOrder(sortDirection, sortBy, numeric));
}

// export function filter(rows, searchString) {
//   const normalizedSearchString = searchString.toLowerCase();
//   let searchStringArray = normalizedSearchString.split(',').map(val => val.trim());
//   searchStringArray = searchStringArray.filter(val => val);
//   return !searchString ? rows : rows.filter((row) => {
//     if (row.filterKey) {
//       return searchStringArray.every((searchString) => row.filterKey.toLowerCase().includes(searchString));
//     } else {
//       for (const prop in row) {
//         if (Object.prototype.hasOwnProperty.call(row, prop) && typeof row[prop] === 'string' && row[prop].toLowerCase().includes(normalizedSearchString)) {
//           return true;
//         }
//       }
//     }
//   });
// }

// export function createFilterKey(rows, propsToFilter) {
//   const hasPropsToFilter = propsToFilter && !propsToFilter.length;
//   return rows.map((row) => {
//     for (const prop in row) {
//       if ((hasPropsToFilter && propsToFilter.includes(row[prop])) || !hasPropsToFilter) {
//         row.filterKey = `${row.filterKey} ${row[prop]}`;
//       }
//     }

//     return row;
//   });
// }

export function mapColumns(columns) {
  return columns.map((col) => ({
    ...col,
    dataKey: col.key,
    id: col.id || uniqueId(col.key),
    width: col.width,
  }));
}

export function getPageRows(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage);
}

// This method gets the scrollbar width of the current browser
// It does this by adding a node offscreen, setting its overflow to 'scroll' and then calculating the difference between the offset (outer) width of the box - the client (inner) width.
// The element is then removed from the dom.
// This results in a cross-browser way to get an accurate measurment of the scrollbars.
// This measurment is necessary in some cases when trying to align react-virtualized element that can scroll with one that cannot.
// Adapted From: https://davidwalsh.name/detect-scrollbar-width
export function getScrollBarSize() {
  // Create the measurement node
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';

  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}

export const CHECKBOX_HEADER_CELL_DATA = {
  disableSort: true,
  key: 'checkbox-header-cell',
};

export const TABLE_FILTER_SELECTION_TYPES = {
  checkbox: 'checkbox',
  radio: 'radio',
};

export const dynamicSortPropertyWithDirection = (properties) => {
  return function dynamicPropertySort(a, b) {
    let result = 0;
    properties.some((prop) => {
      const aValue = a[prop.property];
      const bValue = b[prop.property];
      const comparison = aValue.localeCompare(bValue);

      if (comparison !== 0) {
        result = prop.direction === 'asc' ? comparison : -comparison;
        return true; // Breaks the iteration
      }
      return false;
    });
    return result;
  };
};
