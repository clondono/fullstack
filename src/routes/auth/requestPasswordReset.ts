import { Context } from 'koa'
import PasswordReset from '../../includes/auth/passwordReset'
import RouteUtils from '../../includes/utils/routes'
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
    },
  })
  return next()
}
const route = async function (ctx: Context, next: Function) {
  const endpoint: string = RouteUtils.fetchRequestURL(ctx)
  const email: string = ctx._request.variables.email

  const { display_message } = await PasswordReset.request({ endpoint, email })
  ctx.body = {
    message: display_message,
  }
  return next()
}

export default {
  route,
  validateParams,
}
