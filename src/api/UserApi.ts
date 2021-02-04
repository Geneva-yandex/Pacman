import {BaseApi} from './BaseApi';
import {IUser, IPasswordsDto, IUserProfileDto} from '../types/interfaces';
import {AxiosResponse} from 'axios';

class UserApi extends BaseApi {
    constructor() {
        super('user');
    }

    public getById(userId: number): Promise<AxiosResponse<IUser>> {
        return this.get<IUser>(userId.toString());
    }

    public changeProfile(profileDto: IUserProfileDto): Promise<AxiosResponse<IUser>> {
        return this.put<IUserProfileDto, IUser>('profile', profileDto);
    }

    public changeAvatar(avatar: File): Promise<any> {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return this.put<FormData, any>('profile/avatar', formData);
    }

    public changePassword(passwordsDto: IPasswordsDto): Promise<any> {
        return this.put<IPasswordsDto, any>('password', passwordsDto);
    }
}

export default new UserApi();
