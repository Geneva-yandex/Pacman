import * as React from 'react';
import {Provider} from 'react-redux';
import Router from './components/Router';
import Layout from './components/Layout';
import routes from './pages';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';

export default class Application extends React.PureComponent {
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
