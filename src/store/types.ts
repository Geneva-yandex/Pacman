import {ILeaderData, UserDTO as user} from '../types/types';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface IStoreState {
    leaderBoard: {
      item: ILeaderData[];
      status: string,
    }
    user: {
        item: null | user;
        status: string
    }
}
