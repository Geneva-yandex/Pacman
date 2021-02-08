import {applyMiddleware, createStore, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory, createMemoryHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducer';
import isServer from '../misc/utils/isServer';
import {IStoreOptions} from './types';

const configureStore = (options?: IStoreOptions) => {
    const history = isServer ?
        createMemoryHistory({initialEntries: options?.router?.initialEntries || ['/']}) :
        createBrowserHistory();

    const composeEnhancers = isServer ?
        compose :
        composeWithDevTools({});

    const initialStore = options?.initialStore || {};
    const middlewares = [
        thunkMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        createRootReducer(history),
        initialStore,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );

    return {store, history};
};

export default configureStore;
