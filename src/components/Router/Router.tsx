import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';
import PrivateRoute from '../PrivateRoute';
import {SignUpValueObject} from '../../types/types';

class Router extends React.Component<IRouterProps> {
    user: {
        item: SignUpValueObject | null,
        status: string
    };

    public render() {
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

export default (Router);
