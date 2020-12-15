import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';

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
        )
    }

    renderRoute(route: RouteType) {
        const Component = route.component;

        return (
            <Route
                path={route.path}
                exact={route.exact}
                key={route.id}
            >
                <Component/>
            </Route>
        )
    }
}