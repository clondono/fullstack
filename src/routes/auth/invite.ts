import { Context } from 'koa';
import AuthInvite from '../../includes/auth/invite';
import RouteUtils from '../../includes/utils/routes';
import Validator from '../../includes/utils/validator';

const validateParams = async function (ctx: Context, next: Function) {
  const email: string = ctx._request.variables.email;
  Validator.validateParams({
    params: {
      email: {
        required: true,
        value: email,
        type: 'email',
      },
    },
  });
  return next();
};

const route = async function (ctx: Context, next: Function) {
  const email: string = ctx._request.variables.email;
  const endpoint: string = RouteUtils.fetchRequestURL(ctx);
  const invite_res: any = await AuthInvite.invite({ email, endpoint });
  ctx.status = 200;
  ctx.body = {
    message: 'Success',
    invite_res,
  };

  return next();
};

export default {
  route,
  validateParams,
};
