import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IStore} from '../../store/types';
type PrivateRouteArgs = {
    path: string,
    exact: boolean,
    key: string,
    component: React.ComponentType,
};
export default function PrivateRoute({path, exact, key, component}: PrivateRouteArgs) {
    const userData = useSelector((state: IStore) => state.user);
    const isAuth = userData.item !== null;
    if (isAuth) {
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
