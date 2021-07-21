import { Context, Next } from 'koa';

const route = async function(ctx: Context, next: Next): Promise<Next> {
  ctx.session = {};

  ctx.status = 204;
  ctx.body = {
    logged_out : true,
  };
  return next();
};

export default {
  route,
};
