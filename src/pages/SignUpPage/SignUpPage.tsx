import React, {PureComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import RegistrationForm from 'components/RegistrationForm';
import AuthPageLayout from 'components/AuthPageLayout';

const backLink = <Link to='/login'>Sign in</Link>;

class SignUpPage extends PureComponent<RouteComponentProps> {
    render() {
        return (
            <AuthPageLayout title='Sign Up' backLink={backLink}>
                <RegistrationForm />
            </AuthPageLayout>
        );
    }
}

export default withRouter(SignUpPage);
