import * as React from 'react';
import {Provider} from 'react-redux';
import Bundle from './components/Bundle';
import ErrorBoundary from './components/ErrorBoundary';
import {ConnectedRouter} from 'connected-react-router';
import {store, history} from './store/initClientStore';

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
