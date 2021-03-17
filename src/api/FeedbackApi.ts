import {BaseApi} from './BaseApi';
import {AxiosResponse} from 'axios';
import {FeedbackType, FeedbackResponseType} from '../common/types/FeedbackTypes';

class FeedbackApi extends BaseApi {
    constructor() {
        super('feedback', '');
    }

    public sendQuestion(data: FeedbackType): Promise<AxiosResponse<FeedbackResponseType>> {
        return this.post<FeedbackType, FeedbackResponseType>('', data);
    }
}

export default new FeedbackApi();
