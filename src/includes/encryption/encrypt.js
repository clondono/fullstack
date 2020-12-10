/* @flow */
'use strict';

const Bluebird       = require('bluebird') ;

const crypto: any     = Bluebird.promisifyAll(require('crypto')) ;
const bs58           = require('bs58') ;

const config         = require('../../config/index.js') ;

const ALGORITHM      = config.LOGIN_ALGORITHM ;
const HMAC_ALGORITHM = config.LOGIN_HMAC_ALGORITHM ;
const HMAC_KEY       = config.LOGIN_HMAC_KEY ;
const AES_KEY        = config.LOGIN_AES_KEY ;
const IV_LENGTH      = config.LOGIN_IV_LENGTH ;
const IV_SALT        = config.LOGIN_IV_SALT ;
const IV_ITERATIONS  = config.LOGIN_IV_ITERATIONS ;

module.exports.encrypt = async (data: any): any => {
  const ivData              = await crypto.randomBytesAsync(IV_LENGTH) ;
  const cipher              = crypto.createCipheriv(ALGORITHM, AES_KEY, ivData) ;
  let encryptedData         = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  const bufferEncryptedData = Buffer.from(encryptedData, 'hex') ;

  const hmacData            = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY).update(bufferEncryptedData).digest();

  return bs58.encode(Buffer.concat( [ ivData, bufferEncryptedData, hmacData ] ) ) ;
} ;
