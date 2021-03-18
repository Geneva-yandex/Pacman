import {Router} from 'express';
import UserThemeApi from '../controllers/UserThemeApi';

const themesRoutes = (router: Router) => {
    const userThemeRouter: Router = Router();

    userThemeRouter.post('/', UserThemeApi.setUserTheme);

    router.use('/api/userThemes', userThemeRouter);
};

export default themesRoutes;
