import axios from 'axios'
import baseUrl from '../../baseUrl';

axios.defaults.withCredentials = true

type logInValueObject = {
    login: string;
    password: string;
    remember: boolean;
}

const ApiOperationName = 'auth';

function sendLogInRequest(logInValueObject: logInValueObject) {
    return axios
        .post(`${baseUrl}${ApiOperationName}/signin`, logInValueObject)
}

export default sendLogInRequest;