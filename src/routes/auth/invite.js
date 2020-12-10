/* @flow */

const _            = require('lodash');

const AuthInvite = require('../../includes/auth/invite.js') ;

module.exports = async function (ctx: any, next: any): any {
  const email: string    = ctx._request.variables.email;
  
  const invite_res: any = await AuthInvite.inviteUsers([{email}]);

  ctx.status = 201;
  ctx.body = invite_res;

  return next();
};
