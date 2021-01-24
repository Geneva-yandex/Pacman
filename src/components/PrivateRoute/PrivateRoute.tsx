import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {state} from '../../store/types';
type PrivateRouteArgs = {
    path: string,
    exact: boolean,
    key: string,
    component: any,
};
export default function PrivateRoute({path, exact, key, component}: PrivateRouteArgs) {
    const userData = useSelector((state : state) => state.user);
    let authed = false;

    if (userData.item) {
        authed = true;
    }

    if (authed) {
        return (
            <Route
                path={path}
                exact={exact}
                key={key}
                component={component}
            />
        );
    }

    return (
        <Redirect
            to={'/login'}
        >
        </Redirect>
    );
}
