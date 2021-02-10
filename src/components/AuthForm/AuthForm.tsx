import * as React from 'react';
import bem from 'easy-bem';
import {FormEvent} from 'react';
import authApi from 'api/AuthApi';
import {ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import cn from 'classnames';
import {IUser} from 'common/types/interfaces';
import {DispatchAdding} from 'store/user/actionTypes';
import {setUser} from 'store/user/actions';
import {IStoreState} from 'store/types';
import {Input, Button} from '../ui';
import './AuthForm.scss';

const b = bem('AuthForm');

type State = {
    login: string
    password: string
    remember: string
    errorMessage: string
    [key: string]: string,

};
type StateProps = {
    user: IStoreState['user'];
};

interface ComponentProps extends RouteComponentProps {
    setUser: DispatchAdding['setUser']
}
class AuthForm extends React.Component<ComponentProps, State> {
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
        const {setUser} = this.props;
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
                <Input onChange={this.onControlChange} name='login' title='Login' type='text' />
                <Input onChange={this.onControlChange} name='password' title='Password' type='password' placeholder='*******' />

                <div className={b('submit')}>
                    <Button block>Sign In</Button>
                </div>

                <Input onChange={this.onControlChange} type='checkbox' name='remember' title='Remember me' className={b('remember-btn')}/>
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
