import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import {connectRouter} from 'connected-react-router';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user: userReducer
});
export default createRootReducer;
