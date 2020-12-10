/* @flow */

const _ = require('lodash');

const Config = require('../../config');
const Decrypt          = require('../../includes/encryption/decrypt.js') ;

async function session_setter(ctx: any, next: any) {
  if (ctx.cookies.get(Config.SESSION_COOKIE) && ctx.cookies.get(Config.SESSION_COOKIE) !== 'null') {
    ctx.session = await Decrypt.decrypt(ctx.cookies.get(Config.SESSION_COOKIE));
  }
  if (!ctx.session) {
    ctx.session = {};
  }
  await next();
}

module.exports = session_setter;
