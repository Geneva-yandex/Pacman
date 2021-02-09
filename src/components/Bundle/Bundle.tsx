import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {RouteType} from './types';
import PrivateRoute from '../PrivateRoute';
import {hot} from 'react-hot-loader/root';
import {SignUpValueObject} from '../../types/UserTypes';
import Layout from '../Layout/Layout';
import routes from '../../pages/index';

class Bundle extends React.Component<{}> {
    user: {
        item: SignUpValueObject | null,
        status: string
    };

    public render() {
        return (
            <Layout>
                <Switch>
                    {routes.map(route => this.renderRoute(route))}
                </Switch>
            </Layout>
        );
    }

    renderRoute(route: RouteType) {
        if (route.isProtected) {
            let isExact = route.exact === true;
            return (
                <PrivateRoute
                    path={route.path}
                    exact={isExact}
                    key={route.id}
                    component={route.component}
                />
            );
        }

        return (
            <Route
                path={route.path}
                exact={route.exact}
                key={route.id}
                component={route.component}
            >
            </Route>
        );
    }
}

export default hot(Bundle);
