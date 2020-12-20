import axios from 'axios'
import baseUrl from '../../baseUrl';



const ApiOperationName = 'auth';

function logOut() {
    return axios
        .post(`${baseUrl}${ApiOperationName}/logout`)
}

export default logOut;