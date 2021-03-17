import {ILeaderData} from '../../common/types/types';

export const actions = {
    setLeaders: 'setLeaders',
    failed: 'failed'
};

export type ILeaderBoard = {
    item: ILeaderData[];
    status: string,
};
