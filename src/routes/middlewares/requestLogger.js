//@flow

const Logger = require("../../includes/clients/logger.js");

const logger = new Logger();

module.exports = async function (ctx: any, next: any): any {
  const start_time = Date.now();

  await next();

  logger.info(`Request completed.`, {
    uri: ctx.path,
    route: ctx._matchedRoute,
    status: ctx.status,
    body_message: ctx.body?.message || "",
    headers: JSON.stringify(ctx.request.headers),
    response_time: Date.now() - start_time,
  });
};
