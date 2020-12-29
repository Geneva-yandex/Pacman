import {BaseApi} from './BaseApi';
import {SignUpValueObject, logInValueObject} from '../types/types';
import {IUser} from '../types/interfaces';
import {AxiosResponse} from 'axios';

class AuthApi extends BaseApi {
    constructor() {
        super('auth');
    }

    public getUserInfo(): Promise<AxiosResponse<IUser>> {
        return this.get<IUser>('user');
    }

    public logOut() {
        return this.post('logout');
    }

    public sendLogInRequest(logInValueObject: logInValueObject) {
        return this.post<logInValueObject, IUser>('signin', logInValueObject);
    }

    public sendAuthRequest(SignUpValueObject: SignUpValueObject) {
        return this.post<SignUpValueObject, IUser>('signup', SignUpValueObject);
    }
}

export default new AuthApi();
