import React from 'react';
import { cloneDeep } from 'lodash';
import { action } from 'storybook/actions';

import {
  AutoStories as Book,
  Flare,
} from '@mui/icons-material';

import Chip from '../chip';
import DataGrid from './data-grid';

function buildStringText(value) {
  return (
    <strong>{value}</strong>
  );
}

function buildColoredText(value) {
  let type = 'default';
  switch (value) {
    case 'Man':
      type = 'success';
      break;
    case 'Elf':
      type = 'error';
      break;
    case 'Wizard':
      type = 'primary';
      break;
    default:
      type = 'warning';
      break;
  }

  return (
    <Chip
      variant="filled"
      color={type}
      label={value}
      size="small"
    />
  );
}

function buildIconText(value) {
  if (value === 'Magic') {
    return (
      <span>
        <Flare
          fontSize="inherit"
          style={{
            display: 'inline-block',
            marginRight: '.3em',
            verticalAlign: 'sub',
            color: 'var(--primary-color)',
          }}
        /> {value}
      </span>

    );
  }
  if (value === 'Knowledge') {
    return (
      <span >
        {value}
        <Book
          fontSize="small"
          style={{
            display: 'inline-block',
            marginLeft: '.3em',
            verticalAlign: 'sub',
            color: 'var(--success-color)',
          }}
        />
      </span>
    );
  }

  return value;
}

function formatNumber(value) {
  return value.toLocaleString();
}

const data = [{
  id: 1,
  name: 'Frodo',
  steps: 1879202,
  kingdom: 'The Shire',
  weapon: 'Sting',
  race: 'Hobbit',
  filterKey: 'Frodo 1879202 The Shire Sting Hobbit',
},
{
  id: 2,
  name: 'Aragorn',
  steps: 32211,
  kingdom: 'Gondor',
  weapon: 'Anduril',
  race: 'Man',
  filterKey: 'Aragorn 32211 Gondor Anduril Man',
},
{
  id: 3,
  name: 'Galadriel',
  steps: 0,
  kingdom: 'Lothlorien',
  weapon: 'Knowledge',
  race: 'Elf',
  filterKey: 'Galadriel 0 Lothlorien Knowledge Elf',
},
{
  id: 4,
  name: 'Gandalf',
  steps: 1289300,
  kingdom: '',
  weapon: 'Magic',
  race: 'Wizard',
  filterKey: 'Gandalf 1289300 Magic Wizard',
}];

const columns = [
  {
    headerName: 'Id',
    field: 'id',
    width: 75,
  },
  {
    headerName: 'Name',
    field: 'name',
    renderCell: (params) => buildStringText(params.value),
  },
  {
    headerName: 'Steps',
    field: 'steps',
    align: 'right',
    width: 100,
    renderCell: (params) => formatNumber(params.value),
  },
  {
    headerName: 'Kingdom',
    field: 'kingdom',
  },
  {
    headerName: 'Weapon',
    field: 'weapon',
    renderCell: (params) => buildIconText(params.value),
  },
  {
    headerName: 'Race',
    field: 'race',
    renderCell: (params) => buildColoredText(params.value),
  },
];

function generateRows(numRows = 100) {
  const rows = [];
  for (let i = 0; i < numRows; i += 1) {
    const randomSelection = cloneDeep(data[i % data.length]);
    randomSelection.id = i;
    randomSelection.key = `table-${i}`;
    randomSelection.filterKey = `${randomSelection.filterKey} ${i}`;
    rows.push(randomSelection);
  }
  return rows;
}

const totalRows = generateRows(100);

const defaultTranslation = (key) => {
  switch (key) {
    case 'actions':
      return 'Actions';
    case 'search':
      return 'Search';
    case 'filter':
      return 'Filter';
    case 'columns':
      return 'Columns';
    default:
      return `—${key}—`;
  }
};

export default {
  title: 'Modules/DataGrid',
  tags: ['autodocs'],
  component: ({
    disableSort,
    numRows,
    ...args
  }) => {
    const cols = columns.map((col) => {
      return {
        ...col,
        disableSort,
      };
    });

    const rows = totalRows.slice(0, numRows);

    return (
      <DataGrid
        testId="data-grid-storybook"
        columns={cols}
        rows={rows}
        {...args}
      />
    );
  },
};

export const Primary = {
  args: {
    numRows: 7,
    paginate: false,
  },
};

export const MultiSelect = {
  args: {
    numRows: 7,
    multiSelect: true,
    onSelectedChange: (selectionModel) => {
      action('onSelectedChange')(selectionModel);
    },
  },
};

export const WithToolbar = {
  args: {
    disableToolbarFilterButton: false,
    numRows: 7,
    multiSelect: true,
    showToolbar: true,
    onSelectedChange: (selectionModel) => {
      action('onSelectedChange')(selectionModel);
    },
    toolbarActionItems: [
      { label: 'Action 1', value: 'action1' },
      { label: 'Action 2', value: 'action2' },
    ],
    onToolbarActionItemClick: (value, selectedRows) => {
      action('clicked action item')(value, selectedRows);
    },
    translate: defaultTranslation,
  },
};

export const WithToolbarHiddenButtonLabels = {
  args: {
    disableToolbarFilterButton: false,
    numRows: 7,
    multiSelect: true,
    showToolbar: true,
    showToolbarButtonLabels: false,
    onSelectedChange: (selectionModel) => {
      action('onSelectedChange')(selectionModel);
    },
    toolbarActionItems: [
      { label: 'Action 1', value: 'action1' },
      { label: 'Action 2', value: 'action2' },
    ],
    onToolbarActionItemClick: (value, selectedRows) => {
      action('clicked action item')(value, selectedRows);
    },
    translate: defaultTranslation,
  },
};

export const Paginated = {
  args: {
    numRows: 20,
    rowsPerPage: 5,
    paginate: true,
  },
};

export const Loading = {
  args: {
    numRows: 11,
    paginate: true,
    loading: true,
    rowsPerPage: 5,
  },
};

export const Empty = {
  args: {
    numRows: 0,
    paginate: true,
    loading: false,
    rowsPerPage: 5,
  },
};

export const ServerSideFiltering = {
  args: {
    numRows: 100,
    paginate: true,
    loading: false,
    rowsPerPage: 5,
    filterMode: 'server',
    showToolbar: true,
    translate: defaultTranslation,
    onFilterModelChange: (filterModel) => {
      action('onFilterModelChange')(filterModel);
    },
  },
};
