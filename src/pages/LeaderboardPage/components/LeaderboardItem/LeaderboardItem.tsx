import React from 'react';
import bem from 'easy-bem';
import {IUser} from 'common/types/interfaces';
import User from '../User';
import './LeaderboardItem.scss';

const b = bem('LeaderboardItem');

interface ILeaderboardItem {
    user: IUser;
    position: number;
    rank: number;
}

// eslint-disable-next-line no-warning-comments
// TODO: сделать расчёт ширины полосы индикатора относительно максимального значения
const LeaderboardItem = ({position, rank, user}: ILeaderboardItem) => {
    return <div className={b()}>
        <div className={b('position')}>{position}</div>
        <div className={b('user')}>
            <User user={user} />
        </div>

        <div className={b('indicator')}>
            {rank}
            <span className={b('indicator-line')} style={{width: '90%'}}></span>
        </div>
    </div>;
};

export default LeaderboardItem;
