/* @flow */

const _ = require('lodash');

async function session_setter(ctx: any, next: any) {
  ctx.intermediate = {};
  if (ctx.cookies.get('winnie') && ctx.cookies.get('winnie') !== 'null') {
    ctx.session = await ctx.cookies.get('winnie');
  }
  if (!ctx.session) {
    ctx.session = {};
  }
  await next();
}

module.exports = session_setter;
