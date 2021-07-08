import { Context } from 'koa'
import AuthLogin from '../../includes/auth/login'
import Validator from '../../includes/utils/validator'

const validateParams = async function (ctx: Context, next: Function) {
  const email: string = ctx._request.variables.email
  const password: string = ctx._request.variables.password

  Validator.validateParams({
    params: {
      email: {
        required: true,
        value: email,
        type: 'email',
      },
      password: {
        required: true,
        value: password,
        type: 'string',
      },
    },
  })
  return next()
}
const route = async function (ctx: Context, next: Function) {
  const email: string = ctx._request.variables.email
  const password: string = ctx._request.variables.password

  const user: any = await AuthLogin.login({
    email,
    password,
  })

  ctx.status = 202
  ctx.session = { user }
  ctx.body = {
    user: user,
  }
  return next()
}

export default {
  route,
  validateParams,
}
