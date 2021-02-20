import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import bem from 'easy-bem';
import './Layout.scss';

import Sidebar from '../Sidebar';
import OfflineNotification from '../OfflineNotification';

const b = bem('Layout');

class Layout extends PureComponent {
    render() {
        return (
            <div className={b()}>
                <Sidebar className={b('sidebar')} />

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
