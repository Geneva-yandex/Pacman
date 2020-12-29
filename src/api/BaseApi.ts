import {BASE_API_URL} from '../misc/constants';
import axios, {AxiosResponse} from 'axios';

axios.defaults.withCredentials = true;

export class BaseApi {
    // eslint-disable-next-line no-useless-constructor
    constructor(public apiControllerName: string) {
    }

    public get<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.get<T>(this._url(url));
    }

    public post<D, T>(url: string, data?: D): Promise<AxiosResponse<T>> {
        return axios.post<T>(this._url(url), data);
    }

    public put<D, T>(url: string, data?: D): Promise<AxiosResponse<T>> {
        return axios.put<T>(this._url(url), data);
    }

    public delete<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(this._url(url));
    }

    private _url(url: string = ''): string {
        return `${BASE_API_URL}/${this.apiControllerName}/${url}`;
    }
}
