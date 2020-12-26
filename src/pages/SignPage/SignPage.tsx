import * as React from 'react';
import bem from 'easy-bem';
import Form from '../../components/RegistationForm';
import checkForAuthOrRedirect from "../../utils/checkForAuthOrRedirect";
import {RouteComponentProps, withRouter} from "react-router";

const b = bem('SignUpPage');


class SignPage extends React.PureComponent<RouteComponentProps> {
    componentDidMount() {
        checkForAuthOrRedirect('/')
            .then(res => {
                this.setState({
                    user: res.user,
                })
            })
            .catch(err => {
                void err;
            })

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