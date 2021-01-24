import * as React from 'react';
import {Provider} from 'react-redux';
import Router from './components/Router';
import Layout from './components/Layout';
import routes from './pages';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';
import checkForAuth from "./utils/checkForAuthOrRedirect";


export default class Application extends React.PureComponent {
    componentWillMount(): void {
        checkForAuth();
    }

    render() {
        return (
            <Provider store={store}>
                <ErrorBoundary>
                    <Router
                        layout={Layout}
                        routes={routes}
                    />
                </ErrorBoundary>
            </Provider>
        );
    }
}
