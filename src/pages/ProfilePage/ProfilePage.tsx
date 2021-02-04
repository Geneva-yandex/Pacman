import React from 'react';
import bem from 'easy-bem';
import {Action, compose} from 'redux';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {withRouter} from 'react-router';
import {Tab, Tabs} from 'components/ui';
import {IUser, IPasswordsDto} from 'types/interfaces';
import {IStoreState} from 'store/types';
import {IUserState, UserStateActions} from 'store/user';

import {AccountForm, AvatarForm, PasswordForm} from './components';
import {IProfilePageProps, IProfilePageState, ProfileTabs} from './types';
import './ProfilePage.scss';

const b = bem('ProfilePage');

class ProfilePage extends React.PureComponent<IProfilePageProps, IProfilePageState> {
    constructor(props: IProfilePageProps) {
        super(props);

        this.state = {
            currentTab: ProfileTabs.Account
        };

        this._onSelectTab = this._onSelectTab.bind(this);
    }

    render() {
        const {currentTab} = this.state;
        const {user} = this.props;

        return <div className={b()}>
            <header className={b('header')}>
                <h1>Profile</h1>
            </header>

            <Tabs selectedTab={currentTab} onSelect={this._onSelectTab}>
                <Tab name={ProfileTabs.Account} title='Personal Info'>
                    <AccountForm user={user.item}
                        onSave={(user: IUser) => this.props.updateUser(user)} />
                </Tab>
                <Tab name={ProfileTabs.Password} title='Password'>
                    <PasswordForm
                        onSave={(passwords: IPasswordsDto) => this.props.changePassword(passwords)} />
                </Tab>
                <Tab name={ProfileTabs.Avatar} title='Avatar'>
                    <AvatarForm avatar={user.item?.avatar}
                        onSave={(avatar: File) => this.props.updateAvatar(avatar)} />
                </Tab>
            </Tabs>
        </div>;
    }

    private _onSelectTab(tab: ProfileTabs) {
        this.setState({currentTab: tab});
    }
}

const mapStateToProps = (state: IStoreState) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserState, void, Action>) => ({
    updateUser: (user: IUser) => dispatch(UserStateActions.updateUser(user)),
    updateAvatar: (avatar: File) => dispatch(UserStateActions.updateAvatar(avatar)),
    changePassword: (passwords: IPasswordsDto) => dispatch(UserStateActions.changePassword(passwords))
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProfilePage);
