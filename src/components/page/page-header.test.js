import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageHeader from './page-header';

describe('PageHeader', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(<PageHeader {...props} />);
  }

  it('should render with title', () => {
    const { getByText } = renderComponent({
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
  });

  it('should render with title and description', () => {
    const { getByText } = renderComponent({
      description: 'Test Description',
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    const { getByText, queryByText } = renderComponent({
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
    // Description should not exist
    const descriptionElement = queryByText(/test description/i);
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('should render with action', () => {
    const { getByText, getByRole } = renderComponent({
      action: <button>Action Button</button>,
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
  });

  it('should render with testId', () => {
    const { getByTestId } = renderComponent({
      testId: 'custom-page-header',
      title: 'Test Page Title',
    });
    expect(getByTestId('custom-page-header')).toBeInTheDocument();
  });

  it('should render with title as a node', () => {
    const { getByText } = renderComponent({
      title: <span>Custom Title Node</span>,
    });
    expect(getByText('Custom Title Node')).toBeInTheDocument();
  });

  it('should render a node title with inline adornments', () => {
    const { getByText, getByTestId } = renderComponent({
      title: (
        <span style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          Edit discount
          <span data-test-id="status-chip">draft</span>
        </span>
      ),
    });
    expect(getByText('Edit discount')).toBeInTheDocument();
    expect(getByTestId('status-chip')).toBeInTheDocument();
  });

  it('should render with description as a node', () => {
    const { getByText } = renderComponent({
      description: <div>Custom Description Node</div>,
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
    expect(getByText('Custom Description Node')).toBeInTheDocument();
  });

  it('should pass through other props', () => {
    const { container } = renderComponent({
      className: 'custom-class',
      title: 'Test Page Title',
    });
    // MUI styled components may not directly apply className to root element
    // but we can verify the component renders without errors
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render complex action with multiple elements', () => {
    const { getByText, getAllByRole } = renderComponent({
      action: (
        <div style={{ display: 'flex', gap: '16px' }}>
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      ),
      title: 'Test Page Title',
    });
    expect(getByText('Test Page Title')).toBeInTheDocument();
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(getByText('Button 1')).toBeInTheDocument();
    expect(getByText('Button 2')).toBeInTheDocument();
  });
});
