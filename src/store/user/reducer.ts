import {createReducer} from 'typesafe-actions';
import {
    SET_USER_TYPE,
    LOGOUT_TYPE,
    PENDING_USER_TYPE,
    FAILED_USER_TYPE
} from './actions';
import {IAction} from '../types';
import {IUserStore, UserStatusEnum} from './types';

const defaultState: IUserStore = {
    item: null,
    status: null
};

const userReducer = createReducer(defaultState)
    .handleAction(PENDING_USER_TYPE, (state: IUserStore) => ({
        ...state,
        status: UserStatusEnum.pending
    }))
    .handleAction(SET_USER_TYPE, (state: IUserStore, action: IAction<IUserStore>) => ({
        ...state,
        ...action.payload,
        status: UserStatusEnum.success
    }))
    .handleAction(FAILED_USER_TYPE, (state: IUserStore) => ({
        ...state,
        status: UserStatusEnum.failed
    }))
    .handleAction(LOGOUT_TYPE, (state: IUserStore) => ({
        ...state,
        item: null,
        status: UserStatusEnum.quitted
    }));

export default userReducer;

