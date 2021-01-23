import {SignUpValueObject as userItem} from '../../types/types';

export type DispatchAdding = {
    setUser: (user: userItem) => void;
};

