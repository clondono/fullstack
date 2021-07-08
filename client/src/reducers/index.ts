import { combineReducers } from 'redux'
import { alert } from './alert'
import { auth } from './auth'

const rootReducer = combineReducers({
  auth,
  alert,
})

export default rootReducer
