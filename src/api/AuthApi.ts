import {AxiosResponse} from 'axios';
import {BaseApi} from './BaseApi';
import {SignUpValueObject, LogInValueObject} from 'common/types/types';
import {IUser} from 'common/types/interfaces';

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

    public sendLogInRequest(logInValueObject: LogInValueObject) {
        return this.post<LogInValueObject, IUser>('signin', logInValueObject);
    }

    public sendAuthRequest(SignUpValueObject: SignUpValueObject) {
        return this.post<SignUpValueObject, IUser>('signup', SignUpValueObject);
    }
}

export default new AuthApi();
