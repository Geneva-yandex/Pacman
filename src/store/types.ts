import {RouterRootState} from 'connected-react-router';
import {IUserStore} from './user';
import {ILeaderData} from '../common/types/types';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface IStore extends RouterRootState {
    user: IUserStore;
    leaderBoard: {
        item: ILeaderData[];
        status: string,
    }
}

export interface IStoreOptions {
    router?: {
        initialEntries: string[];
    },
    initialStore?: IStore
}
