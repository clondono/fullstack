import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PrivateRoute({ component: Component, roles, ...rest }) {
    const user = useSelector(store => store.auth.user);

    return (
        <Route {...rest} render={props => {
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };