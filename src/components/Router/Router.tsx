import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import {IRouterProps, RouteType} from './types';
import PrivateRoute from '../../utils/PrivateRoute';
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
    isAuthed: boolean;
    user: {
        item: SignUpValueObject | null,
        status: string
    };

    isAuthorized() {
        let {user} = this.props.state;

        if (user.item) {
            this.isAuthed = true;
        } else {
            this.isAuthed = false;
        }
    }

    componentDidMount(): void {
        this.isAuthorized();
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (prevProps.state.user.status !== this.props.state.user.status) {
            this.isAuthorized();

            this.forceUpdate();
        }
    }

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
                    authed={this.isAuthed}
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
