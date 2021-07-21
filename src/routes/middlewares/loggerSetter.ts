import { Context, Next } from 'koa';
import Logger from '../../includes/clients/logger';

async function logger_setter(ctx: Context, next: Next): Promise<Next> {
  ctx.logger = new Logger();
  await next();
}

export default logger_setter;
