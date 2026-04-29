import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Tabs from '.';
import Tab from '../tab';

describe('Tabs', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      index,
      label,
      testId,
      ...rest
    } = props;

    return render(
      <Tabs
        index={index}
        label={label}
        testId={testId}
        {...rest}
      >
        <Tab
          index={0}
          testId={`${testId}-1`}
          label="Tab 1"
        />
        <Tab
          index={1}
          testId={`${testId}-2`}
          label="Tab 2"
        />
      </Tabs>,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({
      testId: 'test-id',
      selectedTabPanel: 1,
    });
    expect(getByTestId('tabs-test-id')).toBeInTheDocument();
    expect(getByTestId('test-id-1')).toBeInTheDocument();
    expect(getByTestId('test-id-1')).toHaveAttribute('aria-selected', 'false');
    expect(getByTestId('test-id-2')).toBeInTheDocument();
    expect(getByTestId('test-id-2')).toHaveAttribute('aria-selected', 'true');
  });

  it('should handle defaults', () => {
    const { getByTestId } = renderComponent({
      selectedTabPanel: 1,
    });
    expect(getByTestId('tabs-tabs-container')).toBeInTheDocument();
  });
});
