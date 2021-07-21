import { Context, Next } from 'koa';
import Send from 'koa-send';

export default function(
  root: string,
  index: string,
  allow_list: RegExp[],
): any {
  return async function(ctx: Context, next: Next): Promise<Next> {
    await next();

    if (allow_list.every((element) => element.test(ctx.path) === false)) {
      let path = ctx.path;
      if (/\.\w+$/.test(ctx.path) === false) {
        path = index;
      }

      await Send(ctx, path, { root });
    }
  };
}
