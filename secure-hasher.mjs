import crypto from 'crypto';

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

export default SecureHasher;
