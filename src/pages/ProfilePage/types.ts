import {RouteComponentProps} from 'react-router';
import {IUserState} from 'store/user';
import {IPasswordsDto, IUser} from 'common/types/interfaces';

export enum ProfileTabs {
   Account = 'account',
   Password = 'password',
   Avatar = 'avatar'
}

export interface IProfilePageProps extends RouteComponentProps {
    user: IUserState;
    updateUser: (user: IUser) => Promise<void>;
    updateAvatar: (avatar: File) => Promise<void>;
    changePassword: (passwords: IPasswordsDto) => Promise<void>;
}

export interface IProfilePageState {
    currentTab: ProfileTabs;
}
