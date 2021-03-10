import {FeedbackType} from '../../common/types/FeedbackTypes';

export interface IFeedbackFormState {
    submitSucceeded: boolean,
    error: any,
    values: FeedbackType
}

