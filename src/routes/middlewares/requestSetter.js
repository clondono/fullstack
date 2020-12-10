/* @flow */

const _       = require('lodash');
const Request = require('../request') ;


async function requestSetter(ctx: any, next: any) {
  const _request_params           = { } ;
  _request_params.ip = ctx.request.ip ;

  if (_request_params.ip.substr(0, 7) === '::ffff:') {
    _request_params.ip = _request_params.ip.substr(7);
  }
  _request_params.language = ctx.request && ctx.request.header && ctx.request.header['accept-language'] || []; // Always use lowercase for language
  _request_params.user_agent = ctx.request && ctx.request.header && ctx.request.header['user-agent'] ;
  _request_params.variables = ctx.request && ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body ;
  _request_params.variables = _.merge(ctx.params, ctx.request.query, ctx.request.body);
  _request_params.files = ctx.request && ctx.request.files ;
  // console.log(JSON.stringify({files: ctx.request.files}, null, 2));
  // console.log(JSON.stringify(
  //   {body: ctx.request.body}, null, 2));
  // console.log(JSON.stringify(ctx, null, 2));
  // console.log(ctx.req);
  // console.log(JSON.stringify(Object.keys(ctx.request), null, 2));
  _request_params.app_domain = ctx.request && ctx.request.header && ctx.request.header['xhr-domain'] ;
  _request_params.request_origin = ctx.request.header.origin;
  //$FlowFixMe
  const _request                        = new Request( _request_params ) ;
  ctx._request = _request ;
  ctx.type = 'application/json';

  await next();
}

module.exports = requestSetter;
