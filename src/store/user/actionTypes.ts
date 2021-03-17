import {IUser} from 'common/types/interfaces';

export type DispatchAdding = {
    setUser: (user: IUser) => void;
};
export type pendingUserType = {
    onGettingUser: () => void;
};

export type DispatchLoggingOut = {
    logOut: () => void;
};
