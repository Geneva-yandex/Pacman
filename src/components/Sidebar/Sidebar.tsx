import * as React from 'react';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps, withRouter} from 'react-router';
import SVG from 'react-inlinesvg';
import bem from 'easy-bem';
import './Sidebar.scss';
import AuthApi from '../../api/AuthApi';
import {Tooltip} from '../ui';

import {
    GameIcon,
    RatingIcon,
    ChatIcon,
    UserIcon,
    SignOutIcon
} from './sidebar-icons';

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
                            <Tooltip id='gameTooltip' tooltip='Gaming'>
                                <NavLink activeClassName='active' exact={true} className='icon-link' to='/'>
                                    <SVG src={GameIcon} />
                                </NavLink>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip id='ratingTooltip' tooltip='Leader Board'>
                                <NavLink activeClassName='active' className='icon-link' to='leaderboard'>
                                    <SVG src={RatingIcon} />
                                </NavLink>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip id='forumTooltip' tooltip='Forum'>
                                <NavLink activeClassName='active' className='icon-link' to='forum'>
                                    <SVG src={ChatIcon} />
                                </NavLink>
                            </Tooltip>
                        </li>
                    </ul>
                </nav>

                <div className={b('actions')}>
                    <ul className={b('nav-list')}>
                        <li>
                            <Tooltip id='userTooltip' tooltip='Profile'>
                                <NavLink activeClassName='active' className='icon-link' to='profile'>
                                    <SVG src={UserIcon} />
                                </NavLink>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip id='signOutTooltip' tooltip='Sign Out'>
                                <button className='icon-button' onClick={this._signOut}>
                                    <SVG src={SignOutIcon} />
                                </button>
                            </Tooltip>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }

    private _signOut = async () => {
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
