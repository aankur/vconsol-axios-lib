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

fs.writeFileSync('vconsol-http-lib.js', babel.transformFileSync('vconsol-http-lib.mjs', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('vconsol-client.js', babel.transformFileSync('vconsol-client.mjs', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);
