/* @flow */

const _ = require('lodash');
const Config = require('../../config');
const Encrypt = require('../../includes/encryption/encrypt.js') ;

async function cookieSetter(ctx: any, next: any) {
  const encrypted_session: string = await Encrypt.encrypt(ctx.session);

  ctx.cookies.set(Config.SESSION_COOKIE, encrypted_session);
  await next();
}

module.exports = cookieSetter;
