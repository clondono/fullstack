import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router';
import { Button } from 'antd'
import { history } from './utils';
import { alertActions, authActions } from './actions';
import { PrivateRoute,ConditionalRoute, HomePage, LoginPage } from './components';
// import { RegisterPage } from '../RegisterPage';
 
function App() {
    const user = useSelector(store => store.auth.user);
    const auth = useSelector(store => store.auth);
  
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.fetchProfile());
    }, []);
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);
    // console.log({auth, user, logged_in: !!user, not_logged_in: !user});
    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <BrowserRouter>
                        <Switch>
                            {/* <PrivateRoute exact path="/" component={HomePage} /> */}
                            <ConditionalRoute exact path="/" conditionMet={!!user} redirectPath='/login' component={HomePage} />
                            <ConditionalRoute path="/login" conditionMet={!user} redirectPath='/' component={LoginPage} />
                            <Route path="/login" component={LoginPage} />
                            {/* <Route path="/register" component={RegisterPage} /> */}
                            <Redirect from="*" to="/" />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}

export { App };