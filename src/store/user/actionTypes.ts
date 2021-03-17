import {UserDTO as UserItem} from '../../types/types';

export type DispatchAdding = {
    setUser: (user: UserItem) => void;
};
export type pendingUserType = {
    onGettingUser: () => void;
};

export type DispatchLoggingOut = {
    logOut: () => void;
};
