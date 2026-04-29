import React from "react";

import '../src/styles/rp-ui.css';
import '../src/styles/global.css';
import RevolucciProvider from '../src/contexts/revoluccui-theme';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    docs: {
      codePanel: true,
    },
    backgrounds: {
      options: {
        card: { name: 'Card', value: '#FFFFFF' },
        surface: { name: 'Surface', value: '#f5f5f5' },
        yellow: { name: 'Yellow', value: '#FFF9E6' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'card' },
  },
  decorators: [
    (Story) => {
      return (
        <RevolucciProvider>
          <Story />
        </RevolucciProvider>
      );
    },
  ],
};

export default preview;
