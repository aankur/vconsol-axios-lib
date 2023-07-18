'use strict';
/* eslint-env jest */

const VconsolAxiosFactory = require('./index.js').default;

test('Validate VconsolAxiosFactory (cjs)', () => {
  const axios = VconsolAxiosFactory(null, 'https://example.com/', {
    apiKey: 'api-key-123',
    apiSecret: 'api-secret-1234567890'
  });
  expect(axios).toBeDefined();
  expect(axios.getUri()).toBe('https://example.com/');
});
