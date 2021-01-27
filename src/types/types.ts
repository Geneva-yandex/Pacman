export type SignUpValueObject = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

export type LogInValueObject = {
    login: string;
    password: string;
    remember: boolean;
};

export type UserDTO = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
};
