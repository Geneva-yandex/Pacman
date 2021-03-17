import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {IStoreState} from '../types';
import LeaderBoardApi from '../../api/LeaderBoardApi';

type Dispatch = ThunkDispatch<IStoreState, void, AnyAction>;

export const setLeaders = (leaders: unknown) => ({
    type: 'setLeaders',
    payload: leaders
});
export const failedToLoadLeaderBoard = () => {
    return {
        type: 'failed'
    };
};

export const fetchLeaderBoardData = () => async (dispatch: Dispatch) => {
    try {
        const leaderBoardResponse = await LeaderBoardApi.getDataForLeaderBoard({
            ratingFieldName: 'GenevaPacmanScore',
            cursor: 0,
            limit: 10
        });
        const leaderBoardItems = leaderBoardResponse.data;
        dispatch(setLeaders({item: leaderBoardItems}));
    } catch (e) {
        dispatch(failedToLoadLeaderBoard());
    }
};
