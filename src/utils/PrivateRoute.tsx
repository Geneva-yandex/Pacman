import React from 'react';
import {Redirect, Route} from 'react-router-dom';

type PrivateRouteArgs = {
    authed: boolean,
    path: string,
    exact: boolean,
    key: string,
    component: any,
};

export default function PrivateRoute({authed, path, exact, key, component}: PrivateRouteArgs) {
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
