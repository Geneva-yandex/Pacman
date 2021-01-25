import authApi from '../utils/api/AuthApi';

import {SignUpValueObject} from '../types/types';

import {setUser, pendingUser } from '../store/user/actions'

import store from '../store';

type PromiseResolver = {
    user: SignUpValueObject | null
};

const {dispatch, getState} = store;

async function checkForAuth(): Promise<PromiseResolver> {
    return new Promise<PromiseResolver>((resolve, reject) => {
        const userState = getState();

        let user = userState.user.item;

        if (user) {
            dispatch(setUser(user));
            resolve({
                user
            });
        } else {
            dispatch(pendingUser());
            authApi.getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        dispatch(setUser(userInfo));
                        resolve({
                            user: userInfo
                        });
                    }
                })
                .catch(() => {
                    reject({
                        user: {}
                    });
                });
        }
    });
}

export default checkForAuth;
