import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Tab from '../../components/tab';
import RevolucciProvider from '.';

describe('RevolucciProvider', () => {
  afterEach(cleanup);

  function renderComponent() {
    const index = 1;
    const label = 'My Tab';
    const testId = 'tab-test-id-1';

    return render(
      <RevolucciProvider>
        <Tab
          index={index}
          label={label}
          testId={testId}
        />
      </RevolucciProvider>,
    );
  }

  it('renders without crashing', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('tab-test-id-1')).toBeInTheDocument();
  });

  it('buttons should not have a ripple effect', () => {
    const { getByTestId } = renderComponent();
    const tab = getByTestId('tab-test-id-1');
    expect(tab).toBeInTheDocument();
    const button = tab.querySelector('span.MuiTouchRipple-root');
    expect(button).not.toBeInTheDocument();
  });
});
