import { Context } from 'koa'
import UsersGet from '../../includes/users/get'

const route = async function (ctx: Context, next: Function) {
  const user_id = ctx.session?.user?.user_id
  let user
  if (user_id) {
    try {
      user = await UsersGet.getByUserId({ user_id })
    } catch (e) {
      ctx.logger.error(e)
    }
    ctx.session = { user }
  }
  ctx.status = 200
  ctx.body = {
    user,
  }

  return next()
}

export default {
  route,
}
