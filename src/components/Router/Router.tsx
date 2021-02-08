import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';
import PrivateRoute from '../PrivateRoute';

const Router = (props: IRouterProps) => {
    const Layout = props.layout;

    function renderRoute({path, exact, id, component, isProtected}: RouteType) {
        const routeProps = {path, exact: Boolean(exact), key: id, component};
        const RouteProvider = isProtected ? PrivateRoute : Route;
        return <RouteProvider {...routeProps} />;
    }

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {props.routes.map(route => renderRoute(route))}
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;
