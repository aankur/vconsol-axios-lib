'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VconsolAxiosFactory;
var _axios = _interopRequireDefault(require("axios"));
var _ = _interopRequireWildcard(require("lodash"));
var _currentTimeFactory = _interopRequireDefault(require("./current-time-factory"));
var _secureHasher = _interopRequireDefault(require("./secure-hasher"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function requestInterceptor(config, apiKey, apiSecret) {
  const data = _.isString(config.data || '') ? config.data : JSON.stringify(config.data);
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
