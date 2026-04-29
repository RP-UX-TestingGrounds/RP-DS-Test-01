import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Popover from './index';

describe('Popover', () => {
  afterEach(cleanup);

  let anchor;

  beforeEach(() => {
    anchor = document.createElement('div');
    document.body.appendChild(anchor);
  });

  afterEach(() => {
    document.body.removeChild(anchor);
  });

  function renderComponent(props = {}) {
    const {
      open = true,
      anchorElement = anchor,
      children = <span>Popover content</span>,
      ...rest
    } = props;

    return render(
      <Popover
        open={open}
        anchorElement={anchorElement}
        {...rest}
      >
        {children}
      </Popover>,
    );
  }

  it('should render children when open', () => {
    const { getByText } = renderComponent({});

    expect(getByText('Popover content')).toBeInTheDocument();
  });

  it('should call onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();

    const { getByRole } = renderComponent({
      onClose: handleClose,
    });

    const backdrop = getByRole('presentation').querySelector('.MuiBackdrop-root');
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should apply data-test-id to the paper element', () => {
    renderComponent({
      testId: 'my-popover',
    });

    const paper = document.querySelector('[data-test-id="my-popover"]');
    expect(paper).toBeInTheDocument();
  });

  it('should handle missing onClose gracefully', () => {
    const { getByRole } = renderComponent({});

    const backdrop = getByRole('presentation').querySelector('.MuiBackdrop-root');

    expect(() => fireEvent.click(backdrop)).not.toThrow();
  });
});
