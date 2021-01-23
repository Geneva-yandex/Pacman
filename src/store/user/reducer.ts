import {IAction} from '../types';
import {SignUpValueObject as user} from '../../types/types';

export interface IUserState {
    item: user | null;
}

const defaultState: IUserState = {
    item: null
};

const actions = {
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    setUser: 'setUser',
    logOut: 'logOut'
};

export default (state: IUserState = defaultState, {type, payload}: IAction) => {
    switch (type) {
        case actions.PENDING:
            return {
                ...state,
                status: 'pending'
            };
        case actions.setUser:

            return {
                ...state,
                ...payload as object,
                status: 'success'
            };
        case actions.FAILED:
            return {
                ...state,
                status: 'failed'
            };
        case actions.logOut:
            return {
                ...state,
                item: null,
                status: 'quitted'
            }
        default:
            return state;
    }
};

