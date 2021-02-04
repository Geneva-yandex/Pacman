import {DispatchAdding, DispatchLoggingOut, pendingUserType} from 'store/user/actionTypes';
import {IUserState} from 'store/user/types';

export type StateProps = {
    user: IUserState;
};

export type ComponentState = {
    user: {}
};

export interface DispatchToUserProps {
    setUser: DispatchAdding['setUser'],
    logOut: DispatchLoggingOut['logOut'],
    onGettingUser: pendingUserType['onGettingUser']
}

export type ConnectToUserProps = StateProps & DispatchToUserProps;
