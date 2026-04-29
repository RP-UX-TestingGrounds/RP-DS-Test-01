import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/addon-styling-webpack",
    {
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [
          // Rule 1: rp-ui.css — plain CSS, no modules
          {
            test: /rp-ui\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  modules: false,
                },
              },
            ],
          },
          // Rule 2: TinyMCE skin/content CSS — plain CSS, no modules
          {
            test: /[\\/]tinymce[\\/].*\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: { modules: false },
              },
            ],
          },
          // Rule 3: Everything else — CSS Modules
          {
            test: /\.css$/,
            exclude: [/rp-ui\.css$/, /[\\/]tinymce[\\/]/],
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  modules: {
                    exportLocalsConvention: "camelCase",
                    localIdentName: "[local]___[hash:base64:5]",
                    exportOnlyLocals: false,
                  },
                },
              },
            ],
          },
        ],
      },
    },
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {},
    },
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },

  swc: () => ({
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true
      },
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  })
};
export default config;
