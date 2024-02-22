export default class RecordingService {
  #responseHandler;

  constructor (responseHandler) {
    this.#responseHandler = responseHandler;
  }

  async getRecordings (recordingParams) {
    const path = '/external/api/v1/recordings/filter/meetings';
    recordingParams.page = recordingParams.page || 0;
    recordingParams.size = recordingParams.size || 10;
    const { data } = await this.#responseHandler.get(
      path,
      {
        data: recordingParams.meetings,
        params: {
          page: recordingParams.page,
          size: recordingParams.size
        }
      }
    );
    return data;
  }
}
