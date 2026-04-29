/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { action } from 'storybook/actions';

import OmniSearchResultsGroup from './search-result-group';
import SearchResult from './search-result';

const sampleOrders = [
  {
    id: 123456, fullName: 'Tony Parker', date: 'June 6, 7:20 PM', price: 50.0, items: 3, href: '/orders/123456',
  },
  {
    id: 123457, fullName: 'Tim Duncan', date: 'June 5, 6:10 PM', price: 40.0, items: 2, href: '/orders/123457',
  },
  {
    id: 123458, fullName: 'Manu Ginóbili', date: 'June 4, 8:00 PM', price: 35.0, items: 1, href: '/orders/123458',
  },
  {
    id: 123459, fullName: 'Kawhi Leonard', date: 'June 3, 9:30 PM', price: 60.0, items: 4, href: '/orders/123459',
  },
];

export default {
  title: 'Components/Omnisearch/SearchResultGroup',
  component: OmniSearchResultsGroup,
  tags: ['autodocs'],
};

function TestSearchResult({ order, searchQuery, onNavigate }) {
  const header = `Order ${order.id}`;
  const description = `${order.fullName} • ${order.date} • ${Number(order.price ?? 0).toFixed(2)} for ${order.items} items`;

  return (
    <SearchResult
      href={order.href}
      header={header}
      description={description}
      searchQuery={searchQuery}
      testId={`test-search-result-${order.id}`}
      onNavigate={onNavigate}
      searchType="orders"
    />
  );
}

TestSearchResult.propTypes = {
  order: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
};

const Template = (args) => <OmniSearchResultsGroup {...args} />;

export const Orders = Template.bind({});
Orders.args = {
  results: sampleOrders,
  title: 'Orders',
  icon: 'orders',
  searchQuery: '1234',
  rowsDisplayed: 3,
  viewAllHref: '/orders?q=1234',
  searchType: 'orders',
  onNavigate: (href) => action('navigated to')(href),
  searchResult: (order, query, onNavigate) => (
    <TestSearchResult
      order={order}
      searchQuery={query}
      onNavigate={onNavigate}
      testId={`test-search-result-${order.id}`}
    />
  ),
};
