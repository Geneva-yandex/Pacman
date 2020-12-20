import axios from 'axios';
import baseUrl from '../../baseUrl';

const ApiOperationName = 'auth';

function getUserInfo() {
    return axios
        .get(`${baseUrl}${ApiOperationName}/user`);
}

export default getUserInfo;
