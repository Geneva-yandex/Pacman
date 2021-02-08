import * as React from 'react';
import bem from 'easy-bem';
import Form from '../../components/RegistationForm';
import {RouteComponentProps, withRouter} from 'react-router';
import Meta from '../../components/Meta/Meta';

const b = bem('SignUpPage');

class SignPage extends React.PureComponent<RouteComponentProps> {
    render() {
        return (
            <div className={b()}>
                <Meta title={'Sign up'}/>
                <div className={'container-fluid'}>
                    <h1>Sign Up Page</h1>
                    <Form />
                </div>
            </div>
        );
    }
}

export default withRouter(SignPage);
