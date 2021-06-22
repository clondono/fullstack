import { AUTH_CONSTANTS } from '../constants';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {
  loggedIn: false,
  loading: false,
  user: undefined,
  profile_loading: true,
  oldLogoutState: undefined,
};

export function auth(state = initialState, action: any) {
  const profile_loading = state.profile_loading;
  switch (action.type) {
    case AUTH_CONSTANTS.LOGIN_REQUEST:
      return {
        ...initialState,
        profile_loading,
        loading: true,
      };
    case AUTH_CONSTANTS.LOGIN_SUCCESS:
      return {
        ...initialState,
        profile_loading,
        loading: false,
        loggedIn: true,
        user: action.user,
      };
    case AUTH_CONSTANTS.LOGIN_FAILURE:
      return {
        ...initialState,
        profile_loading,
      };
    case AUTH_CONSTANTS.LOGOUT_REQUEST:
      return {
        ...initialState,
        profile_loading,
        laoding: true,
        oldLogoutState: state,
      };
    case AUTH_CONSTANTS.LOGOUT_SUCCESS:
      return {
        ...initialState,
        profile_loading,
      };
    case AUTH_CONSTANTS.LOGOUT_FAILURE:
      return state.oldLogoutState || initialState;
    case AUTH_CONSTANTS.FETCH_PROFILE_REQUEST:
      return {
        ...initialState,
        profile_loading: true,
      };
    case AUTH_CONSTANTS.FETCH_PROFILE_SUCCESS:
      return {
        ...initialState,
        profile_loading: false,
        loading: false,
        loggedIn: true,
        user: action.user,
      };
    case AUTH_CONSTANTS.FETCH_PROFILE_FAILURE:
      return initialState;
    default:
      return state;
  }
}
