import React, {PureComponent} from 'react';
import AuthForm from 'components/AuthForm';
import {RouteComponentProps, withRouter} from 'react-router';
import bem from 'easy-bem';
import './LoginPage.scss';

const b = bem('LoginPage');

class LoginPage extends PureComponent<RouteComponentProps> {
    render() {
        return (
            <div className={b()}>
                <AuthForm />
            </div>
        );
    }
}
export default withRouter(LoginPage);
