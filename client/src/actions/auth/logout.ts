import { AUTH_CONSTANTS } from "../../constants";
import { authApis } from "../../apis";
import { alertActions } from "..";

function logout() {
  return async (dispatch: any) => {
    dispatch(request(undefined));
    const response = await authApis.logout();
    const { res, error } = response;
    if (error) {
      dispatch(failure(error.message.toString()));
      dispatch(alertActions.error(error.message.toString()));
      return;
    }
    return dispatch(success(res));
  };

  function request(_: any) {
    return { type: AUTH_CONSTANTS.LOGOUT_REQUEST, _ };
  }
  function success(_: any) {
    return { type: AUTH_CONSTANTS.LOGOUT_SUCCESS, _ };
  }
  function failure(error: any) {
    return { type: AUTH_CONSTANTS.LOGOUT_FAILURE, error };
  }
}

export { logout };
