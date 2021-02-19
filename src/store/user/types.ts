import {UserDTO as User} from '../../types/UserTypes';

export enum UserStatusEnum {
    Pending = 'pending',
    Success = 'success',
    Failed = 'failed',
    Quitted = 'quitted'
}

export interface IUserStore {
    item: null | User,
    status: null | UserStatusEnum
}
