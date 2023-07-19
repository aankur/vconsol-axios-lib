const fs = require('fs');
const babel = require('@babel/core');

fs.writeFileSync('current-time-factory.js', babel.transformFileSync('current-time-factory.mjs', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('secure-hasher.js', babel.transformFileSync('secure-hasher.mjs', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('index.js', babel.transformFileSync('index.mjs', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);
