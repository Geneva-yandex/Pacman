import * as React from 'react';
import bem from 'easy-bem';
import './IndexPage.scss';
import getUserInfo from '../../utils/api/AuthApi/getUserInfo';
import logOut from '../../utils/api/AuthApi/logOut';
import isEqual from '../../utils/compareObjects';
import {Redirect} from 'react-router';

type userData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    avatar: string;
    phone: string;
};

const b = bem('IndexPage');

export default class IndexPage extends React.PureComponent {
    user: userData | null;

    state = {
        user: {},
        toLogInPage: false
    };

    componentDidMount() {
        const rawUserString = localStorage.getItem('user');
        if (rawUserString !== null) {
            this.user = JSON.parse(rawUserString);
        }

        if (this.user !== undefined) {
            this.setState({
                user: this.user
            });
            getUserInfo()
                .then(res => {
                    if (!isEqual(res.data, this.user)) {
                        this.setState({
                            user: res.data
                        });
                        localStorage.setItem('user', JSON.stringify(res.data));
                    }
                });
        } else {
            getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        localStorage.setItem('user', JSON.stringify(userInfo));
                    }
                })
                .catch(() => {
                    this.setState({
                        toLogInPage: true
                    });
                });
        }
    }

    logOutFromSystem = () => {
        logOut()
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('user');
                    this.setState({
                        toLogInPage: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        if (this.state.toLogInPage) {
            return <Redirect to="login"/>;
        }

        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    <h1>Index Page</h1>
                    <button onClick={this.logOutFromSystem}>Выйти из системы</button>
                </div>
            </div>
        );
    }
}
