/* @flow */

const _            = require('lodash');

const UsersUpdate = require('../../includes/users/update.js') ;


module.exports = async function (ctx: any, next: any): any {
  const {
    user_id,
    password,
    new_password,
  }: { 
    user_id: string,
    password: string,
    new_password: string,
  } = ctx._request.variables;
  
  const user: any = await UsersUpdate.updatePassword({
    user_id,
    password,
    new_password,
  });

  ctx.status = 200;
  ctx.session = { user };
  ctx.body = {
    user: user,
  };

  return next();
};
