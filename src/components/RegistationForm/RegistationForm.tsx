import React, {ChangeEvent, FormEvent} from 'react';
import {connect} from 'react-redux';
import {IStore} from '../../store/types';
import {boundActions} from '../../store/initClientStore';
import bem from 'easy-bem';
import {Input, Button} from '../ui';
import authApi from 'api/AuthApi';

type StateProps = {
    user: IStore['user'];
};

type State = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    error: string,
    errorMessage: string,
    [key: string]: string
};

const b = bem('AuthForm');

class AuthForm extends React.Component<{}, State> {
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
            <form className={b()} onSubmit={this.onSubmit}>
                <Input onChange={this.onControlChange} name='first_name' title='Введите имя' type='text'
                    placeholder='Имя'/>
                <Input onChange={this.onControlChange} name='second_name' title='Введите фамилию' type='text'
                    placeholder='Фамилия'/>
                <Input onChange={this.onControlChange} name='login' title='Введите логин' type='text'
                    placeholder='Логин'/>
                <Input onChange={this.onControlChange} name='email' title='Введите email' type='email'
                    placeholder='email'/>
                <Input onChange={this.onControlChange} name='password' title='Введите пароль' type='password'
                    placeholder='*******'/>
                <Input onChange={this.onControlChange} name='phone' title='Введите номер телефона' type='tel'
                    placeholder='Номер телефона'/>
                <Button type='submit' aperance={'block'}>Зарегестрироваться</Button>
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
