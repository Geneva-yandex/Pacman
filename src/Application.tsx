import React from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import Bundle from './components/Bundle';
import ErrorBoundary from './components/ErrorBoundary';
import {ConnectedRouter} from 'connected-react-router';
import {store, history} from './store/initClientStore';

axios.defaults.withCredentials = true;

export default class Application extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <ErrorBoundary>
                    <ConnectedRouter history={history}>
                        <Bundle/>
                    </ConnectedRouter>
                </ErrorBoundary>
            </Provider>
        );
    }
}
