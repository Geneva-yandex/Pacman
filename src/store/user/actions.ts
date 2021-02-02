import {UserDTO as userItem} from '../../types/types';

export const logOut = () => ({
    type: 'logOut'
});
export const setUser = (user: userItem) => (
    {
        type: 'setUser',
        payload: {item: user}
    }
);

export const pendingUser = () => (
    {
        type: 'PENDING'
    }
);
export const failedUser = () => (
    {
        type: 'FAILED'
    }
);
