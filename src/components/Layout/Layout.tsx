import * as React from 'react';
import Header from '../Header';
import bem from 'easy-bem';
import './Layout.scss';
import {LogInValueObject as user} from '../../types/types';

const b = bem('Layout');

interface IWithUserOutput {
    user: user
}

export default class Layout extends React.PureComponent<{} & IWithUserOutput> {
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
