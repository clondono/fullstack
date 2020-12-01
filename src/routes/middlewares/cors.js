/* @flow */
const _ = require('lodash');
const Cors = require('@koa/cors');
const Config = require('../../includes/config.js');

const Cors_middleware = Cors({
  origin(ctx: any) {
    const request_origin: string = ctx.header.origin;
    const is_allowed: boolean = _.chain(Config.CLIENT_HOSTS.HIVE.concat(Config.CLIENT_HOSTS.BAIN))
      .filter(h => request_origin && request_origin.indexOf(h) !== -1)
      .find(h => !!h)
      .value();
    if (request_origin && (is_allowed || request_origin.indexOf('localhost') !== -1)) {
      return request_origin;
    }
    return `https://${Config.CLIENT_HOSTS.HIVE[0]}`;
  },
  methods      : ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
  credentials  : true,
  allowHeaders : ['access-control-allow-credentials','content-type'],

});

module.exports = Cors_middleware;
