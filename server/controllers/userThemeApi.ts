import {Request, Response} from 'express';
import UserThemeServiceService from '../services/userThemeService';
import {UserThemeCreateDto} from '../dto';

/**
 * @typedef {object} UserThemeCreateDto
 * @property {number} themeId.required
 * @property {number} ownerId.required
 */

export default class UserThemeApi {
    /**
     * POST /api/userThemes
     * @summary Привязывает тему пользователю
     * @tags UserTheme
     * @param {UserThemeCreateDto} request.body.required
     * @return 200 - ok
     * @return 500
     */
    public static setUserTheme = async (request: Request, response: Response) => {
        const {body} = request;
        const user = response.locals.user;

        if (!user) {
            response.status(404).json(new Error('Пользователь не найден'));
        }

        try {
            const userTheme = await UserThemeServiceService.getUserTheme(user.id);

            const actionDto: UserThemeCreateDto = {
                themeId: body.themeId,
                ownerId: user.id
            };

            // eslint-disable-next-line no-unused-expressions
            userTheme !== null ?
                await UserThemeServiceService.updateUserTheme(actionDto) :
                await UserThemeServiceService.setUserTheme(actionDto);

            response.send('ok');
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
