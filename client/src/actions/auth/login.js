// import Config from '../../config'
import { AUTH_CONSTANTS } from '../../constants';
import { authApis } from '../../apis';
import { alertActions } from '../../actions';
import { history, getHttpActions } from '../../utils';


function login({email, password, from}) {

    return async dispatch => {
        dispatch(request({ email }));
        const response = await authApis.login({email, password})
        const {res, error} = response;
        if(error){
          dispatch(failure(error.message.toString()));
          dispatch(alertActions.error(error.message.toString()));
          return
        } 
        // localStorage.setItem('user', JSON.stringify(res.user));
        history.push(from);
        return dispatch(success(res.user))
    };

    function request(user) { return { type: AUTH_CONSTANTS.LOGIN_REQUEST, user } }
    function success(user) { return { type: AUTH_CONSTANTS.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: AUTH_CONSTANTS.LOGIN_FAILURE, error } }
}


export {
  login
}