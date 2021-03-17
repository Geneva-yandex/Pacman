import {
    logOut,
    setUser,
    pendingUser,
    failedUser
} from './user';
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

