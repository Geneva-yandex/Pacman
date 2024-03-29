import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;
