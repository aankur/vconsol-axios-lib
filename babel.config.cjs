module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    ['@babel/plugin-transform-modules-commonjs', {
      allowTopLevelThis: true,
      importInterop: 'none',
      removeImport: true
    }]
  ]
};
