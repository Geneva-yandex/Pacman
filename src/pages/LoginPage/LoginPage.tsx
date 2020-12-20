import * as React from 'react';
import bem from 'easy-bem';
import Form from '../../components/AuthForm';
import getUserInfo from '../../utils/api/AuthApi/getUserInfo';
import {Redirect} from 'react-router';

type userData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    avatar: string;
    phone: string;
};

const b = bem('LoginPage');

export default class LoginPage extends React.PureComponent {
    user: userData | null;
    state = {
        user: {},
        toDashBoards: false
    };

    componentDidMount() {
        const rawUserString = localStorage.getItem('user');
        if (rawUserString !== null) {
            this.user = JSON.parse(rawUserString);
        }

        if (this.user !== undefined) {
            this.setState({
                user: this.user,
                toDashBoards: true
            });
        } else {
            getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        localStorage.setItem('user', JSON.stringify(userInfo));
                        this.setState({
                            toDashBoards: true
                        });
                    }
                })
                .catch(() => {});
        }
    }

    render() {
        if (this.state.toDashBoards) {
            return <Redirect to="/"/>;
        }

        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    <h1>Login Page</h1>
                    <Form />
                </div>
            </div>
        );
    }
}
