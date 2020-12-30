import * as React from 'react';
import Header from '../Header';
import bem from 'easy-bem';
import './Layout.scss';
import Sidebar from '../Sidebar';

const b = bem('Layout');

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <Sidebar className={b('sidebar')} />

                <div className={b('main')}>
                    <Header/>
                    <main className={b('content')}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}
