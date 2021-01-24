import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';
import PrivateRoute from '../PrivateRoute';
import {connect} from 'react-redux';
import {state as StateTyping} from '../../store/types';
import {SignUpValueObject} from '../../types/types';

type StateProps = {
    state: unknown
};

interface Props extends IRouterProps {
    state: StateTyping
}

class Router extends React.Component<Props> {
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
            return (
                <PrivateRoute
                    path={route.path}
                    exact={route.exact}
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

const mapStateToProps = (state: unknown): StateProps => ({
    state
});

export default connect(mapStateToProps)(Router);
