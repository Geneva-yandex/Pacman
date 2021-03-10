import {Request, Response} from 'express';
import feedbackServiceInstance from '../services/FeedbackService';

export default class FeedbackAPI {
    public static create = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            await feedbackServiceInstance.create(body);
            response.send('OK');
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
