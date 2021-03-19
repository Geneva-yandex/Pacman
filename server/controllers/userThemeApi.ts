import {Request, Response} from 'express';
import UserThemeServiceService from '../services/userThemeService';
import {UserThemeCreateDto} from '../dto';

export default class UserThemeApi {
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

            const newUserTheme = userTheme ?
                await UserThemeServiceService.updateUserTheme(actionDto) :
                await UserThemeServiceService.setUserTheme(actionDto);

            response.json(newUserTheme);
        } catch (error) {
            response.status(500).send({error});
        }
    };
}
