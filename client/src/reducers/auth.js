import { AUTH_CONSTANTS } from '../constants';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {
  loggedIn: false,
  loggingIn: false,
  loggingOut: false,
  user: undefined,
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_CONSTANTS.LOGIN_REQUEST:
        case AUTH_CONSTANTS.FETCH_PROFILE_REQUEST:
          return {
              ...initialState,
              loggingIn: true,
              user: action.user
            };
        case AUTH_CONSTANTS.LOGIN_SUCCESS:
        case AUTH_CONSTANTS.FETCH_PROFILE_SUCCESS:
          return {
              ...initialState,
              loggedIn: true,
              user: action.user
            };
        case AUTH_CONSTANTS.LOGIN_FAILURE:
        case AUTH_CONSTANTS.FETCH_PROFILE_FAILURE:
          return initialState;
        case AUTH_CONSTANTS.LOGOUT_REQUEST:
          return {
              ...initialState,
              loggingOut: true,
              oldLogoutState: state
            };
        case AUTH_CONSTANTS.LOGOUT_SUCCESS:
          return initialState;
        case AUTH_CONSTANTS.LOGOUT_FAILURE:
          return state.oldLogoutState || initialState;
        default:
          return state
    }
}