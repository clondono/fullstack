/* @flow */


module.exports = async function (ctx: any, next: any): any {
    ctx.session = {};

  ctx.status = 204;
  ctx.body = {
    logged_out:true
  };
  return next();
};
