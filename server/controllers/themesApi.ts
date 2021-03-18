import {Request, Response} from 'express';

export default class ThemesApi {
    public static create = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            // await feedbackServiceInstance.create(body);
            response.json(body);
        } catch (error) {
            response.status(500).send({error});
        }
    };

    public static getById = async (_request: Request, response: Response) => {
        try {
            // await feedbackServiceInstance.create(body);
            response.send('ok');
        } catch (error) {
            response.status(500).send({error});
        }
    };

    public static getAll = async (_request: Request, response: Response) => {
        try {
            // await feedbackServiceInstance.create(body);
            response.send('ok');
        } catch (error) {
            response.status(500).send({error});
        }
    };

    public static update = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            // await feedbackServiceInstance.create(body);
            response.json(body);
        } catch (error) {
            response.status(500).send({error});
        }
    };

    public static delete = async (_request: Request, response: Response) => {
        try {
            // await feedbackServiceInstance.create(body);
            response.send('ok');
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
