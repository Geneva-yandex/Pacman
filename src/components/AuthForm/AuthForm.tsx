import React, {Component, FormEvent, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import bem from 'easy-bem';
import cn from 'classnames';
import './AuthForm.scss';

import authApi from 'api/AuthApi';
import {IStore} from 'store/types';
import {boundActions} from 'store/initClientStore';
import {Input, Button} from '../ui';

const b = bem('AuthForm');

type State = {
    login: string
    password: string
    remember: string
    errorMessage: string
    [key: string]: string,

};
type StateProps = {
    user: IStore['user'];
};

class AuthForm extends Component<{}, State> {
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
                    return authApi.getUserInfo();
                }
            })
            .then(resp => {
                if (!resp) {
                    return;
                }

                const userData = resp.data;
                boundActions.user.setUser(userData);
                boundActions.router.push('/');
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.reason
                });
            });
    };

    public render() {
        return (
            <form className={cn('form', b())} onSubmit={this.onSubmit}>
                <Input onChange={this.onControlChange} name='login' title='Login' type='text' />
                <Input onChange={this.onControlChange} name='password' title='Password' type='password' placeholder='*******' />

                <div className={b('submit')}>
                    <Button block>Sign In</Button>
                </div>

                <Input onChange={this.onControlChange} type='checkbox' name='remember' title='Remember me' className={b('remember-btn')}/>
                <Button block>Sign In</Button>
                <div className='error'>
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state: IStore): StateProps => ({
    user: state.user
});

export default connect(mapStateToProps)(AuthForm);
