import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import {connectRouter} from 'connected-react-router';
import forumReducer from './forum/reducer';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    forum: forumReducer
});
export default createRootReducer;
