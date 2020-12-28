export interface IBaseId<T = number> {
    id: T;
}

export interface IUser extends IBaseId {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    role?: string;
}
