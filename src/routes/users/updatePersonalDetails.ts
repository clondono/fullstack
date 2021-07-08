import { Context } from 'koa'
import UsersUpdate from '../../includes/users/update'
import Validator from '../../includes/utils/validator'

const validateParams = async function (ctx: Context, next: Function) {
  const { user_id, company, first_name, last_name } = ctx._request.variables
  Validator.validateParams({
    params: {
      user_id: {
        required: true,
        value: user_id,
        type: 'string',
      },
      company: {
        required: false,
        value: company,
        type: 'string',
      },
      first_name: {
        required: false,
        value: first_name,
        type: 'string',
      },
      last_name: {
        required: false,
        value: last_name,
        type: 'string',
      },
    },
  })
  return next()
}

const route = async function (ctx: Context, next: Function) {
  const {
    user_id,
    company,
    first_name,
    last_name,
  }: {
    user_id: string
    company: string
    first_name: string
    last_name: string
  } = ctx._request.variables

  const user: any = await UsersUpdate.updatePersonalDetails({
    user_id,
    company,
    first_name,
    last_name,
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
