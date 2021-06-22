import { Context } from 'koa';
import _ from 'lodash';

interface Request {
  ip: string;
  language: string[];
  user_agnet: string;
  variables: { [key: string]: any };
  files: any;
  app_domain: string;
  request_origin: string;
}
/**
 * creates customrequest object by combining all user passed params into one key and decoding other important header information
 * @param ctx
 * @param next
 */
async function requestSetter(ctx: Context, next: Function) {
  const _request_params: any = {};
  _request_params.ip = ctx.request.ip;
  if (_request_params.ip.substr(0, 7) === '::ffff:') {
    _request_params.ip = _request_params.ip.substr(7);
  }
  _request_params.language =
    (ctx.request && ctx.request.header && ctx.request.header['accept-language']) || []; // Always use lowercase for language
  _request_params.user_agent =
    ctx.request && ctx.request.header && ctx.request.header['user-agent'];
  _request_params.variables =
    ctx.request && ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body;
  _request_params.variables = _.merge(ctx.params, ctx.request.query, ctx.request.body);
  _request_params.files = ctx.request && ctx.request.files;
  _request_params.app_domain =
    ctx.request && ctx.request.header && ctx.request.header['xhr-domain'];
  _request_params.request_origin = ctx.request.header.origin;
  //$FlowFixMe
  const _request: Request = _request_params;
  ctx._request = _request;
  ctx.type = 'application/json';
  await next();
}

export default requestSetter;
