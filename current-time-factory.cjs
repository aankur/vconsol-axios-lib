"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class CurrentTimeFactory {
  static now() {
    return Date.now();
  }
}
var _default = CurrentTimeFactory;
exports.default = _default;