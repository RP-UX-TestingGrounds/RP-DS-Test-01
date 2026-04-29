import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import OmniSearchResultsGroup from './search-result-group';

jest.mock('../icon', () => jest.fn(() => <div data-testid="mock-icon" />));

describe('OmniSearchResultsGroup', () => {
  afterEach(cleanup);

  const mockResults = [
    { id: '1', name: 'Result 1' },
    { id: '2', name: 'Result 2' },
    { id: '3', name: 'Result 3' },
    { id: '4', name: 'Result 4' },
    { id: '5', name: 'Result 5' },
  ];

  const defaultProps = {
    results: mockResults,
    searchQuery: 'test query',
    searchResult: (result) => <div key={result.id}>{result.name}</div>,
  };

  function renderComponent(props = {}) {
    return render(
      <OmniSearchResultsGroup
        {...defaultProps}
        {...props}
      />,
    );
  }

  it('renders without crashing', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('renders default number of results (3)', () => {
    const { getByText, queryByText } = renderComponent();
    expect(getByText('Result 1')).toBeInTheDocument();
    expect(getByText('Result 2')).toBeInTheDocument();
    expect(getByText('Result 3')).toBeInTheDocument();
    expect(queryByText('Result 4')).not.toBeInTheDocument();
    expect(queryByText('Result 5')).not.toBeInTheDocument();
  });

  it('respects rowsDisplayed prop', () => {
    const { getByText, queryByText } = renderComponent({ rowsDisplayed: 2 });
    expect(getByText('Result 1')).toBeInTheDocument();
    expect(getByText('Result 2')).toBeInTheDocument();
    expect(queryByText('Result 3')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const { getByText } = renderComponent({ title: 'Orders' });
    expect(getByText('Orders')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = renderComponent({ icon: 'search' });
    const icon = container.querySelector('[data-testid="mock-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders both icon and title', () => {
    const { getByText, container } = renderComponent({
      icon: 'search',
      title: 'Orders',
    });
    const icon = container.querySelector('[data-testid="mock-icon"]');
    expect(icon).toBeInTheDocument();
    expect(getByText('Orders')).toBeInTheDocument();
  });

  it('does not render header when neither icon nor title provided', () => {
    const { container } = renderComponent({ icon: null, title: '' });
    const headers = container.querySelectorAll('h3');
    expect(headers).toHaveLength(0);
  });

  it('renders view all link when viewAllHref and searchQuery provided', () => {
    const { getByText } = renderComponent({
      viewAllHref: '/orders?search=test',
      searchQuery: 'test query',
    });
    expect(getByText((content, element) => {
      return element.tagName === 'A' && content.includes('View all orders with') && content.includes('test query');
    })).toBeInTheDocument();
  });

  it('does not render view all link when viewAllHref missing', () => {
    const { queryByText } = renderComponent({
      viewAllHref: null,
      searchQuery: 'test query',
    });
    expect(queryByText(/View all orders with/)).not.toBeInTheDocument();
  });

  it('does not render view all link when searchQuery missing', () => {
    const { queryByText } = renderComponent({
      viewAllHref: '/orders?search=test',
      searchQuery: '',
    });
    expect(queryByText(/View all orders with/)).not.toBeInTheDocument();
  });

  it('applies href to view all link when onNavigate not provided', () => {
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
    });
    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');
    expect(link).toHaveAttribute('href', '/orders?search=test');
  });

  it('applies role=link to view all link when onNavigate not provided', () => {
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
    });
    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');
    expect(link).toHaveAttribute('role', 'link');
  });

  it('applies onClick to view all link when onNavigate provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
      onNavigate,
    });
    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');
    expect(link).not.toHaveAttribute('href');
  });

  it('applies role=button and tabIndex to view all link when onNavigate provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
      onNavigate,
    });
    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');
    expect(link).toHaveAttribute('role', 'button');
    expect(link).toHaveAttribute('tabIndex', '0');
  });

  it('view all link can receive focus when onNavigate is provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
      onNavigate,
    });
    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');

    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it('calls onNavigate with viewAllHref when view all link clicked', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      viewAllHref: '/orders?search=test',
      onNavigate,
      searchType: 'orders',
    });

    const link = container.querySelector('[data-test-id="search-result-group-view-all"]');
    await user.click(link);

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith('/orders?search=test', 'orders', expect.any(Object));
  });

  it('passes onNavigate to searchResult function', () => {
    const onNavigate = jest.fn();
    const searchResult = jest.fn(() => <div>Result</div>);

    renderComponent({ onNavigate, searchResult });

    expect(searchResult).toHaveBeenCalledWith(
      mockResults[0],
      'test query',
      onNavigate,
    );
  });

  it('applies custom testId', () => {
    const { container } = renderComponent({ testId: 'custom-test-id' });
    const element = container.querySelector('[data-test-id="custom-test-id"]');
    expect(element).toBeInTheDocument();
  });

  it('uses custom translate function', () => {
    const customTranslate = jest.fn(() => 'Custom translation');
    const { getByText } = renderComponent({
      viewAllHref: '/orders',
      translate: customTranslate,
    });

    expect(customTranslate).toHaveBeenCalledWith('viewAllOrdersWith', {
      searchQuery: 'test query',
    });
    expect(getByText('Custom translation')).toBeInTheDocument();
  });

  it('handles empty results array', () => {
    const { container } = renderComponent({ results: [] });
    expect(container).toBeInTheDocument();
  });

  it('handles results without id property', () => {
    const resultsWithoutIds = [
      { name: 'Result 1' },
      { name: 'Result 2' },
    ];
    const { getByText } = renderComponent({
      results: resultsWithoutIds,
      searchResult: (result) => <div key={result.name}>{result.name}</div>,
    });

    expect(getByText('Result 1')).toBeInTheDocument();
    expect(getByText('Result 2')).toBeInTheDocument();
  });

  it('renders React node when searchResult is not a function', () => {
    const { getAllByText } = renderComponent({
      searchResult: <div>Static Result</div>,
    });
    const staticResults = getAllByText('Static Result');
    expect(staticResults.length).toBeGreaterThan(0);
  });

  it('applies default testId when not provided', () => {
    const { container } = renderComponent();
    const element = container.querySelector('[data-test-id="search-result-group"]');
    expect(element).toBeInTheDocument();
  });
});
