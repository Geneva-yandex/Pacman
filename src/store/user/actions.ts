import {SignUpValueObject as userItem} from '../../types/types';

export const setUser = (user : userItem) => (
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
