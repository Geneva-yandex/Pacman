import * as React from 'react';
import {FC} from 'react';
import bem from 'easy-bem';
import {IUser} from '../../../../types/interfaces';
import {Avatar} from '../../../../components/ui';
import './User.scss';

const b = bem('User');

interface IUserProps {
    user: IUser;
}

const User: FC<IUserProps> = ({user}: IUserProps) => {
    const {avatar, login, first_name, second_name} = user;

    return <div className={b()}>
        <div className={b('avatar')}>
            <Avatar size={32} src={avatar} />
        </div>

        <div className={b('info')}>
            <span className={b('login')}>{login}</span>
            <span className={b('name')}>{second_name} {first_name}</span>
        </div>
    </div>;
};

export default User;
