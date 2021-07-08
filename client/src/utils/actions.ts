import { get as _get } from 'lodash'

// LOOK AT FSA TO UNDERSTAND THE STRUCTURE OF THIS ACTION
//https://github.com/redux-utilities/flux-standard-action
export const getActions = (type: string, meta = {}) => {
  return {
    succeeded: (payload: any) => ({
      type,
      meta,
      payload,
      loading: false,
      error: false,
    }),
    requested: (payload: any) => ({
      type,
      meta,
      payload,
      loading: true,
      error: false,
    }),
    failed: (payload: any) => ({
      type,
      meta,
      payload,
      error: true,
      loading: false,
    }),
  }
}

export const getHttpActions = (type: string, meta = {}) =>
  getActions(type, {
    requireAuth: true,
    ...meta,
    isHttp: true,
  })

export const isHttp = (action: any) => !!_get(action, ['meta', 'isHttp'])

export const requiresAuth = (action: any) => !!_get(action, ['meta', 'requireAuth'])

export const getErrorCode = (action: any) => (action.error ? _get(action, ['payload', 'error', 'status'], null) : null)

// returns true if action is settled and successful
export const actionIsSuccessful = (action: any) => !!(!action.loading && !action.error && action.payload)
