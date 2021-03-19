import {Request, Response} from 'express';
import feedbackServiceInstance from '../services/feedbackService';

/**
 * @typedef {object} CreateFeedbackDto
 * @property {string} name.required
 * @property {string} phone.required
 * @property {string} question.required
 */

export default class FeedbackAPI {
    /**
     * POST /api/feedback
     * @summary Добавляет запись обратной связи
     * @tags Feedback
     * @param {CreateFeedbackDto} request.body.required
     * @return 200 - Заявка создана
     * @return 500
     */
    public static create = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            await feedbackServiceInstance.create(body);
            response.send('ОК');
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
