import * as React from 'react';
import Router from './components/Router';
import Layout from './components/Layout';
import routes from './pages';

export default class Application extends React.PureComponent {
    render() {
        return (
            <Router
                layout={Layout}
                routes={routes}
            />
        )
    }
}