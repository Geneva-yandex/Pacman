import {Request, Response} from 'express';
import ThemesService from '../services/themeService';

export default class ThemesApi {
    public static create = async (request: Request, response: Response) => {
        const {body} = request;

        console.log(body);

        try {
            const exist = await ThemesService.findOne({name: body.name});

            if (exist) {
                response.status(400).json(new Error('Тема уже существует'));
            }

            const theme = await ThemesService.create({
                name: body.name,
                theme: body.theme
            });
            response.status(201).json(theme);
        } catch (error) {
            response.status(500).send({error});
        }
    };

    public static getById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        try {
            const theme = await ThemesService.findById(id);

            if (!theme) {
                response.statusCode = 404;
                response.json(new Error('Тема не найдена'));
            }

            response.json(theme);
        } catch (error) {
            console.log(1);
            response.status(500).json({error: error.toString()});
        }
    };

    public static getAll = async (_request: Request, response: Response) => {
        try {
            const themes = await ThemesService.findALL();
            response.json(themes);
        } catch (error) {
            response.statusCode = 500;
            response.send({error});
        }
    };

    public static update = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            // await feedbackServiceInstance.create(body);
            response.json(body);
        } catch (error) {
            response.statusCode = 500;
            response.send({error});
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
