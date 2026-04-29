import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '.';
import CardHeader from './card-header';
import CardContent from './card-content';

describe('Card', () => {
  afterEach(cleanup);

  function renderComponent(props) {
    return render(
      <Card {...props} />,
    );
  }

  describe('Card', () => {
    it('should render with default props', () => {
      const { getByTestId } = renderComponent({
        children: <CardContent>Test Content</CardContent>,
      });
      const card = getByTestId('card');
      expect(card).toBeInTheDocument();
    });

    it('should render with custom testId', () => {
      const { getByTestId } = renderComponent({
        testId: 'custom-card',
        children: <CardContent>Test Content</CardContent>,
      });
      const card = getByTestId('custom-card');
      expect(card).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = renderComponent({
        children: <CardContent>Test Content</CardContent>,
      });
      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should pass through other props', () => {
      const { getByTestId } = renderComponent({
        children: <CardContent>Test Content</CardContent>,
        elevation: 3,
      });
      const card = getByTestId('card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('DefaultCardHeader', () => {
    it('should render when title prop is provided', () => {
      const { getByText } = renderComponent({
        title: 'Test Title',
        children: <CardContent>Test Content</CardContent>,
      });
      expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render when title prop is not provided', () => {
      const { queryByTestId } = renderComponent({
        children: <CardContent>Test Content</CardContent>,
      });
      expect(queryByTestId('card-header')).not.toBeInTheDocument();
    });

    it('should render with action prop', () => {
      const { getByText, getByRole } = renderComponent({
        title: 'Test Title',
        action: <button>Action Button</button>,
        children: <CardContent>Test Content</CardContent>,
      });
      expect(getByText('Test Title')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    it('should use custom testId for header', () => {
      const { getByTestId } = renderComponent({
        testId: 'custom-card',
        title: 'Test Title',
        children: <CardContent>Test Content</CardContent>,
      });
      expect(getByTestId('custom-card-header')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('should render with default props', () => {
      const { getByText } = render(
        <Card>
          <CardHeader title="Custom Header" />
        </Card>,
      );
      expect(getByText('Custom Header')).toBeInTheDocument();
    });

    it('should render with subheader', () => {
      const { getByText } = render(
        <Card>
          <CardHeader title="Custom Header" subheader="Subtitle" />
        </Card>,
      );
      expect(getByText('Custom Header')).toBeInTheDocument();
      expect(getByText('Subtitle')).toBeInTheDocument();
    });

    it('should render with action', () => {
      const { getByText, getByRole } = render(
        <Card>
          <CardHeader
            title="Custom Header"
            action={<button>Action</button>}
          />
        </Card>,
      );
      expect(getByText('Custom Header')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('should render with default props', () => {
      const { getByText } = render(
        <Card>
          <CardContent>Content Text</CardContent>
        </Card>,
      );
      expect(getByText('Content Text')).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = render(
        <Card>
          <CardContent>
            <div>Multiple</div>
            <div>Children</div>
          </CardContent>
        </Card>,
      );
      expect(getByText('Multiple')).toBeInTheDocument();
      expect(getByText('Children')).toBeInTheDocument();
    });
  });

  describe('Card composition', () => {
    it('should render all components together', () => {
      const { getByText } = render(
        <Card>
          <CardHeader title="Card Title" />
          <CardContent>Card Content</CardContent>
        </Card>,
      );
      expect(getByText('Card Title')).toBeInTheDocument();
      expect(getByText('Card Content')).toBeInTheDocument();
    });

    it('should render with default header and custom content', () => {
      const { getByText } = render(
        <Card title="Default Header">
          <CardContent>Custom Content</CardContent>
        </Card>,
      );
      expect(getByText('Default Header')).toBeInTheDocument();
      expect(getByText('Custom Content')).toBeInTheDocument();
    });
  });
});
