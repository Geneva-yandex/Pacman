import * as React from 'react';
import bem from 'easy-bem';
import Input from '../Input';
import {FormEvent} from 'react';
import authApi from '../../utils/api/AuthApi';
import {ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {SignUpValueObject as userItem} from '../../types/types';
import {DispatchAdding} from '../../store/user/actionTypes';
import {setUser} from '../../store/user/actions';

type StateProps = {
    state: unknown;
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

interface ComponentProps extends RouteComponentProps {
    setUser: DispatchAdding['setUser']

}
const b = bem('AuthForm');

class AuthForm extends React.Component<ComponentProps, State> {
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
        // @ts-ignore
        const {setUser} = this.props;
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
                            const userData = resp.data;
                            setUser(userData);
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
                <Input onChange={this.onControlChange} name="first_name" title="Введите имя" type="text" placeholder="Имя" />
                <Input onChange={this.onControlChange} name="second_name" title="Введите фамилию" type="text" placeholder="Фамилия" />
                <Input onChange={this.onControlChange} name="login" title="Введите логин" type="text" placeholder="Логин" />
                <Input onChange={this.onControlChange} name="email" title="Введите email" type="email" placeholder="email" />
                <Input onChange={this.onControlChange} name="password" title="Введите пароль" type="password" placeholder="*******" />
                <Input onChange={this.onControlChange} name="phone" title="Введите номер телефона" type="tel" placeholder="Номер телефона" />
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

const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchAdding => ({
    setUser: (user: userItem) => {
        dispatch(setUser(user));
    }
});

const mapStateToProps = (state: unknown): StateProps => ({
    state
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));
