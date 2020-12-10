/* @flow */

const _ = require('lodash');
const ErrorOptions     = require('../../includes/error/errorOptions.js') ;
const CustomError        = require('../../includes/error/customError.js') ;

async function error_catcher(ctx: any, next: any) {
  try {
    await next();
    
  } catch (err) {
    console.error(err);
    let err_to_use: any = err; // TODO figure out this type
    if (!(err instanceof CustomError)) {
      err_to_use = new CustomError(ErrorOptions.UNKNOWN);
    }
    ctx.original_error = err;
    ctx.status = err_to_use.code || 500;
    ctx.body = {
      status  : ctx.status,
      message : err_to_use.error_string,
    };
  }
}

module.exports = error_catcher ;