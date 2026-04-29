import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Modal from './index';

describe('Modal', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    const {
      open = true,
      ...rest
    } = props;

    return render(
      <Modal
        open={open}
        {...rest}
      />,
    );
  }

  describe('Modal', () => {
    it('should render with default props', () => {
      const { getByRole } = renderComponent({
        title: 'Test Modal',
      });
      const dialog = getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('should handle user interactions', () => {
      const handleClose = jest.fn();
      const { getByRole } = renderComponent({
        title: 'Test Modal',
        onClose: handleClose,
      });

      const closeButton = getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('DefaultTitle', () => {
    it('should render with default props', () => {
      const { getByText } = renderComponent({
        title: 'Test Title',
      });
      expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('should handle user interactions', () => {
      const handleClose = jest.fn();
      const { getByRole } = renderComponent({
        title: 'Test Title',
        onClose: handleClose,
      });

      const closeButton = getByRole('button');
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('DefaultActions', () => {
    it('should render with default props', () => {
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
      });
      expect(getByText('—cancel—')).toBeInTheDocument();
      expect(getByText('—submit—')).toBeInTheDocument();
    });

    it('should handle user interactions', () => {
      const handleClose = jest.fn();
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onClose: handleClose,
        onSubmit: handleSubmit,
      });

      const cancelButton = getByText('—cancel—');
      const submitButton = getByText('—submit—');

      fireEvent.click(cancelButton);
      expect(handleClose).toHaveBeenCalledTimes(1);

      fireEvent.click(submitButton);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should handle prop changes', () => {
      const handleSubmit = jest.fn();
      const { rerender, getByText } = renderComponent({
        onSubmit: handleSubmit,
      });

      expect(getByText('—cancel—')).toBeInTheDocument();

      rerender(
        <Modal
          open={true}
          onSubmit={handleSubmit}
          translate={(key) => `custom_${key}`}
        />,
      );

      expect(getByText('custom_cancel')).toBeInTheDocument();
      expect(getByText('custom_submit')).toBeInTheDocument();
    });
  });

  describe('defaultTranslation', () => {
    it('should execute without errors', () => {
      // This is tested indirectly through DefaultActions
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
      });
      expect(getByText('—cancel—')).toBeInTheDocument();
    });

    it('should handle valid inputs', () => {
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
      });
      expect(getByText('—cancel—')).toBeInTheDocument();
      expect(getByText('—submit—')).toBeInTheDocument();
    });

    it('should handle edge cases', () => {
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
        translate: (key) => (key === 'cancel' ? '' : `—${key}—`),
      });
      expect(getByText('—submit—')).toBeInTheDocument();
    });

    it('should handle invalid inputs', () => {
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
        translate: (key) => (key === 'cancel' ? null : `—${key}—`),
      });
      expect(getByText('—submit—')).toBeInTheDocument();
    });
  });

  describe('Modal functionality', () => {
    it('should handle custom translate function', () => {
      const customTranslate = (key) => `custom_${key}`;
      const handleSubmit = jest.fn();
      const { getByText } = renderComponent({
        onSubmit: handleSubmit,
        translate: customTranslate,
      });
      expect(getByText('custom_cancel')).toBeInTheDocument();
      expect(getByText('custom_submit')).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      const { queryByRole } = renderComponent({
        open: false,
        title: 'Test Modal',
      });
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render without title when not provided', () => {
      const { queryByText } = renderComponent({
        message: 'Test message',
      });
      expect(queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('should render without message when not provided', () => {
      const { queryByText } = renderComponent({
        title: 'Test Modal',
      });
      expect(queryByText('Test message')).not.toBeInTheDocument();
    });

    it('should render without actions when onSubmit is not provided', () => {
      const { queryByText } = renderComponent({
        title: 'Test Modal',
      });
      expect(queryByText('—cancel—')).not.toBeInTheDocument();
      expect(queryByText('—submit—')).not.toBeInTheDocument();
    });
  });
});
