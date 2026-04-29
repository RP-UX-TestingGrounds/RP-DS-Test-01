import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchResult from './search-result';

jest.mock('../../utils/highlight-text', () => jest.fn((text) => text));

describe('SearchResult', () => {
  afterEach(cleanup);

  const defaultProps = {
    header: 'Order #12345',
    description: 'Shipped on 2023-10-15',
    href: '/orders/12345',
    searchQuery: 'order',
  };

  function renderComponent(props = {}) {
    return render(
      <SearchResult
        {...defaultProps}
        {...props}
      />,
    );
  }

  it('renders without crashing', () => {
    const { container } = renderComponent();
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('renders header and description', () => {
    const { getByText } = renderComponent();
    expect(getByText('Order #12345')).toBeInTheDocument();
    expect(getByText('Shipped on 2023-10-15')).toBeInTheDocument();
  });

  it('applies href when onNavigate is not provided', () => {
    const { container } = renderComponent({ href: '/orders/12345' });
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/orders/12345');
  });

  it('applies role=link when onNavigate is not provided', () => {
    const { container } = renderComponent({ href: '/orders/12345' });
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('role', 'link');
  });

  it('applies onClick when onNavigate is provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({ onNavigate });
    const link = container.querySelector('a');
    expect(link).not.toHaveAttribute('href');
  });

  it('applies role=button and tabIndex when onNavigate is provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({ onNavigate });
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('role', 'button');
    expect(link).toHaveAttribute('tabIndex', '0');
  });

  it('can receive focus when onNavigate is provided', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({ onNavigate });
    const link = container.querySelector('a');

    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it('calls onNavigate with href when clicked', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      href: '/orders/12345',
      onNavigate,
      searchType: 'orders',
    });

    const link = container.querySelector('a');
    await user.click(link);

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith('/orders/12345', 'orders', expect.any(Object));
  });

  it('applies custom testId', () => {
    const { container } = renderComponent({ testId: 'custom-test-id' });
    const link = container.querySelector('[data-test-id="custom-test-id"]');
    expect(link).toBeInTheDocument();
  });

  it('applies actionable class', () => {
    const { container } = renderComponent();
    const link = container.querySelector('a');
    expect(link).toHaveClass('actionable');
  });

  it('handles empty searchQuery', () => {
    const { getByText } = renderComponent({ searchQuery: '' });
    expect(getByText('Order #12345')).toBeInTheDocument();
  });

  it('handles missing href', () => {
    const onNavigate = jest.fn();
    const { container } = renderComponent({
      href: undefined,
      onNavigate,
    });

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });
});
