import * as React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {RouteComponentProps, withRouter} from 'react-router';
import bem from 'easy-bem';
import './Sidebar.scss';
import AuthApi from '../../api/AuthApi';

const b = bem('Sidebar');

interface ISidebarProps {
    className?: string;
}

class Sidebar extends React.PureComponent<RouteComponentProps & ISidebarProps> {
    render() {
        return (
            <aside className={classnames(this.props.className, b())}>
                <button>open</button>

                <nav className={b('navigation')}>
                    <ul className={b('nav-list')}>
                        <li><Link to="start">Game</Link></li>
                        <li><Link to="leaderboard">Leaderboard</Link></li>
                        <li><Link to="profile">Profile</Link></li>
                    </ul>
                </nav>

                <button onClick={this.signout}>signout</button>
            </aside>
        );
    }

    signout = () => {
        AuthApi.logOut()
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('user');
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.reason
                });
            });
    };
}

export default withRouter(Sidebar);
