import * as React from 'react';
import bem from 'easy-bem';
import Form from '../../components/AuthForm';
import checkForAuthOrRedirect from '../../utils/checkForAuthOrRedirect';
import {RouteComponentProps, withRouter} from 'react-router';

const b = bem('LoginPage');

class LoginPage extends React.PureComponent<RouteComponentProps> {
    state = {
        user: {}
    };

    componentDidMount() {
        checkForAuthOrRedirect('/')
            .then(res => {
                this.setState({
                    user: res.user
                });
                this.props.history.push('/');
            })
            .catch(err => {
                void err;
            });
    }

    render() {
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    <h1>Login Page</h1>
                    <Form/>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginPage);
