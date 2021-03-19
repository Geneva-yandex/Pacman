import {Request, Response} from 'express';
import ThemesService from '../services/themeService';

/**
 * @typedef {object} SiteThemeDto
 * @property {number} id.required
 * @property {string} name.required
 * @property {string} theme.required
 */

/**
 * @typedef {object} SiteThemeCreateDto
 * @property {string} name.required
 * @property {string} theme.required
 */

export default class ThemesApi {
    /**
     * POST /api/themes
     * @summary Создаёт новую тему интерфейса
     * @tags Themes
     * @param {SiteThemeCreateDto} request.body.required
     * @return {SiteThemeDto} 201 - Тема создана
     * @return 500
     */
    public static create = async (request: Request, response: Response) => {
        const {body} = request;

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
            response.status(500).json(error);
        }
    };

    /**
     * GET /api/themes/:id
     * @summary Возвращает тему по id
     * @tags Themes
     * @return {SiteThemeDto} 200
     * @return 404 - Тема не найдена
     * @return 500
     */
    public static getById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        try {
            const theme = await ThemesService.findById(id);

            if (!theme) {
                response.status(404).json(new Error('Тема не найдена'));
            }

            response.json(theme);
        } catch (error) {
            response.status(500).json(error);
        }
    };

    /**
     * GET /api/themes
     * @summary Возвращает темы
     * @tags Themes
     * @return {array<SiteThemeDto>} 200
     * @return 500
     */
    public static getAll = async (_request: Request, response: Response) => {
        try {
            const themes = await ThemesService.findALL();
            response.json(themes);
        } catch (error) {
            response.status(500).json(error);
        }
    };

    /**
     * PUT /api/themes
     * @summary Обновляет тему
     * @tags Themes
     * @param {SiteThemeDto} request.body.required
     * @return {SiteThemeDto} 200 - success response
     * @return 500
     */
    public static update = async (request: Request, response: Response) => {
        const {body} = request;

        try {
            const theme = await ThemesService.update(body);
            response.json(theme);
        } catch (error) {
            response.status(500).json(error);
        }
    };

    /**
     * DELETE /api/themes/:id
     * @summary Удаляет тему
     * @tags Themes
     * @return 200
     * @return 500
     */
    public static delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        try {
            await ThemesService.delete(id);
            response.send('ok');
        } catch (error) {
            response.status(500).send(error);
        }
    };
}
