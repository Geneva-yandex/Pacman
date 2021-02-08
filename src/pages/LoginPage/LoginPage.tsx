import * as React from 'react';
import Form from '../../components/AuthForm';
import {RouteComponentProps, withRouter} from 'react-router';
import bem from 'easy-bem';
import Meta from '../../components/Meta/Meta';

const b = bem('LoginPage');

class LoginPage extends React.PureComponent<RouteComponentProps> {
    render() {
        return (
            <div className={b()}>
                <Meta title={'Login'}/>
                <div className={'container-fluid'}>
                    <h1>Login Page</h1>
                    <Form/>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginPage);
