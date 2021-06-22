import Koa from 'koa';
import BodyParser from 'koa-body';
import koa_logger from 'koa-logger';
import KoaQS from 'koa-qs';
import { join } from 'path';
import Process from 'process';
import Config from './config';
import Logger from './includes/clients/logger';
import Router from './routes/index';
import ClientRouter from './routes/middlewares/clientRouting';
import CookieSetter from './routes/middlewares/cookieSetter';
import Cors from './routes/middlewares/cors';
import ErrorCaatcher from './routes/middlewares/errorCatcher';
import LoggerSetter from './routes/middlewares/loggerSetter';
import RequestLogger from './routes/middlewares/requestLogger';
import SessionSetter from './routes/middlewares/sessionSetter';

const logger = new Logger();
const client_build_path = join(__dirname, '../client/build');

/**
 *  A Helper funciton that encapsulates all the middleware added to Koa app
 * @param app
 */
function init(app: Koa): void {
  app.proxy = true;
  app.use(
    BodyParser({
      // formidable:{uploadDir: './uploads'},
      multipart: true,
      urlencoded: true,
    })
  );
  app.use(SessionSetter);
  app.use(LoggerSetter);
  app.use(ErrorCaatcher);
  KoaQS(app, 'extended');
  app.use(Cors);
  const router_regexp_list = Router.stack.map((layer: any) => layer.regexp);
  app.use(ClientRouter(client_build_path, '/index.html', router_regexp_list));
  app.use(koa_logger());
  app.use(RequestLogger);
  app.use(Router.routes());
  app.use(Router.allowedMethods());
  app.use(CookieSetter);
}

const app = new Koa();
init(app);

logger.log(`APP listening on PORT: ${Config.PORT}. PID: ${Process.pid}`);
module.exports = app.listen(Config.PORT);
