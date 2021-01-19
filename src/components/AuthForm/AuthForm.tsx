import * as React from 'react';
import bem from 'easy-bem';
import Input from '../Input';
import {FormEvent} from 'react';
import authApi from '../../utils/api/AuthApi';
import {ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

const b = bem('AuthForm');

class AuthForm extends React.Component<RouteComponentProps> {
    state = {
        login: '',
        password: '',
        remember: '',
        errorMessage: ''
    };

    onControlChange = (event: ChangeEvent) => {
        const target = event.target;
        const value = (target as HTMLInputElement).value;
        const propertyName = (target as HTMLInputElement).name;
        this.setState({
            [propertyName]: value
        });
    };

    onSubmit = (event: FormEvent) => {
        event.preventDefault();

        const remember = this.state.remember === 'on';

        const logInData = {
            login: this.state.login,
            password: this.state.password,
            remember: remember
        };

        authApi.sendLogInRequest(logInData)
            .then(res => {
                if (res.status === 200) {
                    authApi.getUserInfo()
                        .then(resp => {
                            localStorage.setItem('user', JSON.stringify(resp.data));
                            this.props.history.push('/');
                        })
                        .catch(err => {
                            this.setState({
                                errorMessage: err.response.data.reason
                            });
                        });
                }
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.reason
                });
            });
    };

    public render() {
        return (
            <form className={b()} onSubmit={this.onSubmit}>
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="login" title="Enter the login" type="text" placeholder="login"/>
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="password" title="Enter the password" type="password" placeholder="*******"/>
                <label>
                    <input onChange={(e: ChangeEvent) => {
                        this.onControlChange(e);
                    }} type="checkbox" name="remember"/>
                    Запомнить меня
                </label>
                <button type="submit">
                    Отправить форму
                </button>
                <div className="error">
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}
export default withRouter(AuthForm);
