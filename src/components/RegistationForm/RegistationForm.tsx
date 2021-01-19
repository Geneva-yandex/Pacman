import * as React from 'react';
import bem from 'easy-bem';
import Input from '../ui/Input';
import {FormEvent} from 'react';
import authApi from '../../api/AuthApi';
import {ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

const b = bem('AuthForm');

class AuthForm extends React.Component<RouteComponentProps> {
    state = {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        phone: '',
        error: '',
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

        const signUpData = {
            first_name: this.state.first_name,
            second_name: this.state.second_name,
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        };

        authApi.sendAuthRequest(signUpData)
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
                }} name="first_name" title="Enter your name" type="text" placeholder="first_name" />
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="second_name" title="Enter the second_name" type="text" placeholder="second_name" />
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="login" title="Enter the login" type="text" placeholder="login" />
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="email" title="Enter the email" type="email" placeholder="email" />
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="password" title="Enter the password" type="password" placeholder="*******" />
                <Input onChange={(e: ChangeEvent) => {
                    this.onControlChange(e);
                }} name="phone" title="Enter the phone" type="tel" placeholder="phone" />

                <button type="submit">
                    Зарегестрироваться
                </button>
                <div className="error">
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}

export default withRouter(AuthForm);
