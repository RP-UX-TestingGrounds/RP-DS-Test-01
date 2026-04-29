import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormFields from '.';

describe('FormFields', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <FormFields {...props} />,
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
      testId: 'custom-form-fields',
      children: <div>Test Content</div>,
    });
    const fields = getByTestId('custom-form-fields');
    expect(fields).toBeInTheDocument();
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
          <div>First Field</div>
          <div>Second Field</div>
          <div>Third Field</div>
        </>
      ),
    });
    expect(getByText('First Field')).toBeInTheDocument();
    expect(getByText('Second Field')).toBeInTheDocument();
    expect(getByText('Third Field')).toBeInTheDocument();
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
