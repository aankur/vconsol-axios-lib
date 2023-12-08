'use strict';

const axios = require('axios');
const isString = require('lodash/isString.js');
const CurrentTimeFactory = require('./current-time-factory.cjs');
const SecureHasher = require('./secure-hasher.cjs');

function requestInterceptor (config, apiKey, apiSecret) {
  const data = isString(config.data || '') ? config.data : JSON.stringify(config.data);
  const hash = SecureHasher.hash(CurrentTimeFactory, apiSecret, data);
  config.headers['X-API-KEY'] = apiKey;
  config.headers['X-REQUEST-SIGNATURE'] = hash;
  return config;
}

module.exports = function VconsolAxiosFactory (optionalInstance, baseURL, options) {
  if (options.apiKey == null) {
    throw new Error('Define "options.apiKey"');
  }
  if (options.apiSecret == null) {
    throw new Error('Define "options.apiSecret"');
  }
  const creator = optionalInstance || axios;
  const _baseURL = new URL(baseURL);
  const instance = creator.create({
    baseURL: _baseURL.toString(),
    timeout: options.timeout || 5_000,
    headers: options.headers || { 'Content-Type': 'application/json' }
  });
  instance.interceptors.request.use((config) => {
    return requestInterceptor(config, options.apiKey, options.apiSecret);
  }, function (error) {
    return Promise.reject(error);
  });
  return instance;
}
