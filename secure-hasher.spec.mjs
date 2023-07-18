'use strict';
/* eslint-env jest */

import SecureHasher from './secure-hasher.mjs';

const currentDateTimeFactory = {
  now: function () {
    return 1000;
  }
};

test('Creates Hmac256 Hashes', () => {
  expect(SecureHasher.hash(currentDateTimeFactory, 'this-is-a-secret', 'This is a body')).toBe('YS2ApvEnrMv6jPLDaTELS0zfJUjSKpYg4inadHbD/yk=');
});
