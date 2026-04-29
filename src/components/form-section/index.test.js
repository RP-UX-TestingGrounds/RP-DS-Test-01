import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormSection from '.';

describe('FormSection', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <FormSection {...props} />,
    );
  }

  it('should render with default props', () => {
    const { container } = renderComponent({
      children: <div>Test Content</div>,
    });
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with custom testId', () => {
    const { getByTestId } = renderComponent({
      testId: 'custom-form-section',
      children: <div>Test Content</div>,
    });
    const section = getByTestId('custom-form-section');
    expect(section).toBeInTheDocument();
  });

  it('should render children', () => {
    const { getByText } = renderComponent({
      children: <div>Test Content</div>,
    });
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    const { getByText } = renderComponent({
      children: (
        <>
          <div>First Child</div>
          <div>Second Child</div>
        </>
      ),
    });
    expect(getByText('First Child')).toBeInTheDocument();
    expect(getByText('Second Child')).toBeInTheDocument();
  });

  it('should render with title', () => {
    const { getByText } = renderComponent({
      title: 'Section Title',
      children: <div>Test Content</div>,
    });
    expect(getByText('Section Title')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should not render title when title prop is not provided', () => {
    const { queryByText } = renderComponent({
      children: <div>Test Content</div>,
    });
    const content = queryByText('Test Content');
    expect(content).toBeInTheDocument();
    // Check that no title element exists
    expect(content.previousSibling).toBeNull();
  });

  it('should apply custom className', () => {
    const { container } = renderComponent({
      className: 'custom-class',
      children: <div>Test Content</div>,
    });
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    const { container } = renderComponent({
      children: <div>Test Content</div>,
      'data-custom': 'value',
    });
    expect(container.firstChild).toHaveAttribute('data-custom', 'value');
  });
});
