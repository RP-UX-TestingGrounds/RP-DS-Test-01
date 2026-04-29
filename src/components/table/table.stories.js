import React from 'react';
import { cloneDeep } from 'lodash';
import { action } from 'storybook/actions';

import {
  AutoStories as Book,
  Flare,
} from '@mui/icons-material';

import SVG from '../svg';
import EmptyMessage from '../empty-message';
import Chip from '../chip';
import Table from './table';

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

const dataTemplates = {
  name: buildStringText,
  race: buildColoredText,
  weapon: buildIconText,
  steps: formatNumber,
};

const columns = [
  {
    label: 'Id',
    key: 'id',
  },
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Steps',
    key: 'steps',
    align: 'right',
    width: '100px',
  },
  {
    label: 'Kingdom',
    key: 'kingdom',
  },
  {
    label: 'Weapon',
    key: 'weapon',
  },
  {
    label: 'Race',
    key: 'race',
  }];

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

export default {
  title: 'Modules/Table',
  tags: ['autodocs'],
  component: ({
    disableSort,
    numRows,
    paginate,
    loading,
    multiselect,
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
      <Table
        testId="table-storybook-test"
        columns={cols}
        rows={rows}
        loading={loading}
        paginate={paginate}
        multiSelect={multiselect}
        templates={dataTemplates}
        {...args}
      />
    );
  },
};

export const Primary = {
  args: {
    disableSort: false,
    loading: false,
    numRows: 5,
    paginate: false,
    multiselect: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 10],
    page: 0,
  },
};

export const MultiSelect = {
  args: {
    disableSort: false,
    loading: false,
    numRows: 5,
    paginate: false,
    multiselect: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 10],
    page: 0,
    onSelectedChange: (selectionModel) => {
      action('onSelectedChange')(selectionModel);
    },
  },
};

export const Paginated = {
  args: {
    disableSort: false,
    loading: false,
    numRows: 11,
    paginate: true,
    multiselect: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 10],
    page: 0,
  },
};

export const Loading = {
  args: {
    disableSort: false,
    loading: true,
    numRows: 10,
    paginate: true,
    multiselect: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 10],
    page: 0,
  },
};

export const Empty = {
  args: {
    disableSort: false,
    loading: false,
    numRows: 0,
    paginate: false,
    multiselect: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 10],
    page: 0,
    noRowsMessage: (
      <EmptyMessage
        testId="empty-message"
        icon={<SVG svg="partsInOrbit" width={100} />}
        message="No data available"
      />
    ),
  },
};
