import { extractSvgData, iconNameFromFilename } from './svg-config-utils.mjs';

describe('extractSvgData', () => {
  it('should extract viewBox and single path', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M12 2l10 20H2z"/></svg>';
    const result = extractSvgData(svg);

    expect(result.viewBox).toBe('0 0 24 24');
    expect(result.paths).toHaveLength(1);
    expect(result.paths[0].d).toBe('M12 2l10 20H2z');
  });

  it('should default viewBox to 0 0 24 24 when missing', () => {
    const svg = '<svg><path d="M0 0h24v24H0z"/></svg>';

    expect(extractSvgData(svg).viewBox).toBe('0 0 24 24');
  });

  it('should extract multiple paths', () => {
    const svg = `<svg viewBox="0 0 16 16">
      <path d="M0 0h8v8H0z"/>
      <path d="M8 8h8v8H8z"/>
    </svg>`;
    const result = extractSvgData(svg);

    expect(result.paths).toHaveLength(2);
    expect(result.paths[0].d).toBe('M0 0h8v8H0z');
    expect(result.paths[1].d).toBe('M8 8h8v8H8z');
  });

  it('should extract path-level fill, opacity, and fillRule', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <path d="M0 0z" fill="#FF0000" opacity="0.5" fill-rule="evenodd" clip-rule="evenodd"/>
    </svg>`;
    const result = extractSvgData(svg);

    expect(result.paths[0]).toEqual({
      d: 'M0 0z',
      fill: '#FF0000',
      opacity: '0.5',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    });
  });

  it('should extract stroke attributes', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M0 0z" stroke="#333" stroke-width="2"/></svg>';
    const result = extractSvgData(svg);

    expect(result.paths[0].stroke).toBe('#333');
    expect(result.paths[0].strokeWidth).toBe('2');
  });

  it('should extract fill-opacity', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M0 0z" fill-opacity="0.3"/></svg>';

    expect(extractSvgData(svg).paths[0].fillOpacity).toBe('0.3');
  });

  it('should not confuse fill-opacity with standalone opacity', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M0 0z" fill-opacity="0.3"/></svg>';
    const result = extractSvgData(svg);

    expect(result.paths[0].fillOpacity).toBe('0.3');
    expect(result.paths[0].opacity).toBeUndefined();
  });

  it('should extract standalone opacity alongside fill-opacity', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M0 0z" opacity="0.8" fill-opacity="0.3"/></svg>';
    const result = extractSvgData(svg);

    expect(result.paths[0].opacity).toBe('0.8');
    expect(result.paths[0].fillOpacity).toBe('0.3');
  });

  it('should ignore fill="none" and fill="currentColor"', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <path d="M0 0z" fill="none"/>
      <path d="M1 1z" fill="currentColor"/>
    </svg>`;
    const result = extractSvgData(svg);

    expect(result.paths[0].fill).toBeUndefined();
    expect(result.paths[1].fill).toBeUndefined();
  });

  it('should inherit group attributes onto child paths', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <g opacity="0.5" fill="#00FF00">
        <path d="M0 0z"/>
      </g>
    </svg>`;
    const result = extractSvgData(svg);

    expect(result.paths[0].opacity).toBe('0.5');
    expect(result.paths[0].fill).toBe('#00FF00');
  });

  it('should let path attributes override group attributes', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <g fill="#00FF00">
        <path d="M0 0z" fill="#FF0000"/>
      </g>
    </svg>`;
    const result = extractSvgData(svg);

    expect(result.paths[0].fill).toBe('#FF0000');
  });

  it('should ignore group fill="none"', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <g fill="none">
        <path d="M0 0z"/>
      </g>
    </svg>`;

    expect(extractSvgData(svg).paths[0].fill).toBeUndefined();
  });

  it('should clear inherited group fill when path sets fill="none"', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <g fill="#FF0000">
        <path d="M0 0z" fill="none"/>
      </g>
    </svg>`;

    expect(extractSvgData(svg).paths[0].fill).toBeUndefined();
  });

  it('should clear inherited group stroke when path sets stroke="none"', () => {
    const svg = `<svg viewBox="0 0 24 24">
      <g stroke="#333">
        <path d="M0 0z" stroke="none"/>
      </g>
    </svg>`;

    expect(extractSvgData(svg).paths[0].stroke).toBeUndefined();
  });

  it('should skip paths without a d attribute', () => {
    const svg = '<svg viewBox="0 0 24 24"><path fill="#000"/><path d="M0 0z"/></svg>';

    expect(extractSvgData(svg).paths).toHaveLength(1);
  });
});

describe('iconNameFromFilename', () => {
  it.each([
    ['chevron-left.svg', 'chevronLeft'],
    ['arrow_up.svg', 'arrowUp'],
    ['menu-hamburger.svg', 'menuHamburger'],
    ['simple.svg', 'simple'],
    ['already-camelCase.svg', 'alreadyCamelCase'],
    ['/some/path/to/my-icon.svg', 'myIcon'],
  ])('should convert %s to %s', (input, expected) => {
    expect(iconNameFromFilename(input)).toBe(expected);
  });
});

describe('extractSvgData integration', () => {
  it('should produce config matching icon-constants format (no name property)', () => {
    const svg = '<svg viewBox="0 0 48 48"><path d="M24 0L48 48H0z" fill="#2972D6"/></svg>';
    const config = extractSvgData(svg);

    expect(config).toEqual({
      viewBox: '0 0 48 48',
      paths: [
        { d: 'M24 0L48 48H0z', fill: '#2972D6' },
      ],
    });
    expect(config.name).toBeUndefined();
  });
});
