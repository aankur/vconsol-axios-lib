"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SecureHasher {
  static hash(currentTimeFactory, apiSecret, body) {
    const utz = parseInt(Math.floor(currentTimeFactory.now() / 1000) / 300, 10);
    const key = utz + ':' + apiSecret;
    body = body || '';
    const hmac = _crypto.default.createHmac('sha256', key);
    const data = hmac.update(body);
    return data.digest('base64');
  }
}
var _default = SecureHasher;
exports.default = _default;