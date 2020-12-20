import * as React from 'react';
import bem from 'easy-bem';
import Input from '../Input'
import './AuthForm.scss';
import {FormEvent} from "react";
import AuthApi from "../../utils/api/AuthApi/SignIn";
import {ChangeEvent} from "react";
import {Redirect} from "react-router";



const b = bem('AuthForm');

export default class AuthForm extends React.Component{

    state = {
        login: '',
        password: '',
        remember: '',
        toDashBoards: false,
        errorMessage: '',
    };

    changeState = (prop: string, value: string) => {
        this.setState({
            [prop]: value,
        })
    };

    onControlChange = (event: ChangeEvent, propertyName: string) => {
        const value = ( event.target as HTMLInputElement).value;
        this.changeState(propertyName, value);

    }

    onSubmit = (event: FormEvent) => {
        event.preventDefault();

        const remember = this.state.remember === 'on'

        const logInData = {
            'login': this.state.login,
            'password': this.state.password,
            'remember': remember,
        };

        AuthApi(logInData)
            .then(res => {
                this.setState({
                    toDashBoards: true,
                })
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.reason
                })
            })
    };

    public render() {
        if (this.state.toDashBoards) {
            return (
                <Redirect to='/'/>
            )
        }
        return (
            <form className={b()} onSubmit={this.onSubmit}>
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'login')}} name="login" title="Enter the login" type="text" placeholder="login" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'password')}} name="password" title="Enter the password" type="password" placeholder="*******" />
                <label>
                    <input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'remember')}} type="checkbox" name="remember"/>
                    Запомнить меня
                </label>
                <button type="submit">
                    Отправить форму
                </button>
                <div className={'error'}>
                    {this.state.errorMessage}
                </div>
            </form>
        )
    }
}