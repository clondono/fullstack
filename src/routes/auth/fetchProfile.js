/* @flow */

const _            = require('lodash');

const AuthLogin = require('../../includes/auth/login.js') ;


module.exports = async function (ctx: any, next: any): any {
  ctx.status = 200;
  ctx.body = {
    user: ctx.session.user
  };

  return next();
};
