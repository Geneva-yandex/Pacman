import * as React from 'react';
import bem from 'easy-bem';
import './IndexPage.scss';
import checkForAuthOrRedirect from '../../utils/checkForAuthOrRedirect';
import AuthApi from '../../utils/api/AuthApi'
import {RouteComponentProps, withRouter} from "react-router";

const b = bem('IndexPage');

class IndexPage extends React.PureComponent<RouteComponentProps> {
    state = {
        user: {},
    };


    componentDidMount() {
        checkForAuthOrRedirect('/login')
            .then(res => {
                this.setState({
                    user: res.user
                })
            })
            .catch(err => {
                this.props.history.push(err.redirectUrl)
            })
    }

    logOutFromSystem = () => {
        AuthApi.logOut()
            .then( res => {
                if (res.status === 200) {
                    localStorage.removeItem('user');
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                alert(err.response.data.reason);
            });
    };

    render() {
        return (
            <div className={b()}>
                <div className='container-fluid'>
                    <h1>Index Page</h1>
                    <button onClick={this.logOutFromSystem}>Выйти из системы</button>
                </div>
            </div>
        );
    }
}

export default  withRouter(IndexPage);
