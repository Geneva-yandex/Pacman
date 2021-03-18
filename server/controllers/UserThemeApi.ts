import {Request, Response} from 'express';

export default class UserThemeApi {
    public static setUserTheme = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            // await feedbackServiceInstance.create(body);
            response.json(body);
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
