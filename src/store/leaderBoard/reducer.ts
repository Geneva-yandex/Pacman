import {GetDTOFromLeaderBoards} from '../../common/types/types';
import {IAction} from '../types';
import {actions} from './types';
import {createReducer} from 'typesafe-actions';

type ILeaderBoardState = {
    item: GetDTOFromLeaderBoards | [],
    status: string
};

const defaultState: ILeaderBoardState = {
    item: [],
    status: ''
};

const leaderBoardReducer = createReducer(defaultState)
    .handleAction(actions.setLeaders, (state: ILeaderBoardState, action: IAction<ILeaderBoardState>) => ({
        ...state,
        ...action.payload,
        status: 'success'
    }))
    .handleAction(actions.failed, (state: ILeaderBoardState) => ({
        ...state,
        status: 'failed'
    }));

export default leaderBoardReducer;
