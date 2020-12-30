import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import './Layout.scss';
import Sidebar from '../Sidebar';

const b = bem('Layout');

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <Sidebar className={b('sidebar')} />

                <div className={b('content')}>
                    <header className={b('header')}>
                        <div className="container-fluid">
                            <Link to="/" className="logo">Pacman</Link>
                        </div>
                    </header>

                    <main className={b('main')}>
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
