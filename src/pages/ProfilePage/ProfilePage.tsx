import * as React from 'react';
import bem from 'easy-bem';

// eslint-disable-next-line no-warning-comments
// TODO: настроить короткие импорты от корня
import {Tab, Tabs} from '../../components/ui/Tabs';
import {AccountForm, AvatarForm, PasswordForm} from './components';
import {ProfileTabs} from './types';
import {IUser, IPsswordsDto} from '../../types/interfaces';
import checkForAuthOrRedirect from '../../misc/utils/checkForAuthOrRedirect';
import {RouteComponentProps, withRouter} from 'react-router';
import {AuthApi, UserApi} from '../../api';
import './ProfilePage.scss';

interface IProfilePageState {
    currentTab: ProfileTabs;
    user: IUser;
}

const b = bem('ProfilePage');

class ProfilePage extends React.Component<RouteComponentProps, IProfilePageState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            currentTab: ProfileTabs.Account,
            user: {} as IUser
        };

        this._changeProfile.bind(this);
        this._changePasswords.bind(this);
        this._changeAvatar.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line no-warning-comments
        // TODO: Вынести хранение юзера в стор, добавить ProtectedRoute
        checkForAuthOrRedirect()
            .then(res => {
                this.setState({
                    user: res.user as IUser
                });
            })
            .catch(error => {
                this.props.history.push('/login');
                console.error(error);
            });
    }

    render() {
        const {user, currentTab} = this.state;

        return <div className={b()}>
            <header className={b('header')}>
                <h1>Профиль</h1>
            </header>

            <Tabs selectedTab={currentTab} onSelect={(tab: ProfileTabs) => this.setState({currentTab: tab})}>
                <Tab name={ProfileTabs.Account} title="Информация">
                    <AccountForm user={user} onSave={this._changeProfile} />
                </Tab>
                <Tab name={ProfileTabs.Password} title="Пароль">
                    <PasswordForm onSave={this._changePasswords} />
                </Tab>
                <Tab name={ProfileTabs.Avatar} title="Аватар">
                    <AvatarForm avatar={user.avatar} onSave={this._changeAvatar} />
                </Tab>
            </Tabs>
        </div>;
    }

    private async _changeProfile(user: IUser) {
        // eslint-disable-next-line no-warning-comments
        // TODO: убрать сайдэффект обновления в стор
        try {
            const response = await UserApi.changeProfile(user);
            this.setState({user: response.data});
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
        } catch (error) {
            console.error(error);
        }
    }
}

export default withRouter(ProfilePage);
