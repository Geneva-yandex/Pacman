import * as React from 'react';
import {FC} from 'react';
import {Tab, Tabs} from '../../components/Tabs';
import {AccountForm, AvatarForm, PasswordForm} from './components';
import {ProfileTabs} from './types';
import {IUser, IPasswordRequest} from '../../types/interfaces';

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
                <PasswordForm onSave={(passwords: IPasswordRequest) => {
                    console.log(passwords);
                }} />
            </Tab>
            <Tab name={ProfileTabs.Avatar} title="Аватар">
                <AvatarForm
                    onSave={(avatar: File) => {
                        console.log(avatar);
                    }}
                    avatar={'https://t1.pixers.pics/img-d5043af1/kangaskuvat-wow-pop-art-kasvot-seksikas-yllattynyt-nainen-vaaleanpunainen-kihara-hiukset-ja-avata-suuhun-tilalla-aurinkolasit-kadessaan-merkinta-wow-heijastus-vektori-varikas-tausta-pop-art-retro-koominen-tyyli.png?H4sIAAAAAAAAA5VQS26EMAy9Dkhh7CSOw3CA2c4RUCChg8pAlNB2OqdvUNVNpS4qL_z8fX6GtzW7KcAY1j0kuM_eLwGmeSlR7lLI8zNUhllg3ZXsUiEWtL2HNKYtVo1RoiErGFvBUtfdhyuDd5deq9u-x9wBZH2K86NsK27MMN4zKJQMyGCsMUSKyA5MfVy2fd0ajQ-Np7i-CDys7lyMy2efQuHMoXdLvLl_LG-9PrPutyG5Z_Obov5RSIiCDmXTVq7fq6MGf5B8YyjtcLlCISMLUkHbgj6S_eUqmaxUbav7aWBv_WDOapjKF4NmIjSeZUBLzPgF2oXazX8BAAA='} />
            </Tab>
        </Tabs>
    </div>;
};

export default ProfilePage;
