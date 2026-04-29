import React from 'react';
import { render, cleanup } from '@testing-library/react';

import TabPanel from '.';

describe('TabPanel', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      children,
      index,
      testId,
      value,
      ...rest
    } = props;
    return render(
      <TabPanel
        index={index ?? 0}
        value={value ?? 0}
        testId={testId}
        {...rest}
      >
        {children ?? (
          <div>
            <h1>My TabPanel</h1>
          </div>
        )}
      </TabPanel>,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent({});
    expect(getByTestId('tab-panel-0')).toBeInTheDocument();
  });

  it('should render chilren when index matches', () => {
    const { queryByText, getByTestId } = renderComponent({
      index: 0,
      value: 0,
      testId: 'new-test-id',
      children: (
        <div>
          <h1>Should Display</h1>
        </div>
      ),
    });
    expect(getByTestId('tab-panel-new-test-id')).toBeInTheDocument();
    expect(queryByText('Should Display')).toBeInTheDocument();
  });

  it('should NOT render chilren when index does not match', () => {
    const { queryByText, getByTestId } = renderComponent({
      index: 0,
      value: 1,
      testId: 'new-test-id',
      children: (
        <div>
          <h1>Should Not Display</h1>
        </div>
      ),
    });
    expect(getByTestId('tab-panel-new-test-id')).toBeInTheDocument();
    expect(queryByText('Should Not Display')).not.toBeInTheDocument();
  });
});
