/* @flow */
const _ = require('lodash');
const Cors = require('@koa/cors');
const Config = require('../../config/index.js');

// $FlowFixMe
const Cors_middleware: any = Cors({
  origin(ctx: any) {
    const request_origin: string = ctx.header.origin;
    const is_allowed: boolean = !!request_origin && request_origin.indexOf(Config.CLIENT_HOST) !== -1;

    if (request_origin && (is_allowed || request_origin.indexOf('localhost') !== -1)) {
      return request_origin;
    }
    return `https://${Config.CLIENT_HOST}`;
  },
  methods      : ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
  credentials  : true,
  allowHeaders : ['access-control-allow-credentials','content-type'],

});

module.exports = Cors_middleware;
