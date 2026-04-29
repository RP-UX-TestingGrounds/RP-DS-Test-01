module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // disable body and footer max line length
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
