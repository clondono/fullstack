import { Context, Next } from 'koa';
import Config from '../../config';
import Encrypt from '../../includes/encryption/encrypt';

async function cookieSetter(ctx: Context, next: Next): Promise<Next> {
  const encrypted_session: string = await Encrypt.encrypt(ctx.session);
  ctx.cookies.set(Config.SESSION_COOKIE, encrypted_session);
  await next();
}

export default cookieSetter;
