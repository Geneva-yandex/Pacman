import {RouterRootState} from 'connected-react-router';
import {IUserStore} from './user';
import {IForumStore} from './forum';
import {ILeaderData} from '../common/types/types';

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}

export interface IStore extends RouterRootState {
    user: IUserStore;
    forum: IForumStore,
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
