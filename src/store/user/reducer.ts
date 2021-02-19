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
        status: UserStatusEnum.Pending
    }))
    .handleAction(SET_USER_TYPE, (state: IUserStore, action: IAction<IUserStore>) => ({
        ...state,
        ...action.payload,
        status: UserStatusEnum.Success
    }))
    .handleAction(FAILED_USER_TYPE, (state: IUserStore) => ({
        ...state,
        status: UserStatusEnum.Failed
    }))
    .handleAction(LOGOUT_TYPE, (state: IUserStore) => ({
        ...state,
        item: null,
        status: UserStatusEnum.Quitted
    }));

export default userReducer;

