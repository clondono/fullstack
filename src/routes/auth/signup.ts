import { Context } from 'koa';
import AuthSignup from '../../includes/auth/signup';
import Validator from '../../includes/utils/validator';

const validateParams = async function (ctx: Context, next: Function) {
  const { email, token, password, password_confirm, first_name, last_name } =
    ctx._request.variables;

  Validator.validateParams({
    params: {
      email: {
        required: true,
        value: email,
        type: 'email',
      },
      token: {
        required: true,
        value: token,
        type: 'string',
      },
      password: {
        required: true,
        value: password,
        type: 'string',
      },
      password_confirm: {
        required: true,
        value: password_confirm,
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
  });
  return next();
};
const route = async function (ctx: Context, next: Function) {
  const { email, token, password, password_confirm, first_name, last_name } =
    ctx._request.variables;

  const user: any = await AuthSignup.signup({
    email,
    token,
    password,
    password_confirm,
    first_name,
    last_name,
  });

  ctx.status = 202;
  ctx.session = { user };
  ctx.body = {
    user: user,
  };
  return next();
};

export default {
  route,
  validateParams,
};
