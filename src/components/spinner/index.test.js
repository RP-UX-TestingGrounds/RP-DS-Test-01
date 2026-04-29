import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Spinner from '.';

describe('Spinner', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <Spinner
        {...props}
      />,
    );
  }

  it('renders without crashing', () => {
    const { getByRole } = renderComponent();

    expect(getByRole('progressbar')).toBeInTheDocument();
    expect(getByRole('progressbar')).toHaveStyle({
      width: '44px',
      height: '44px',
    });
  });

  it('renders with small size', () => {
    const { getByRole } = renderComponent({
      size: 'small',
    });

    expect(getByRole('progressbar')).toHaveStyle({
      width: '20px',
      height: '20px',
    });
  });
  it('renders with large size', () => {
    const { getByRole } = renderComponent({
      size: 'large',
    });

    expect(getByRole('progressbar')).toHaveStyle({
      width: '66px',
      height: '66px',
    });
  });
  it('renders with huge size', () => {
    const { getByRole } = renderComponent({
      size: 'huge',
    });

    expect(getByRole('progressbar')).toHaveStyle({
      width: '88px',
      height: '88px',
    });
  });
});
