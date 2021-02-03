import {IAction} from '../types';

export interface IUserState {
    user: unknown | null;
}

const defaultState: IUserState = {
    user: null
};

export default (state = defaultState, action: IAction) => {
    switch (action.type) {
    default: return state;
    }
};
