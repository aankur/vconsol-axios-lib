import fs from 'fs';
import babel from '@babel/core';

fs.writeFileSync('current-time-factory.cjs', babel.transformFileSync('current-time-factory.js', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('secure-hasher.cjs', babel.transformFileSync('secure-hasher.js', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('vconsol-http-lib.cjs', babel.transformFileSync('vconsol-http-lib.js', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);

fs.writeFileSync('vconsol-client.cjs', babel.transformFileSync('vconsol-client.js', {
  plugins: [['@babel/plugin-transform-modules-commonjs', {
    allowTopLevelThis: true
  }]]
}).code);
