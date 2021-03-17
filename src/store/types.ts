import {ILeaderData, UserDTO as User} from '../types/types';

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
        item: null | User;
        status: string
    }
}
