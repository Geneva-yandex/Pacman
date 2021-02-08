import {UserDTO as userItem} from '../../types/UserTypes';
import {action} from 'typesafe-actions';

const SET_USER_TYPE = 'setUser';
const LOGOUT_TYPE = 'logOut';
const PENDING_USER_TYPE = 'PENDING';
const FAILED_USER_TYPE = 'FAILED';

const logOut = () => action(LOGOUT_TYPE);

const setUser = (user: userItem) => action(SET_USER_TYPE, {item: user});

const pendingUser = () => action(PENDING_USER_TYPE);

const failedUser = () => action(FAILED_USER_TYPE);

export {
    SET_USER_TYPE,
    LOGOUT_TYPE,
    PENDING_USER_TYPE,
    FAILED_USER_TYPE,
    logOut,
    setUser,
    pendingUser,
    failedUser
};
