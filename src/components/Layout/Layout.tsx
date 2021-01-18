import * as React from 'react';
import Header from '../Header';
import bem from 'easy-bem';
import './Layout.scss';
import OfflineNotification from '../OfflineNotification';

const b = bem('Layout');

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <Header/>
                <OfflineNotification/>
                <main className={b('content')}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
