import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';
import SVG from 'react-inlinesvg';
import bem from 'easy-bem';
import './Sidebar.scss';

import AuthApi from 'api/AuthApi';
import {Tooltip} from '../ui';
import {boundActions} from '../../store/initClientStore';

import {
    GameIcon,
    RatingIcon,
    ChatIcon,
    UserIcon,
    SignOutIcon,
    HelpIcon,
    ThemeIcon
} from './sidebar-icons';

import {IStore} from '../../store/types';
import {ThunkDispatch} from 'redux-thunk';
import {IUserStore} from '../../store/user';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {ThemeStateActions} from '../../store/theme/actions';
import {IThemeState} from '../../store/theme/reducer';

const b = bem('Sidebar');

interface ISidebarProps {
    className?: string;
    theme: IThemeState;
    toggleTheme: (theme: string) => {};
}

class Sidebar extends PureComponent<ISidebarProps> {
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
                        <li>
                            <Tooltip id='feedbackTooltip' tooltip='Feedback'>
                                <NavLink activeClassName='active' className='icon-link icon-link-help' to='feedback'>
                                    <SVG src={HelpIcon} />
                                </NavLink>
                            </Tooltip>
                        </li>
                    </ul>
                </nav>

                <div className={b('actions')}>
                    <ul className={b('nav-list')}>
                        <li>
                            <Tooltip id='themeTooltip' tooltip='Toggle dark/light theme'>
                                <button className='icon-button theme-icon' onClick={this._changeUserTheme}>
                                    <SVG src={ThemeIcon} />
                                </button>
                            </Tooltip>
                        </li>
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

    private _changeUserTheme = async () => {
        const theme = this.props.theme.name === 'dark' ? 'light' : 'dark';
        this.props.toggleTheme(theme);
    };

    private _signOut = async () => {
        try {
            const response = await AuthApi.logOut();

            if (response.status === 200) {
                localStorage.removeItem('user');
                boundActions.router.push('/login');
            }
        } catch (error) {
            this.setState({
                errorMessage: error.response.data.reason
            });
        }
    };
}

const mapStateToProps = (state: IStore) => ({
    theme: state.theme
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserStore, void, Action>) => ({
    toggleTheme: (theme: string) => dispatch(ThemeStateActions.toggleTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
