'use strict';
/* @flow */


const BodyParser = require('koa-body');
const Koa        = require('koa');
const KoaQS      = require('koa-qs');
const logger = require("koa-logger");
const Process    = require('process');
const { join }   = require("path");

const Config        = require('./config/index.js');
const Router        = require('./routes/index.js');
const ClientRouter = require("./routes/middlewares/clientRouting.js");
const RequestLogger = require("./routes/middlewares/requestLogger.js");

const Cors         = require('./routes/middlewares/cors.js');
const ErrorCaatcher = require("./routes/middlewares/errorCatcher.js");
const SessionSetter = require("./routes/middlewares/sessionSetter.js");
const CookieSetter = require("./routes/middlewares/cookieSetter.js");

const client_build_path = join(__dirname, "../client/build");

function init(app): any {
  app.proxy = true;
  app.use(BodyParser());
  app.use(SessionSetter);
  app.use(ErrorCaatcher);
  KoaQS(app, 'extended');
  app.use(Cors);
  const router_regexp_list = Router.stack.map((layer) => layer.regexp);
  app.use(ClientRouter(client_build_path, "/index.html", router_regexp_list));
  app.use(logger());
  app.use(RequestLogger);
  app.use(Router.routes());
  app.use(Router.allowedMethods());
  app.use(CookieSetter);
  // return app.listen(Config.PORT);
}

const app: any = new Koa();
init(app);

console.log(`APP listening on PORT: ${Config.PORT}. PID: ${Process.pid}`);
//$FlowFixMe
module.exports = app.listen(Config.PORT);
