import authApi from '../utils/api/AuthApi';
import store from '../store';
import {UserDTO} from '../types/types';

type User = UserDTO | null;

const {dispatch} = store;

function checkForAuth(): void {
    const rawUserString = localStorage.getItem('user');
    let user: User = null;
    if (rawUserString !== null) {
        user = JSON.parse(rawUserString);
    }

    if (user) {
        dispatch({type: 'setUser', payload: {item: user}});
    } else {
        dispatch({type: 'PENDING'});
        authApi.getUserInfo()
            .then(res => {
                if (res.status === 200) {
                    const userInfo = res.data;
                    localStorage.setItem('user', JSON.stringify(userInfo));
                    dispatch({type: 'setUser', payload: {item: userInfo}});
                }
            })
            .catch(() => {
                dispatch({type: 'FAILED'});
            });
    }
}

export default checkForAuth;
