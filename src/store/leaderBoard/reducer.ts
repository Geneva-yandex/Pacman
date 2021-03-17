import {GetDTOFromLeaderBoards} from '../../types/types';
import {IAction} from '../types';
import {actions} from './types';

type ILeaderBoardState = {
    item: GetDTOFromLeaderBoards | []
};

const defaultState: ILeaderBoardState = {
    item: []
};

export default (state: ILeaderBoardState = defaultState, {type, payload}: IAction) => {
    switch (type) {
    case actions.setLeaders:
        return {
            ...state,
            ...payload as object,
            status: 'success'
        };
    case actions.failed:
        return {
            ...state,
            status: 'failed'
        };
    default:
        return state;
    }
};

