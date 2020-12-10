import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ConditionalRoute({ component: Component, roles, conditionMet, redirectPath, ...rest }) {
    const user = useSelector(store => store.auth.user);

    return (
        <Route {...rest} render={props => {
            if (!conditionMet) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />
            }
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { ConditionalRoute };