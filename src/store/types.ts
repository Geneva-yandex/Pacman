import {SignUpValueObject as user} from '../types/types';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface state {
    user: {
        item: null | user;
        status: string
    }
}
