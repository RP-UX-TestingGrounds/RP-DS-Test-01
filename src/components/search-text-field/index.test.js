import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchTextField from '.';

describe('SearchTextField', () => {
  afterEach(cleanup);

  function renderComponent(targetProps) {
    const defaultProps = {
      testId: 'search-text-field',
      placeholder: 'Search...',
    };

    const props = {
      ...defaultProps,
      ...targetProps,
    };

    return {
      user: userEvent.setup(),
      ...render(<SearchTextField {...props} />),
    };
  }

  it('renders with the required props', () => {
    const { container, getByTestId } = renderComponent({
      testId: 'search-text-field',
      placeholder: 'Search...',
    });
    expect(getByTestId('search-text-field')).toBeInTheDocument();

    // Search icon should be present
    const searchIcon = container.querySelector('svg[data-testid="SearchIcon"]');
    expect(searchIcon).toBeInTheDocument();

    // Clear icon should not be present since onClear is not provided
    const clearIcon = container.querySelector('svg[data-testid="ClearIcon"]');
    expect(clearIcon).not.toBeInTheDocument();
  });

  it('shows both search and clear icons when onClear is provided', async () => {
    const onClear = jest.fn();
    const { container, user } = renderComponent({ onClear });

    // Search icon should be present
    const searchIcon = container.querySelector('svg[data-testid="SearchIcon"]');
    expect(searchIcon).toBeInTheDocument();

    // Clear icon should be present when onClear is provided
    const clearIcon = container.querySelector('svg[data-testid="ClearIcon"]');
    expect(clearIcon).toBeInTheDocument();

    // Click the clear icon
    await user.click(clearIcon);

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
