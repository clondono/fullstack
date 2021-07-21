import { Context, Next } from 'koa';
import Logger from '../../includes/clients/logger';

const logger = new Logger();

export default async function(ctx: Context, next: Next): Promise<Next> {
  const start_time = Date.now();

  await next();

  logger.info('Request completed.', {
    uri           : ctx.path,
    route         : ctx._matchedRoute,
    status        : ctx.status,
    /* @ts-ignore */
    body_message  : ctx?.body?.message || '',
    // headers: JSON.stringify(ctx.request.headers),
    response_time : Date.now() - start_time,
  });
}
