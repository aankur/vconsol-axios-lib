'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VconsolAxiosFactory;
var _axios = _interopRequireDefault(require("axios"));
var _isString = _interopRequireDefault(require("lodash/isString.js"));
var _currentTimeFactory = _interopRequireDefault(require("./current-time-factory.mjs"));
var _secureHasher = _interopRequireDefault(require("./secure-hasher.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function requestInterceptor(config, apiKey, apiSecret) {
  const data = (0, _isString.default)(config.data || '') ? config.data : JSON.stringify(config.data);
  const hash = _secureHasher.default.hash(_currentTimeFactory.default, apiSecret, data);
  config.headers['X-API-KEY'] = apiKey;
  config.headers['X-REQUEST-SIGNATURE'] = hash;
  return config;
}
function VconsolAxiosFactory(optionalInstance, baseURL, options) {
  if (options.apiKey == null) {
    throw new Error('Define "options.apiKey"');
  }
  if (options.apiSecret == null) {
    throw new Error('Define "options.apiSecret"');
  }
  const creator = optionalInstance || _axios.default;
  const _baseURL = new URL(baseURL);
  const instance = creator.create({
    baseURL: _baseURL.toString(),
    timeout: options.timeout || 5_000,
    headers: options.headers || {
      'Content-Type': 'application/json'
    }
  });
  instance.interceptors.request.use(config => {
    return requestInterceptor(config, options.apiKey, options.apiSecret);
  }, function (error) {
    return Promise.reject(error);
  });
  return instance;
}