import {IUser} from 'common/types/interfaces';

export const actions = {
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    setUser: 'setUser',
    logOut: 'logOut'
};

export enum UserStatusEnum {
    Pending = 'pending',
    Success = 'success',
    Failed = 'failed',
    Quitted = 'quitted'
}

export interface IUserStore {
    item: IUser | null;
    status: UserStatusEnum | null;
}
