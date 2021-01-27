import axios from 'axios';
import baseUrl from '../baseUrl';


import {SignUpValueObject, LogInValueObject} from '../../types/types';

const ApiOperationName = 'auth';

axios.defaults.withCredentials = true;


class AuthApi {
    public getUserInfo() {
        return axios
            .get(`${baseUrl}${ApiOperationName}/user`);
    }

    public logOut() {
        return axios
            .post(`${baseUrl}${ApiOperationName}/logout`);
    }

    public sendLogInRequest(logInValueObject: LogInValueObject) {
        return axios
            .post(`${baseUrl}${ApiOperationName}/signin`, logInValueObject);
    }

    public sendAuthRequest(SignUpValueObject: SignUpValueObject) {
        return axios
            .post(`${baseUrl}${ApiOperationName}/signup`, SignUpValueObject);
    }
}

export default new AuthApi();
