import {
    logOut,
    setUser,
    pendingUser,
    failedUser
} from './user/actions';
import {routerActions} from 'connected-react-router';

const actions = {
    user: {
        logOut,
        setUser,
        pendingUser,
        failedUser
    },
    router: {...routerActions}
};

export default actions;

