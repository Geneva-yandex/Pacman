import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {RouteType} from './types';
import PrivateRoute from '../PrivateRoute';
import routes from '../../pages/index';
import Layout from 'components/Layout';

const Bundle = () => {
    function renderRoute({path, exact, id, component, isProtected}: RouteType) {
        const routeProps = {path, exact: Boolean(exact), key: id, component};
        const RouteProvider = isProtected ? PrivateRoute : Route;
        return <RouteProvider {...routeProps} />;
    }

    return (
        <Layout>
            <Switch>
                {routes.map(route => renderRoute(route))}
            </Switch>
        </Layout>
    );
};

export default Bundle;
