import React, {ChangeEvent, FormEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import cn from 'classnames';
import {DispatchAdding} from '../../store/user/actionTypes';
import {IStoreState} from '../../store/types';
import {setUser} from '../../store/user';
import {IUser} from '../../common/types/interfaces';
import authApi from 'api/AuthApi';
import {Input, Button} from '../ui';

import bem from 'easy-bem';

type StateProps = {
    user: IStoreState['user'];
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
                    return authApi.getUserInfo();
                }
            })
            .then(resp => {
                if (!resp) {
                    return;
                }

                const userData = resp.data;
                setUser(userData);
                this.props.history.push('/');
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
                <Input onChange={this.onControlChange} name='first_name' title='First Name' type='text' />
                <Input onChange={this.onControlChange} name='second_name' title='Last Name' type='text' />
                <Input onChange={this.onControlChange} name='login' title='Login' type='text' />
                <Input onChange={this.onControlChange} name='email' title='Email' type='email' />
                <Input onChange={this.onControlChange} name='password' title='Password' type='password'
                    placeholder='*******' />
                <Input onChange={this.onControlChange} name='phone' title='Phone Number' type='tel'/>
                <Button type='submit' block>Sign Up</Button>
                <div className='error'>
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchAdding => ({
    setUser: (user: IUser) => {
        dispatch(setUser(user));
    }
});

const mapStateToProps = (state: IStoreState): StateProps => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));
