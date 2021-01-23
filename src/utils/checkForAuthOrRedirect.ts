import authApi from '../utils/api/AuthApi';

import {SignUpValueObject} from '../types/types';

import store from '../store';

type PromiseResolver = {
    user: SignUpValueObject | null
};

const {dispatch} = store;

async function checkForAuth(): Promise<PromiseResolver> {
    return new Promise<PromiseResolver>((resolve, reject) => {
        const rawUserString = localStorage.getItem('user');
        let user = null;
        if (rawUserString !== null) {
            user = JSON.parse(rawUserString);
        }

        if (user) {
            dispatch({type: 'setUser', payload: {item: user}});
            resolve({
                user
            });
        } else {
            dispatch({type: 'PENDING'});
            authApi.getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        localStorage.setItem('user', JSON.stringify(userInfo));
                        dispatch({type: 'setUser', payload: {item: userInfo}});
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
