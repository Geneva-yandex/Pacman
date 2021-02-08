import React from 'react';
import bem from 'easy-bem';
import {RouteComponentProps, withRouter} from 'react-router';
import {Tab, Tabs} from 'components/ui';
import {IUser, IPsswordsDto} from '../../types/interfaces';
import {AuthApi, UserApi} from 'api';

import {AccountForm, AvatarForm, PasswordForm} from './components';
import {ProfileTabs} from './types';
import './ProfilePage.scss';
import Meta from '../../components/Meta/Meta';

interface IProfilePageState {
    currentTab: ProfileTabs;
    user: IUser;
}

const b = bem('ProfilePage');

class ProfilePage extends React.PureComponent<RouteComponentProps, IProfilePageState> {
    constructor(props: RouteComponentProps) {
        super(props);

        const _user = localStorage.getItem('user');
        const user = (_user ? JSON.parse(_user) : {}) as IUser;

        this.state = {
            currentTab: ProfileTabs.Account,
            user
        };

        this._onSelectTab = this._onSelectTab.bind(this);
        this._changeProfile = this._changeProfile.bind(this);
        this._changePasswords = this._changePasswords.bind(this);
        this._changeAvatar = this._changeAvatar.bind(this);
    }

    render() {
        const {user, currentTab} = this.state;

        return <div className={b()}>
            <Meta title={'Profile'}/>
            <header className={b('header')}>
                <h1>Profile</h1>
            </header>

            <Tabs selectedTab={currentTab} onSelect={this._onSelectTab}>
                <Tab name={ProfileTabs.Account} title='Personal Info'>
                    <AccountForm user={user} onSave={this._changeProfile} />
                </Tab>
                <Tab name={ProfileTabs.Password} title='Password'>
                    <PasswordForm onSave={this._changePasswords} />
                </Tab>
                <Tab name={ProfileTabs.Avatar} title='Avatar'>
                    <AvatarForm avatar={user.avatar} onSave={this._changeAvatar} />
                </Tab>
            </Tabs>
        </div>;
    }

    private _onSelectTab(tab: ProfileTabs) {
        this.setState({currentTab: tab});
    }

    private async _changeProfile(user: IUser) {
        // eslint-disable-next-line no-warning-comments
        // TODO: убрать сайдэффект обновления в стор
        try {
            const response = await UserApi.changeProfile(user);
            this.setState({user: response.data});
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    private async _changePasswords(passwords: IPsswordsDto) {
        try {
            await UserApi.changePassword(passwords);
        } catch (error) {
            console.error(error);
        }
    }

    private async _changeAvatar(avatar: File) {
        try {
            await UserApi.changeAvatar(avatar);
            const response = await AuthApi.getUserInfo();
            this.setState({user: response.data});
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}

export default withRouter(ProfilePage);
