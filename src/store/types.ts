import {IUserState} from './user';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface IStoreState {
    user: IUserState;
}
