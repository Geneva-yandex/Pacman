import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import leaderBoardReducer from './leaderBoard/reducer';
import {connectRouter} from 'connected-react-router';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    leaderBoard: leaderBoardReducer,
    user: userReducer
});
export default createRootReducer;
