'use strict';

var axios = require('axios');
var isString = require('lodash/isString.js');
var crypto = require('crypto');

class CurrentTimeFactory {
  static now () {
    return Date.now();
  }
}

class SecureHasher {
  static hash (currentTimeFactory, apiSecret, body) {
    const utz = parseInt(Math.floor(currentTimeFactory.now() / 1000) / 300, 10);
    const key = utz + ':' + apiSecret;
    body = body || '';
    const hmac = crypto.createHmac('sha256', key);
    const data = hmac.update(body);
    return data.digest('base64');
  }
}

function requestInterceptor (config, apiKey, apiSecret) {
  const data = isString(config.data || '') ? config.data : JSON.stringify(config.data);
  const hash = SecureHasher.hash(CurrentTimeFactory, apiSecret, data);
  config.headers['X-API-KEY'] = apiKey;
  config.headers['X-REQUEST-SIGNATURE'] = hash;
  return config;
}

function VconsolAxiosFactory (optionalInstance, baseURL, options) {
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

class MeetingService {
  #baseURL;
  #responseHandler;
  constructor (baseURL, responseHandler) {
    this.#baseURL = baseURL;
    this.#responseHandler = responseHandler;
  }

  async joinAsModerator (joinMeetingParam, meetingUrlQueryParams) {
    const path = `/external/api/v1/pre-auth/meeting/moderator/${encodeURIComponent(joinMeetingParam.meetingID)}`;
    const { data } = await this.#responseHandler.post(
      path,
      joinMeetingParam
    );
    return this.#generateMeetingURL(data, meetingUrlQueryParams);
  }

  async joinAsActive (joinMeetingParam, meetingUrlQueryParams) {
    const path = `/external/api/v1/pre-auth/meeting/join/${encodeURIComponent(joinMeetingParam.meetingID)}`;
    const { data } = await this.#responseHandler.post(
      path,
      joinMeetingParam
    );
    return this.#generateMeetingURL(data, meetingUrlQueryParams);
  }

  async joinAsPassive (joinMeetingParam, meetingUrlQueryParams) {
    const path = `/external/api/v1/pre-auth/meeting/viewer/${encodeURIComponent(joinMeetingParam.meetingID)}`;
    const { data } = await this.#responseHandler.post(
      path,
      joinMeetingParam
    );
    return this.#generateMeetingURL(data, meetingUrlQueryParams);
  }

  #generateMeetingURL (response, meetingUrlQueryParams) {
    const buffer = Buffer.from(JSON.stringify(response), 'utf-8');
    const preAuthToken = encodeURIComponent(buffer.toString('base64'));
    const url = new URL(`/join/pre-auth/${preAuthToken}`, this.#baseURL);
    if (meetingUrlQueryParams != null) {
      for (const key of Object.keys(meetingUrlQueryParams)) {
        url.searchParams.append(key, meetingUrlQueryParams[key]);
      }
    }
    return {
      url: url.toString(),
      preAuthToken
    };
  }
}

class ScheduleService {
  #responseHandler;
  constructor (responseHandler) {
    this.#responseHandler = responseHandler;
  }

  async createMeetingSchedule (email, meetingScheduleParam) {
    const path = `/external/api/v1/schedules/${encodeURIComponent(email)}`;
    meetingScheduleParam.timeZone = meetingScheduleParam.timeZone || 'Asia/Kolkata';
    const { data } = await this.#responseHandler.post(
      path,
      meetingScheduleParam
    );
    return data;
  }
}

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

function VconsolClientFactory (baseURL, options) {
  return new VconsolClient(baseURL, options);
}

module.exports = VconsolClientFactory;
