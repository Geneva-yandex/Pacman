import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import './Layout.scss';
import Sidebar from '../Sidebar';
import OfflineNotification from '../OfflineNotification';
import {IUserState} from 'store/user/reducer';
import {DispatchAdding, pendingUserType} from 'store/user/actionTypes';
const b = bem('Layout');

interface ILayoutProps {
    user: IUserState;
    setUser: DispatchAdding['setUser'],
    onGettingUser: pendingUserType['onGettingUser']
}

class Layout extends React.PureComponent<ILayoutProps> {
    render() {
        const {item} = this.props.user;
        const isAuth = item !== null;

        return (
            <div className={b({auth: !isAuth})}>
                {isAuth && <Sidebar className={b('sidebar')} />}

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

export default Layout;
