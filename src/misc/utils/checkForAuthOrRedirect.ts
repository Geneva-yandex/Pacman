import authApi from 'api/AuthApi';
import {IUser} from 'types/interfaces';

type PromiseResolver = {
    user: IUser | null
};

async function checkForAuthOrRedirect(): Promise<PromiseResolver> {
    return new Promise<PromiseResolver>((resolve, reject) => {
        const rawUserString = localStorage.getItem('user');
        let user = null;
        if (rawUserString !== null) {
            user = JSON.parse(rawUserString);
        }

        if (user) {
            resolve({
                user: user
            });
        } else {
            authApi.getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        localStorage.setItem('user', JSON.stringify(userInfo));
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

export default checkForAuthOrRedirect;
