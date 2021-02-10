import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {IPasswordsDto, IUser} from 'common/types/interfaces';
import AuthApi from 'api/AuthApi';
import UserApi from 'api/UserApi';
import {IUserState} from './types';

type Dispatch = ThunkDispatch<IUserState, void, AnyAction>;

export const logOut = () => ({
    type: 'logOut'
});
export const setUser = (user: IUser) => (
    {
        type: 'setUser',
        payload: {item: user}
    }
);

export const pendingUser = () => (
    {
        type: 'PENDING'
    }
);
export const failedUser = () => (
    {
        type: 'FAILED'
    }
);

export class UserStateActions {
    static updateUser = (user: IUser) => async (dispatch: Dispatch) => {
        try {
            const response = await UserApi.changeProfile(user);
            const updatedUser = response.data;
            dispatch(setUser(updatedUser));
        } catch (error) {
            dispatch(failedUser());
        }
    };

    static loadUserInfo = () => async (dispatch: Dispatch) => {
        dispatch(pendingUser());

        try {
            const response = await AuthApi.getUserInfo();
            const user = response.data;
            dispatch(setUser(user));
        } catch (e) {
            dispatch(failedUser());
        }
    };

    static updateAvatar = (avatar: File) => async (dispatch: Dispatch) => {
        try {
            await UserApi.changeAvatar(avatar);
            const response = await AuthApi.getUserInfo();
            const user = response.data;
            dispatch(setUser(user));
        } catch (error) {
            dispatch(failedUser());
        }
    };

    static changePassword = (passwords: IPasswordsDto) => async (dispatch: Dispatch) => {
        try {
            await UserApi.changePassword(passwords);
        } catch (error) {
            dispatch(failedUser());
        }
    };
}
