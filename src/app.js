'use strict';
/* @flow */


const BodyParser = require('koa-bodyparser');
const Koa        = require('koa');
const KoaQS      = require('koa-qs');
const Process    = require('process');
const { join }   = require("path");

const Config        = require('./config/index.js');
const Router        = require('./routes/index.js');
const ClientRouter = require("./routes/middlewares/clientRouting.js");
const ErrorCaatcher = require("./routes/middlewares/errorCatcher.js");
const SessionSetter = require("./routes/middlewares/sessionSetter.js");

const client_build_path = join(__dirname, "../client/build");




function init(app: any) {
  app.proxy = true;
  app.use(SessionSetter);
  // app.use(Logger());
  app.use(ErrorCaatcher);
  app.use(BodyParser({ formLimit: '50mb', jsonLimit: '50mb' }));
  KoaQS(app, 'extended');

  // app.use(Cors);
  app.use(Router.routes());
  app.use(Router.allowedMethods());


const router_regexp_list = Router.stack.map((layer) => layer.regexp);

app.use(ClientRouter(client_build_path, "/index.html", router_regexp_list));
  // app.use(ContextSetter);
}

const app: any = new Koa();

// app.keys = ['aJ!^LP@924QAIPhU16vN' + Config.secret_key_postfix];
init(app);

console.log(`APP listening on PORT: ${Config.PORT}. PID: ${Process.pid}`);
