import React from 'react';
import bem from 'easy-bem';
import {Tab, Tabs} from 'components/ui';
import {IUser, IPasswordsDto} from 'common/types/interfaces';
import {AccountForm, AvatarForm, PasswordForm} from './components';
import {IProfilePageProps, IProfilePageState, ProfileTabs} from './types';
import './ProfilePage.scss';
import Meta from '../../components/Meta/Meta';

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
            <Meta title={'Profile'}/>
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

export default ProfilePage;
