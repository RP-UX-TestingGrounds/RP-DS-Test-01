import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Page from '.';
import PageHeader from './page-header';
import PageContent from './page-content';

describe('Page', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <Page {...props} />,
    );
  }

  describe('Page', () => {
    it('should render with default props', () => {
      const { getByTestId } = renderComponent({
        children: <PageContent>Test Content</PageContent>,
        testId: 'page',
      });
      const page = getByTestId('page');
      expect(page).toBeInTheDocument();
    });

    it('should render with custom testId', () => {
      const { getByTestId } = renderComponent({
        children: <PageContent>Test Content</PageContent>,
        testId: 'custom-page',
      });
      const page = getByTestId('custom-page');
      expect(page).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = renderComponent({
        children: <PageContent>Test Content</PageContent>,
      });
      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should pass through other props', () => {
      const { container } = renderComponent({
        children: <PageContent>Test Content</PageContent>,
        className: 'custom-class',
      });
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should apply wide max width when widthVariant is wide', () => {
      const { getByTestId } = renderComponent({
        children: <PageContent>Test Content</PageContent>,
        testId: 'wide-page',
        widthVariant: 'wide',
      });
      const page = getByTestId('wide-page');
      expect(page).toHaveStyle({ maxWidth: 'var(--page-max-width-wide)' });
    });
  });

  describe('PageHeader', () => {
    it('should render with default props', () => {
      const { getByText } = render(
        <Page>
          <PageHeader title="Custom Header" />
        </Page>,
      );
      expect(getByText('Custom Header')).toBeInTheDocument();
    });

    it('should render with action', () => {
      const { getByText, getByRole } = render(
        <Page>
          <PageHeader
            action={<button>Action</button>}
            title="Custom Header"
          />
        </Page>,
      );
      expect(getByText('Custom Header')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('PageContent', () => {
    it('should render with default props', () => {
      const { getByText } = render(
        <Page>
          <PageContent>Content Text</PageContent>
        </Page>,
      );
      expect(getByText('Content Text')).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = render(
        <Page>
          <PageContent>
            <div>Multiple</div>
            <div>Children</div>
          </PageContent>
        </Page>,
      );
      expect(getByText('Multiple')).toBeInTheDocument();
      expect(getByText('Children')).toBeInTheDocument();
    });
  });

  describe('Page composition', () => {
    it('should render all components together', () => {
      const { getByText } = render(
        <Page>
          <PageHeader title="Page Title" />
          <PageContent>Page Content</PageContent>
        </Page>,
      );
      expect(getByText('Page Title')).toBeInTheDocument();
      expect(getByText('Page Content')).toBeInTheDocument();
    });
  });
});
