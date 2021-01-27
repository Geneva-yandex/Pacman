import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';
import PrivateRoute from '../../utils/PrivateRoute';

export default class Router extends React.PureComponent<IRouterProps> {
    render() {
        const Layout = this.props.layout;
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        {this.props.routes.map(route => this.renderRoute(route))}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }

    renderRoute(route: RouteType) {
        if (route.isProtected) {
            return (
                <PrivateRoute
                    path={route.path}
                    exact={route.exact}
                    key={route.id}
                    component={route.component}
                >
                </PrivateRoute>
            );
        }

        return (
            <Route
                path={route.path}
                exact={route.exact}
                key={route.id}
                component={route.component}
            >
                {/* <Component/> */}
            </Route>
        );
    }
}
