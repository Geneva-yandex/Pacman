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
                <nav className={b('navigation')}>
                    <ul className={b('nav-list')}>
                        <li>
                            <Link className="icon-link" to="start">
                                <img src="/images/icons/game-controller-outline.svg" />
                            </Link>
                        </li>
                        <li>
                            <Link className="icon-link" to="leaderboard">
                                <img src="/images/icons/ribbon-outline.svg" />
                            </Link>
                        </li>
                        <li>
                            <Link className="icon-link" to="profile">
                                <img src="/images/icons/person-outline.svg" />
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button onClick={this._signout}><img src="/images/icons/exit-outline.svg" /></button>
            </aside>
        );
    }

    private _signout = async () => {
        try {
            const response = await AuthApi.logOut();

            if (response.status === 200) {
                localStorage.removeItem('user');
                this.props.history.push('/login');
            }
        } catch (error) {
            this.setState({
                errorMessage: error.response.data.reason
            });
        }
    };
}

export default withRouter(Sidebar);
