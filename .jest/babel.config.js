module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  }
};
