import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Alert, { ALERT_SEVERITIES } from '.';
import RevolucciProvider from '../../contexts/revoluccui-theme';

describe('Alert', () => {
  afterEach(cleanup);

  function renderComponent(props = {}) {
    return render(
      <RevolucciProvider>
        <Alert {...props} />
      </RevolucciProvider>,
    );
  }

  it('renders without crashing', () => {
    const { getByRole } = renderComponent({
      children: 'Something went wrong.',
    });
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('renders message as children', () => {
    const { getByRole, getByText } = renderComponent({
      children: 'You have added [chip label] to both lists.',
    });
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByText('You have added [chip label] to both lists.')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const { getByText } = renderComponent({
      title: 'Conflict in Product Targeting',
      children: 'Please remove it from one of the lists.',
    });
    expect(getByText('Conflict in Product Targeting')).toBeInTheDocument();
    expect(getByText('Please remove it from one of the lists.')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    const { getByRole, queryByText } = renderComponent({
      children: 'Message only.',
    });
    expect(getByRole('alert')).toBeInTheDocument();
    expect(queryByText('Conflict in Product Targeting')).not.toBeInTheDocument();
  });

  it('uses error severity by default', () => {
    const { getByRole } = renderComponent({
      children: 'Error message',
    });
    const alert = getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.className).toMatch(/standardError|colorError|MuiAlert/);
  });

  it('applies testId when provided', () => {
    const { getByTestId } = renderComponent({
      children: 'Message',
      testId: 'alert-error',
    });
    expect(getByTestId('alert-error')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const { getByRole } = renderComponent({
      children: 'Dismissible message',
      onClose,
    });
    const closeButton = getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when onClose is not provided', () => {
    const { getByRole, queryByRole } = renderComponent({
      children: 'Message',
    });
    expect(getByRole('alert')).toBeInTheDocument();
    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders with each severity without crashing', () => {
    ALERT_SEVERITIES.forEach((severity) => {
      const { getByRole, unmount } = renderComponent({
        severity,
        title: `${severity} title`,
        children: `${severity} message`,
      });
      expect(getByRole('alert')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    const { getByRole } = renderComponent({
      children: 'Message',
      className: 'custom-alert',
    });
    const alert = getByRole('alert');
    expect(alert).toHaveClass('custom-alert');
  });
});
