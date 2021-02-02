import authApi from '../../api/AuthApi';
import store from '../../store';
import {UserDTO} from '../../types/types';
import {setUser, pendingUser, failedUser} from "../../store/user/actions";

type User = UserDTO | null;

const {dispatch} = store;

function checkForAuth(): void {
    let user: User = null;

    if (user) {
        dispatch(setUser(user));
    } else {
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
}

export default checkForAuth;
