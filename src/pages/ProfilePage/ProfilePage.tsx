import * as React from 'react';
import {FC} from 'react';
import {Tab, Tabs} from '../../components/Tabs';
import {AccountForm, AvatarForm, PasswordForm} from './components';
import {ProfileTabs} from './types';

const ProfilePage: FC = () => {
    const [currentTab, setCurrentTab] = React.useState(ProfileTabs.Account);

    return <div className="container-fluid">
        <Tabs selectedTab={currentTab} onSelect={(tab: ProfileTabs) => setCurrentTab(tab)}>
            <Tab name={ProfileTabs.Account} title="Информация">
                <AccountForm />
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
