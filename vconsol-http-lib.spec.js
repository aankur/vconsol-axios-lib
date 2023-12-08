'use strict';
/* eslint-env jest */

import VconsolAxiosFactory from './vconsol-http-lib.js';

describe('Validate VconsolAxiosFactory', () => {
  const axios = VconsolAxiosFactory(null, 'https://example.com/', {
    apiKey: 'api-key-123',
    apiSecret: 'api-secret-1234567890'
  });

  it('Creates Axios Object', () => {
    expect(axios).toBeDefined();
    expect(axios.getUri()).toBe('https://example.com/');
  });

  it('Adds Vconsol Headers', async () => {
    axios.interceptors.request.use(function (config) {
      expect(config.headers['X-API-KEY']).toBe('api-key-123');
      expect(config.headers['X-REQUEST-SIGNATURE']).toBeDefined();
      return Promise.reject(new Error('Test: request Cancelled'));
    });
    // Axios calls interceptors is reverse order
    axios.interceptors.request.handlers.reverse();
    return expect(axios.get('/external/api/v1/user/a@example.com')).rejects.toThrow('Test: request Cancelled');
  });
});
