import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder required by @mui/x-data-grid
// Jest's jsdom environment doesn't expose these, even though Node 18+ has them globally
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ testIdAttribute: 'data-test-id' });
