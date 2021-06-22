import { Context } from 'koa';
import Logger from '../../includes/clients/logger';
import CustomError from '../../includes/error/customError';
import ErrorOptions from '../../includes/error/errorOptions';

const logger = new Logger();

async function error_catcher(ctx: Context, next: Function) {
  try {
    await next();
  } catch (err) {
    logger.error(`Error: ${err.message}\n${err.stack}`, {
      uri: ctx.path,
      body: JSON.stringify(ctx.request.body),
      headers: JSON.stringify(ctx.request.headers),
    });
    let err_to_use: any = err; // TODO figure out this type
    if (!(err instanceof CustomError)) {
      err_to_use = new CustomError(ErrorOptions.UNKNOWN);
    }
    ctx.original_error = err;
    ctx.status = err_to_use.code || 500;
    ctx.body = {
      status: ctx.status,
      message: err_to_use.error_string,
    };
  }
}

export default error_catcher;
