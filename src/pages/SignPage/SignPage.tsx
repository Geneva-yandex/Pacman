import * as React from 'react';
import bem from 'easy-bem';
import Form from '../../components/RegistationForm';
import getUserInfo from '../../utils/api/AuthApi/getUserInfo';
import {Redirect} from 'react-router';
const b = bem('SignUpPage');

type userData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    avatar: string;
    phone: string;
};

export default class SignPage extends React.PureComponent {
    user: userData | null;
    state = {
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
            return <Redirect to="/" />;
        }

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
