import * as React from 'react';
import bem from 'easy-bem';
import './LoginPage.scss';

const b = bem('LoginPage');

export default class LoginPage extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    Login Page
                </div>
            </div>
        );
    }
}
