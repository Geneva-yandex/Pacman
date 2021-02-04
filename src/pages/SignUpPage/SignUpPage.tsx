import * as React from 'react';
import bem from 'easy-bem';
import RegistrationForm from 'components/RegistationForm';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';

const b = bem('AuthPage');

class SignUpPage extends React.PureComponent<RouteComponentProps> {
    render() {
        return (
            <div className={b()}>
                <h1 className={b('title')}>Sign Up</h1>

                <div className={b('form')}>
                    <RegistrationForm />
                </div>

                <div className={b('back-link')}>
                    <Link to='/login'>Sign in</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);
