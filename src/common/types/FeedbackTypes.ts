export enum FeedbackFieldsEnum {
    Name = 'name',
    Phone = 'phone',
    Question = 'question'
}

export type FeedbackType = {
    [FeedbackFieldsEnum.Name]: string,
    [FeedbackFieldsEnum.Phone]: string,
    [FeedbackFieldsEnum.Question]: string
};

export type FeedbackResponseType = 'OK';
