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

export type IUserProfileDto = IBaseUser;

export interface ITopicCreateData {
    title: string,
    description: string,
    user_id: number,
}

export interface ITopicData {
    id: number,
    title: string,
    description: string,
    user_id: number,
    last_message_txt: string,
    comments: IComment[]
}

export interface ICommentCreateData {
    title: string,
    description: string,
    user_id: number,
    topic_id: number,
    message_id: number | null
}

export interface IComment {
    id: number,
    title: string,
    description: string,
    user_id: number,
    message_id: number,
    topic_id: string,
}
