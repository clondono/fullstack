
import _get from 'lodash/get';

// LOOK AT FSA TO UNDERSTAND THE STRUCTURE OF THIS ACTION
//https://github.com/redux-utilities/flux-standard-action
export const getActions = (type, meta = {}) => {
  return {
    succeeded: payload => ({
      type,
      meta,
      payload,
      loading : false,
      error   : false,
    }),
    requested: payload => ({
      type,
      meta,
      payload,
      loading : true,
      error   : false,
    }),
    failed: (payload) => ({
      type,
      meta,
      payload,
      error   : true,
      loading : false,
    }),
  };
};

export const getHttpActions = (
  type,
  meta = {},
) => getActions(
  type,
  {
    requireAuth : true,
    ...meta,
    isHttp      : true,
  }
);

export const isHttp = action => !!_get(action, ['meta', 'isHttp']);

export const requiresAuth = action => !!_get(action, ['meta', 'requireAuth']);

export const getErrorCode = (action) => action.error
  ? _get(action, ['payload', 'error', 'status'], null)
  : null;

// returns true if action is settled and successful
export const actionIsSuccessful = action => !!(
  !action.loading
  && !action.error
  && action.payload
);
