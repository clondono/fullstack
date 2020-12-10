/* @flow */

const _            = require('lodash');

const AuthLogin = require('../../includes/auth/login.js') ;


module.exports = async function (ctx: any, next: any): any {
  const email: string        = ctx._request.variables.email;
  const password: string     = ctx._request.variables.password;
    console.log({email, password})
  const user: any = await AuthLogin.login({
    email,
    password,
  });

  ctx.status = 202;
  ctx.session = { user: user };
  ctx.body = {
    user: user,
  };

  return next();
};
