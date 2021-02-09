import authApi from 'api/AuthApi';
import store from 'store';
import {setUser, pendingUser, failedUser} from 'store/user/actions';

const {dispatch} = store;

function checkForAuth(): void {
    dispatch(pendingUser());
    authApi.getUserInfo()
        .then(res => {
            if (res.status === 200) {
                const userInfo = res.data;
                dispatch(setUser(userInfo));
            }
        })
        .catch(() => {
            dispatch(failedUser());
        });
}

export default checkForAuth;
