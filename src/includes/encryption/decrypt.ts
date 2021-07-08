/* @flow */

import bs58 from 'bs58'
import crypto from 'crypto'
import config from '../../config'
import CustomError from '../error/customError'
import ErrorOptions from '../error/errorOptions'

const ALGORITHM = config.LOGIN_ALGORITHM
const AES_KEY = config.LOGIN_AES_KEY
const HMAC_ALGORITHM = config.LOGIN_HMAC_ALGORITHM
const HMAC_KEY = config.LOGIN_HMAC_KEY
const HMAC_LENGTH = config.LOGIN_HMAC_LENGTH
const IV_LENGTH = config.LOGIN_IV_LENGTH

const decrypt = function (encrypted_string: string) {
  const buffer_data = bs58.decode(encrypted_string)
  const iv_data = buffer_data.slice(0, IV_LENGTH)
  const encrypted_data = buffer_data.slice(IV_LENGTH, buffer_data.length - HMAC_LENGTH)
  const hmac_data = buffer_data.slice(buffer_data.length - HMAC_LENGTH, buffer_data.length)

  const hmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY).update(encrypted_data)
  const digest = hmac.digest()

  if (String(digest) !== String(hmac_data)) {
    throw new CustomError(ErrorOptions.ENCRYPTION_FAILED)
  }

  const cipher = crypto.createDecipheriv(ALGORITHM, AES_KEY, iv_data)
  const dec = cipher.update(encrypted_data)
  const buffer = Buffer.concat([dec, cipher.final()])

  return JSON.parse(buffer.toString())
}

export default { decrypt }
