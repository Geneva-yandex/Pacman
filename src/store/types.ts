import {UserDTO as user} from '../types/types';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface IStoreState {
    user: {
        item: null | user;
        status: string
    }
}
