import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import bem from 'easy-bem';
import Form from 'components/RegistationForm';
import {checkForAuthOrRedirect} from 'misc/utils';

const b = bem('SignUpPage');

class SignPage extends React.PureComponent<RouteComponentProps> {
    componentDidMount() {
        checkForAuthOrRedirect()
            .then(res => {
                this.setState({
                    user: res.user
                });
            });
    }

    render() {
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    <h1>Sign Up Page</h1>
                    <Form />
                </div>
            </div>
        );
    }
}

export default withRouter(SignPage);
