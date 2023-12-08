export default class MeetingService {
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
