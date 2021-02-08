import {UserDTO as user} from '../../types/UserTypes';

export enum UserStatusEnum {
    pending = 'pending',
    success = 'success',
    failed = 'failed',
    quitted = 'quitted'
}

export interface IUserStore {
    item: null | user,
    status: null | UserStatusEnum
}
