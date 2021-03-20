import {routerActions} from 'connected-react-router';

import {
    logOut,
    setUser,
    pendingUser,
    failedUser
} from './user';

import {setTheme, toggleDarkLightTheme} from './theme/actions';

const actions = {
    user: {
        logOut,
        setUser,
        pendingUser,
        failedUser
    },
    router: {...routerActions},
    theme: {
        setTheme,
        toggleDarkLightTheme
    }
};

export default actions;

