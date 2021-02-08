import * as React from 'react';
import bem from 'easy-bem';
import {IUser} from 'common/types/interfaces';
import LeaderboardItem from './components/LeaderboardItem';

const b = bem('InnerPage');

const user: IUser = {
    id: 1,
    login: 'gamer123',
    first_name: 'Анна',
    second_name: 'Иванова',
    phone: '12222',
    avatar: 'https://i1.wp.com/volosylady.ru/wp-content/uploads/2016/09/kvadratnaya-forma-lica.jpg',
    role: '',
    email: '',
    display_name: ''
};

class LeaderboardPage extends React.PureComponent {
    render() {
        return <div className={b()}>
            <header className={b('header')}>
                <h1>Leaderboard</h1>
            </header>

            <div className={b('main')}>
                <LeaderboardItem user={user} position={1} rank={266} />
                <LeaderboardItem user={user} position={2} rank={156} />
                <LeaderboardItem user={user} position={3} rank={25} />
            </div>
        </div>;
    }
}

export default LeaderboardPage;
