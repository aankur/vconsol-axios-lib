'use strict';

import axios from 'axios';
import * as _ from 'lodash';
import CurrentTimeFactory from './current-time-factory.mjs';
import SecureHasher from './secure-hasher.mjs';

function requestInterceptor (config, apiKey, apiSecret) {
  const data = _.isString(config.data || '') ? config.data : JSON.stringify(config.data);
  const hash = SecureHasher.hash(CurrentTimeFactory, apiSecret, data);
  config.headers['X-API-KEY'] = apiKey;
  config.headers['X-REQUEST-SIGNATURE'] = hash;
  return config;
}

export default function VconsolAxiosFactory (optionalInstance, baseURL, options) {
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
