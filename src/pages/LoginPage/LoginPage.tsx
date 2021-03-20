import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import AuthPageLayout from 'components/AuthPageLayout';
import AuthForm from 'components/AuthForm';
import Meta from 'components/Meta/Meta';

const backLink = <Link to='/sign-up'>Create an account</Link>;

class LoginPage extends PureComponent {
    render() {
        return (
            <>
                <Meta title={'Login'}/>
                <AuthPageLayout title='Sign In' backLink={backLink}>
                    <AuthForm />
                </AuthPageLayout>
            </>
        );
    }
}

export default LoginPage;
