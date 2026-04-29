import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Dimmer from '.';

describe('Dimmer', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <Dimmer
        {...props}
      >
        <h1>Dimmer Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          vehicula, nunc nec bibendum fringilla, nunc nisi aliquet nunc,
          vitae aliquam nunc nisi euismod nunc. Donec vehicula, nunc nec
          bibendum fringilla, nunc nisi aliquet nunc, vitae aliquam nunc
          nisi euismod nunc. Donec vehicula, nunc nec bibendum fringilla,
        </p>
      </Dimmer>,
    );
  }

  it('renders without crashing', () => {
    const { getByRole } = renderComponent({
      active: false,
    });

    expect(getByRole('progressbar')).not.toBeVisible();
  });

  it('displays a spinner', () => {
    const { getByRole } = renderComponent({
      active: true,
    });

    expect(getByRole('progressbar')).toBeVisible();
  });

  it('renders with custom spinner', () => {
    const { getByTestId, queryByRole } = renderComponent({
      active: true,
      spinner: <div>Custom Spinner</div>,
    });

    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(getByTestId('dimmer-backdrop')).toHaveTextContent('Custom Spinner');
  });

  it('supports an onClick handler', () => {
    const handleClick = jest.fn();
    const { getByTestId } = renderComponent({
      active: true,
      onClick: handleClick,
    });

    const backdrop = getByTestId('dimmer-backdrop');
    backdrop.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
