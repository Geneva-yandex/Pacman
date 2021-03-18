import {BaseApi} from './BaseApi';
import {IServiceId} from '../common/types/interfaces';
import {AxiosResponse} from 'axios';

class AuthApi extends BaseApi {
    constructor() {
        super('oauth/yandex');
    }

    public getOAuthClientID(): Promise<AxiosResponse<IServiceId>> {
        return this.get<IServiceId>('service-id');
    }

    public signInToYandex(code: string) {
        return this.post('', {code});
    }
}

export default new AuthApi();
