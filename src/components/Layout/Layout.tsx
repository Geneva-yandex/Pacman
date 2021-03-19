import React, {PureComponent, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import bem from 'easy-bem';
import './Layout.scss';

import Sidebar from '../Sidebar';
import OfflineNotification from '../OfflineNotification';
import {withUser} from '../hocs';
import {IUserStore} from '../../store/user';

const b = bem('Layout');

type LayoutProps = PropsWithChildren<{
    user: IUserStore;
}>;

class Layout extends PureComponent<LayoutProps> {
    render() {
        const {user} = this.props;

        return (
            <div className={b()}>
                {user.item && <Sidebar className={b('sidebar')} />}
                <div className={b('content')}>
                    <header className={b('header')}>
                        <div className='container-fluid'>
                            <Link to='/' className='logo'>Pacman</Link>
                        </div>
                    </header>
                    <OfflineNotification/>
                    <main className={b('main')}>
                        <div className='container-fluid'>
                            {this.props.children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default withUser(Layout);
