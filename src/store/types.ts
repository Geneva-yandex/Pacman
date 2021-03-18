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
    leaderBoard: {
        item: ILeaderData[];
        status: string,
    },
    forum: IForumStore
}

export interface IStoreOptions {
    router?: {
        initialEntries: string[];
    },
    initialStore?: IStore
}
