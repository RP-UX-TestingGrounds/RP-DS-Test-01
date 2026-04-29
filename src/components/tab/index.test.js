import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Tab from '.';

describe('Tab', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      index,
      label,
      testId,
      ...rest
    } = props;

    return render(
      <Tab
        index={index}
        label={label}
        testId={testId}
        {...rest}
      />,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({
      label: 'My Tab',
      testId: 'test-id',
      index: 1,
    });
    const tab = getByTestId('test-id');
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent('My Tab');
    expect(tab).toHaveAttribute('index', '1');
  });

  it('should handle defaults', () => {
    const { getByTestId } = renderComponent({
      index: 1,
    });
    expect(getByTestId('tab-1')).toBeInTheDocument();
  });
});
