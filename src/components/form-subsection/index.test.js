import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormSubsection from '.';

describe('FormSubsection', () => {
  afterEach(cleanup);

  function renderComponent(props = {}) {
    return render(<FormSubsection {...props} />);
  }

  it('should render children', () => {
    const { getByText } = renderComponent({ children: <div>Body content</div> });
    expect(getByText('Body content')).toBeInTheDocument();
  });

  it('should apply testId to root', () => {
    const { getByTestId } = renderComponent({ testId: 'subsection-root', children: <div>Child</div> });
    expect(getByTestId('subsection-root')).toBeInTheDocument();
  });

  it('should render banner when provided', () => {
    const { getByText } = renderComponent({ banner: 'Banner text', children: <div>Child</div> });
    expect(getByText('Banner text')).toBeInTheDocument();
  });

  it('should render title and actions in toolbar', () => {
    const { getByText } = renderComponent({
      title: 'Section title',
      actions: <button type="button">Act</button>,
      children: <div>Child</div>,
    });
    expect(getByText('Section title')).toBeInTheDocument();
    expect(getByText('Act')).toBeInTheDocument();
  });

  it('should render actions without title', () => {
    const { getByText, queryByText } = renderComponent({
      actions: <button type="button">Only action</button>,
      children: <div>Child</div>,
    });
    expect(getByText('Only action')).toBeInTheDocument();
    expect(queryByText('Section title')).not.toBeInTheDocument();
  });
});
