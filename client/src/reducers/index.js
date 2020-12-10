import { combineReducers } from 'redux';

import { auth } from './auth';
// import { registration } from './registration';
// import { users } from './users';
import { alert } from './alert';

const rootReducer = combineReducers({
    auth,
    // registration,
    // users,
    alert
});

export default rootReducer;