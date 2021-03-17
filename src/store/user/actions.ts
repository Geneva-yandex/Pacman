import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {action} from 'typesafe-actions';

import {IPasswordsDto, IUser} from 'common/types/interfaces';
import AuthApi from 'api/AuthApi';
import UserApi from 'api/UserApi';
import {IUserStore} from './types';

export const SET_USER_TYPE = 'setUser';
export const LOGOUT_TYPE = 'logOut';
export const PENDING_USER_TYPE = 'PENDING';
export const FAILED_USER_TYPE = 'FAILED';

export const logOut = () => action(LOGOUT_TYPE);
export const setUser = (user: IUser) => action(SET_USER_TYPE, {item: user});
export const pendingUser = () => action(PENDING_USER_TYPE);
export const failedUser = () => action(FAILED_USER_TYPE);

type Dispatch = ThunkDispatch<IUserStore, void, AnyAction>;

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
