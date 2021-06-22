// import Config from '../../config'
import { AUTH_CONSTANTS } from '../../constants';
import { authApis } from '../../apis';
import { alertActions } from '../../actions';

function login({ email, password }: { email: string; password: string }) {
  return async (dispatch: any) => {
    dispatch(request({ email }));
    const response = await authApis.login({ email, password });
    const { res, error } = response;
    if (error) {
      dispatch(failure(error.message.toString()));
      dispatch(alertActions.error(error.message.toString()));
      return;
    }
    return dispatch(success(res.user));
  };
  function request(user: any) {
    return { type: AUTH_CONSTANTS.LOGIN_REQUEST, user };
  }
  function success(user: any) {
    return { type: AUTH_CONSTANTS.LOGIN_SUCCESS, user };
  }
  function failure(error: any) {
    return { type: AUTH_CONSTANTS.LOGIN_FAILURE, error };
  }
}

export { login };
