import * as React from 'react';
import Header from '../Header';
import bem from 'easy-bem';
import './Layout.scss';

const b = bem('Layout');

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <Header/>
                <main className={b('content')}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
