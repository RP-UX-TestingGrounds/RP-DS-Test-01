import { render } from '@testing-library/react';
import highlightText from './highlight-text';

describe('highlightText', () => {
  it('returns plain text when query is empty', () => {
    const result = highlightText('Hello World', '');
    expect(result).toBe('Hello World');
  });

  it('highlights a single match', () => {
    const { container } = render(<>{highlightText('Hello World', 'World')}</>);
    const em = container.querySelector('em');

    expect(em).toBeInTheDocument();
    expect(em).toHaveTextContent('World');
  });

  it('highlights multiple occurrences of the query', () => {
    const { container } = render(<>{highlightText('test TEST TeSt', 'test')}</>);
    const spans = container.querySelectorAll('em');

    expect(spans.length).toBe(3);
    spans.forEach((em) => {
      expect(em).toHaveTextContent(/test/i);
    });
  });

  it('is case-insensitive', () => {
    const { container } = render(<>{highlightText('Hello WORLD', 'world')}</>);
    const em = container.querySelector('em');

    expect(em).toBeInTheDocument();
    expect(em.textContent).toBe('WORLD');
  });

  it('handles regex special characters in the query', () => {
    const { container } = render(<>{highlightText('a+b*c?', 'a+b*c?')}</>);
    const em = container.querySelector('em');

    expect(em).toBeInTheDocument();
    expect(em.textContent).toBe('a+b*c?');
  });

  it('returns plain text if there is no match', () => {
    const { container } = render(<>{highlightText('Hello World', 'xyz')}</>);
    expect(container.querySelector('em')).toBeNull();
    expect(container.textContent).toBe('Hello World');
  });
});
