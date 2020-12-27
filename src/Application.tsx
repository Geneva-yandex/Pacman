import * as React from 'react';
import Router from './components/Router';
import Layout from './components/Layout';
import routes from './pages';
import ErrorBoundary from './components/ErrorBoundary';

export default class Application extends React.PureComponent {
    render() {
        return (
            <ErrorBoundary>
                <Router
                    layout={Layout}
                    routes={routes}
                />
            </ErrorBoundary>
        );
    }
}
