
const VconsolAxiosFactory = require('./vconsol-http-lib.cjs');
const MeetingService = require('./service/meeting-service.cjs');
const ScheduleService = require('./service/schedule-service.cjs');

class VconsolClient {
  #responseHandler;
  #meetingService;
  #scheduleService;

  constructor (baseURL, options) {
    this.#responseHandler = VconsolAxiosFactory(null, baseURL, options);
    this.#meetingService = new MeetingService(baseURL, this.#responseHandler);
    this.#scheduleService = new ScheduleService(this.#responseHandler);
  }

  get schedules () {
    return this.#scheduleService;
  }

  get meetings () {
    return this.#meetingService;
  }

  get responseHandler () {
    return this.#responseHandler;
  }
}

module.exports = function VconsolClientFactory (baseURL, options) {
  return new VconsolClient(baseURL, options);
}
