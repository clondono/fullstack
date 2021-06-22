import { Context } from 'koa';
import Config from '../../config';

function fetchRequestURL(ctx: Context): string {
  const request_origin: string = ctx.header.origin;
  const is_allowed: boolean = !!request_origin && request_origin.indexOf(Config.CLIENT_HOST) !== -1;

  if (request_origin && (is_allowed || request_origin.indexOf('localhost') !== -1)) {
    return request_origin;
  }
  return `https://${Config.CLIENT_HOST}`;
}
export default {
  fetchRequestURL,
};
