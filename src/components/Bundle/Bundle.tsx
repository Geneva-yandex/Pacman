import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import Layout from 'components/Layout';

import PrivateRoute from '../PrivateRoute';
import {RouteType} from './types';
import routes from '../../pages/index';

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

export default hot(Bundle);
