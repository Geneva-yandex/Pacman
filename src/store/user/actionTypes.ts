import {UserDTO as userItem} from '../../types/types';

export type DispatchAdding = {
    setUser: (user: userItem) => void;
};
export type pendingUserType = {
    onGettingUser: () => void;
};

export type DispatchLoggingOut = {
    logOut: () => void;
};