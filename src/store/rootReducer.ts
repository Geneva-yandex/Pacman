import {combineReducers} from 'redux';
import userReducer from './user';
import LeaderBoardReducrer from './leaderBoard';

export default combineReducers({
    user: userReducer,
    leaderBoard: LeaderBoardReducrer
});
