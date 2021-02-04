import React, {PureComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import AuthPageLayout from 'components/AuthPageLayout';
import AuthForm from 'components/AuthForm';

const backLink = <Link to='/sign-up'>Create account</Link>;

class LoginPage extends PureComponent<RouteComponentProps> {
    render() {
        return (
            <AuthPageLayout title='Sign In' backLink={backLink}>
                <AuthForm />
            </AuthPageLayout>
        );
    }
}

export default withRouter(LoginPage);
