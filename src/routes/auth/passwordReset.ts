import { Context } from 'koa';
import AuthLogin from '../../includes/auth/login';
import PasswordReset from '../../includes/auth/passwordReset';
import CustomError from '../../includes/error/customError';
import ErrorOptions from '../../includes/error/errorOptions';
import Validator from '../../includes/utils/validator';

const validateParams = async function (ctx: Context, next: Function) {
  const { user_id, email, token, new_password, new_password_confirm } = ctx._request.variables;

  Validator.validateParams({
    params: {
      email: {
        required: true,
        value: email,
        type: 'email',
      },
      user_id: {
        required: true,
        value: user_id,
        type: 'string',
      },
      token: {
        required: true,
        value: token,
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
  });
  return next();
};
const route = async function (ctx: Context, next: Function) {
  const { user_id, email, token, new_password, new_password_confirm } = ctx._request.variables;

  if (new_password != new_password_confirm) {
    throw new CustomError(ErrorOptions.PASSWORDS_MISMATCH);
  }

  await PasswordReset.reset({ user_id, token, new_password, new_password_confirm });

  const user = await AuthLogin.login({
    email,
    password: new_password,
  });

  ctx.status = 202;
  ctx.session = { user };
  ctx.body = {
    user: user,
    message: 'Password has been successfully reset.',
  };
  return next();
};

export default {
  route,
  validateParams,
};
