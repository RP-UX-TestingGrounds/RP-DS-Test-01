import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Drawer from './index';

describe('Drawer', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      open = true,
      ...rest
    } = props;

    return render(
      <Drawer
        open={open}
        {...rest}
      />,
    );
  }

  describe('Drawer', () => {
    it('should render when open', () => {
      const { getByTestId } = renderComponent({
        title: 'Test Drawer',
        testId: 'test-drawer',
      });
      expect(getByTestId('test-drawer')).toBeInTheDocument();
    });

    it('should not render content when closed', () => {
      const { queryByText } = renderComponent({
        open: false,
        title: 'Test Drawer',
      });
      expect(queryByText('Test Drawer')).not.toBeInTheDocument();
    });

    it('should render title when provided', () => {
      const { getByText } = renderComponent({
        title: 'Test Title',
      });
      expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      const { queryByText } = renderComponent({
        children: <div>Content</div>,
      });
      expect(queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = renderComponent({
        children: <div>Child Content</div>,
      });
      expect(getByText('Child Content')).toBeInTheDocument();
    });
  });

  describe('DefaultHeader', () => {
    it('should render close button when onClose is provided', () => {
      const handleClose = jest.fn();
      const { getByRole } = renderComponent({
        title: 'Test Drawer',
        onClose: handleClose,
      });

      const closeButton = getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const handleClose = jest.fn();
      const { getByRole } = renderComponent({
        title: 'Test Drawer',
        onClose: handleClose,
      });

      const closeButton = getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('backdrop interaction', () => {
    it('should call onClose on backdrop click when allowBackdropClose is true', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderComponent({
        title: 'Test Drawer',
        onClose: handleClose,
        allowBackdropClose: true,
        testId: 'test-drawer',
      });

      const backdrop = getByTestId('test-drawer').querySelector('.MuiBackdrop-root');
      expect(backdrop).toBeInTheDocument();
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on backdrop click when allowBackdropClose is false', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderComponent({
        title: 'Test Drawer',
        onClose: handleClose,
        allowBackdropClose: false,
        testId: 'test-drawer',
      });

      const backdrop = getByTestId('test-drawer').querySelector('.MuiBackdrop-root');
      expect(backdrop).toBeInTheDocument();
      fireEvent.click(backdrop);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
});
