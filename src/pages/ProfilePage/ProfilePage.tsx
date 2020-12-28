import * as React from 'react';
import {FC} from 'react';
import {Tab, Tabs} from '../../components/Tabs';
import {AccountForm, AvatarForm, PasswordForm} from './components';
import {ProfileTabs} from './types';
import {IUser} from '../../types/interfaces';

const user: IUser = {
    id: 1,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
};

const ProfilePage: FC = () => {
    const [currentTab, setCurrentTab] = React.useState(ProfileTabs.Account);

    return <div className="container-fluid">
        <Tabs selectedTab={currentTab} onSelect={(tab: ProfileTabs) => setCurrentTab(tab)}>
            <Tab name={ProfileTabs.Account} title="Информация">
                <AccountForm user={user} onSave={(user: IUser) => {
                    console.log(user);
                }} />
            </Tab>
            <Tab name={ProfileTabs.Password} title="Пароль">
                <PasswordForm />
            </Tab>
            <Tab name={ProfileTabs.Avatar} title="Аватар">
                <AvatarForm />
            </Tab>
        </Tabs>
    </div>;
};

export default ProfilePage;
