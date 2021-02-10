import * as React from 'react';
import bem from 'easy-bem';
import {FormEvent} from 'react';
import authApi from 'api/AuthApi';
import oAuthApi from 'api/OAuthApi';
import {ChangeEvent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {UserDTO as userItem} from '../../types/types';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {DispatchAdding} from '../../store/user/actionTypes';
import {setUser} from '../../store/user/actions';
import {IStoreState} from '../../store/types';
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
    user: IStoreState['user'];
}

class AuthForm extends React.Component<ComponentProps, State> {
    state = {
        login: '',
        password: '',
        remember: '',
        errorMessage: ''
    };

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<ComponentProps>): void {
        console.log(nextProps);
        if (nextProps.user.item !== null) {
            this.props.history.push('/');
        }
    }

    onControlChange = (event: ChangeEvent) => {
        const target = event.target;
        const value = (target as HTMLInputElement).value;
        const propertyName = (target as HTMLInputElement).name;
        this.setState({
            [propertyName]: value
        });
    };

    oAuth = () => {
        oAuthApi.getOAuthClientID()
            .then(res => {
                const CLIENT_ID = res.data.service_id;

                const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}`;

                document.location.href = URL;
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
            <div>

                <Button onClick={this.oAuth}>Yandex account</Button>

                <form className={b()} onSubmit={this.onSubmit}>

                    <Input onChange={this.onControlChange} name='login' title='Введите логин' type='text'
                        placeholder='Логин'/>
                    <Input onChange={this.onControlChange} name='password' title='Введите пароль' type='password'
                        placeholder='*******'/>
                    <Input onChange={this.onControlChange} type='checkbox' name='remember' title='Remember me'
                        className={b('remember-btn')}/>
                    <Button block>Sign In</Button>
                    <div className='error'>
                        {this.state.errorMessage}
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchAdding => ({
    setUser: (user: userItem) => {
        dispatch(setUser(user));
    }
});

const mapStateToProps = (state: IStoreState): StateProps => ({
    user: state.user
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));
