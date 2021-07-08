import { Context } from 'koa'

const route = async function (ctx: Context, next: Function) {
  ctx.session = {}

  ctx.status = 204
  ctx.body = {
    logged_out: true,
  }
  return next()
}

export default {
  route,
}
