import axios from 'axios';
import baseUrl from '../../baseUrl';

type SignUpValueObject = {
    'first_name': string,
    'second_name': string,
    'login': string,
    'email': string,
    'password': string,
    'phone': string
};

const ApiOperationName = 'auth';

function sendAuthRequest(SignUpValueObject: SignUpValueObject) {
    return axios
        .post(`${baseUrl}${ApiOperationName}/signup`, SignUpValueObject);
}

export default sendAuthRequest;
