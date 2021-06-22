import Cors from '@koa/cors';
import { Context } from 'koa';
import RouteUtils from '../../includes/utils/routes';

const Cors_middleware: any = Cors({
  origin(ctx: Context) {
    return RouteUtils.fetchRequestURL(ctx);
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowHeaders: ['Access-Control-Allow-Credentials', 'Content-Type'],
});

export default Cors_middleware;
