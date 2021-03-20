import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userReducer from './user/reducer';
import leaderBoardReducer from './leaderBoard/reducer';
import forumReducer from './forum/reducer';
import themeReducer from './theme';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    forum: forumReducer,
    leaderBoard: leaderBoardReducer,
    theme: themeReducer
});

export default createRootReducer;
