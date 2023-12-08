# Vconsol Nodejs client library

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

## Installation

### Requirements

- Node.js 16 or later

### Npm users

```
npm install aankur/vconsol-node-client@tag
```

Request Params defined here: [Request Params](https://github.com/aankur/vconsol-java-client/tree/master/src/main/java/com/techgentsia/param)

## Usage

Sample.js


```javascript

import VconsolClientFactory from 'vconsol-node-client';
const vconsolClient = VconsolClientFactory('https://your-tenant"', {
  apiKey: 'your api key',
  apiSecret: 'Your api secret'
});

//To Create a Meeting
const data = await vconsolClient.schedules.createMeetingSchedule('sample@example.com', {
  title: 'sample meeting',
  description: 'sample description',
  startTime: '2023-12-12T10:40:00+5:30',// ISO 8601 Timestamp format without seconds
  endTime: '2023-12-13T10:40:00+5:30'
});

//To Join as Moderator
const data = await vconsolClient.meetings.joinAsModerator({
  meetingID: 'Meeting ID',
  name: 'Name of Moderator',
  password: 'Meeting Password'
});

//To Join as Active
const data = await vconsolClient.meetings.joinAsActive({
  meetingID: 'Meeting ID',
  name: 'Name of Active Participant',
  password: 'Meeting Password'
});

//To Join as Passive
const data = await vconsolClient.meetings.joinAsPassive({
  meetingID: 'Meeting ID',
  name: 'Name of Passive Participant',
  password: 'Passive Password'
});

```
