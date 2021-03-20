import {combineReducers} from 'redux';
import userReducer from './user';
import LeaderBoardReducrer from './leaderBoard';
import themeReducer from './theme';

export default combineReducers({
    user: userReducer,
    leaderBoard: LeaderBoardReducrer,
    theme: themeReducer
});
