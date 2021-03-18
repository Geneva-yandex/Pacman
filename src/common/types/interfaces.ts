export interface IBaseId<T = number> {
    id: T;
}

export interface IPasswordsDto {
    oldPassword: string;
    newPassword: string;
}

export interface IBaseUser {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
}

export interface IUser extends IBaseId, IBaseUser {
    phone: string;
    avatar: string;
    role: string;
}

export type IServiceId = {
    service_id: string;
};

export type IUserProfileDto = IBaseUser;
