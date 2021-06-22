/* @flow */

import Bluebird from 'bluebird';
import Bs58 from 'bs58';
import Crypto from 'crypto';
import Config from '../../config/index';
//TODO better promisify definitions
const { randomBytesAsync, createCipheriv, createHmac }: any = Bluebird.promisifyAll(Crypto);

const ALGORITHM = Config.LOGIN_ALGORITHM;
const HMAC_ALGORITHM = Config.LOGIN_HMAC_ALGORITHM;
const HMAC_KEY = Config.LOGIN_HMAC_KEY;
const AES_KEY = Config.LOGIN_AES_KEY;
const IV_LENGTH = Config.LOGIN_IV_LENGTH;
const IV_SALT = Config.LOGIN_IV_SALT;
const IV_ITERATIONS = Config.LOGIN_IV_ITERATIONS;

const encrypt = async (data: any) => {
  const ivData = await randomBytesAsync(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, AES_KEY, ivData);
  let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  const bufferEncryptedData = Buffer.from(encryptedData, 'hex');

  const hmacData = createHmac(HMAC_ALGORITHM, HMAC_KEY).update(bufferEncryptedData).digest();

  return Bs58.encode(Buffer.concat([ivData, bufferEncryptedData, hmacData]));
};

export default { encrypt };
