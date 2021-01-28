import React, {FormEvent, ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import bem from 'easy-bem';
import authApi from 'api/AuthApi';
import {Input, Button} from '../ui';

const b = bem('AuthForm');

type State = {
    login: string
    password: string
    remember: string
    errorMessage: string
    [key: string]: string
};

class AuthForm extends React.Component<RouteComponentProps, State> {
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
        const {login, password} = this.state;
        const logInData = {
            login,
            password,
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
                <Input onChange={this.onControlChange} name='login' title='Введите логин' type='text' placeholder='Логин'/>
                <Input onChange={this.onControlChange} name='password' title='Введите пароль' type='password' placeholder='*******'/>
                <label>
                    <input onChange={this.onControlChange} type='checkbox' name='remember'/>
                    Remember me
                </label>
                <div>
                    <Button>Sign In</Button>
                </div>
                <div className='error'>
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}
export default withRouter(AuthForm);
