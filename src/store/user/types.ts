import {IUser} from 'common/types/interfaces';

export const actions = {
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    setUser: 'setUser',
    logOut: 'logOut'
};

export type UserStatus = '' | 'pending' | 'success' | 'failed' | 'quitted';

export interface IUserState {
    item: IUser | null;
    status: UserStatus;
}
