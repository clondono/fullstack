import { Context, Next } from 'koa';
import Config from '../../config';
import Decrypt from '../../includes/encryption/decrypt';

async function session_setter(ctx: Context, next: Next): Promise<Next> {
  const ctx_cookie = ctx.cookies.get(Config.SESSION_COOKIE);
  if (ctx_cookie && ctx_cookie !== 'null') {
    ctx.session = await Decrypt.decrypt(ctx_cookie);
  }
  if (!ctx.session) {
    ctx.session = {};
  }
  await next();
}

export default session_setter;
