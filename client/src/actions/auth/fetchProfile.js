// import Config from '../../config'
import { AUTH_CONSTANTS } from '../../constants';
import { authApis } from '../../apis';
import { alertActions } from '../../actions';
import { history, getHttpActions } from '../../utils';


function fetchProfile() {

    return async dispatch => {
        dispatch(request({ }));
        const response = await authApis.fetchProfile()
        const {res, error} = response;
        if(error){
          dispatch(failure(error.message.toString()));
          dispatch(alertActions.error(error.message.toString()));
          return
        } 
        return dispatch(success(res.user))
    };

    function request(user) { return { type: AUTH_CONSTANTS.FETCH_PROFILE_REQUEST, user } }
    function success(user) { return { type: AUTH_CONSTANTS.FETCH_PROFILE_SUCCESS, user } }
    function failure(error) { return { type: AUTH_CONSTANTS.FETCH_PROFILE_FAILURE, error } }
}


export {
  fetchProfile
}