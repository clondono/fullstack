import { Context } from 'koa'
import UsersUpdate from '../../includes/users/update'
import Validator from '../../includes/utils/validator'

const validateParams = async function (ctx: Context, next: Function) {
  const {
    user_id,
    password,
    new_password,
    new_password_confirm,
  }: {
    user_id: string
    password: string
    new_password: string
    new_password_confirm: string
  } = ctx._request.variables

  Validator.validateParams({
    params: {
      user_id: {
        required: true,
        value: user_id,
        type: 'string',
      },
      password: {
        required: true,
        value: password,
        type: 'string',
      },
      new_password: {
        required: true,
        value: new_password,
        type: 'string',
      },
      new_password_confirm: {
        required: true,
        value: new_password_confirm,
        type: 'string',
      },
    },
  })
  return next()
}
const route = async function (ctx: Context, next: Function) {
  const {
    user_id,
    password,
    new_password,
    new_password_confirm,
  }: {
    user_id: string
    password: string
    new_password: string
    new_password_confirm: string
  } = ctx._request.variables

  const user: any = await UsersUpdate.updatePassword({
    user_id,
    password,
    new_password,
    new_password_confirm,
  })

  ctx.status = 200
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
