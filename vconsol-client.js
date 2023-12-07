"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VconsolClientFactory;
var _vconsolHttpLib = _interopRequireDefault(require("./vconsol-http-lib.mjs"));
var _meetingService = _interopRequireDefault(require("./service/meeting-service.mjs"));
var _scheduleService = _interopRequireDefault(require("./service/schedule-service.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class VconsolClient {
  #responseHandler;
  #meetingService;
  #scheduleService;
  constructor(baseURL, options) {
    this.#responseHandler = (0, _vconsolHttpLib.default)(null, baseURL, options);
    this.#meetingService = new _meetingService.default(baseURL, this.#responseHandler);
    this.#scheduleService = new _scheduleService.default(this.#responseHandler);
  }
  get schedules() {
    return this.#scheduleService;
  }
  get meetings() {
    return this.#meetingService;
  }
  get responseHandler() {
    return this.#responseHandler;
  }
}
function VconsolClientFactory(baseURL, options) {
  return new VconsolClient(baseURL, options);
}