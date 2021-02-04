import React, {PureComponent} from 'react';
import AuthForm from 'components/AuthForm';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import bem from 'easy-bem';

const b = bem('AuthPage');

class LoginPage extends PureComponent<RouteComponentProps> {
    render() {
        return (
            <div className={b()}>
                <h1 className={b('title')}>Sign In</h1>

                <div className={b('form')}>
                    <AuthForm />
                </div>

                <div className={b('back-link')}>
                    <Link to='/sign-up'>Create account</Link>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginPage);
