import * as React from 'react';
/*import { useHistory } from "react-router-dom";*/
import bem from 'easy-bem';
import Input from '../Input'
import './RegistationForm.scss';
import {FormEvent} from "react";
import signUpApi from "../../utils/api/AuthApi/SignUp";
import {ChangeEvent} from "react";
import {Redirect} from "react-router";



const b = bem('AuthForm');

export default class AuthForm extends React.Component{
    user: any;
    state = {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        phone: '',
        error: '',
        toDashBoards: false,
        errorMessage: ''
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

        const signUpData = {
            first_name: this.state.first_name,
            second_name: this.state.second_name,
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }

        signUpApi(signUpData)
            .then(res => {
                if (res.status == 200) {
                   this.setState({
                       toDashBoards: true
                   })
                }
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
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'first_name')}} name="first_name" title="Enter your name" type="text" placeholder="first_name" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'second_name')}} name="second_name" title="Enter the second_name" type="text" placeholder="second_name" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'login')}} name="login" title="Enter the login" type="text" placeholder="login" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'email')}} name="email" title="Enter the email" type="email" placeholder="email" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'password')}} name="password" title="Enter the password" type="password" placeholder="*******" />
                <Input onChange={(e: ChangeEvent) => {this.onControlChange(e, 'phone')}} name="phone" title="Enter the phone" type="tel" placeholder="phone" />

                <button type="submit">
                    Зарегестрироваться
                </button>
                <div className={'error'}>
                    {this.state.errorMessage}
                </div>
            </form>
        )
    }
}