import {UserDTO as userItem} from '../../types/types';

export type DispatchAdding = {
    setUser: (user: userItem) => void;
};

export type DispatchLoggingOut = {
    logOut: () => void;
};
