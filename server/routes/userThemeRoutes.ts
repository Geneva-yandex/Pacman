import {Router} from 'express';
import UserThemeApi from '../controllers/userThemeApi';
import {authReq} from '../middlewares/auth';

const themesRoutes = (router: Router) => {
    const userThemeRouter: Router = Router();

    userThemeRouter.post('/', authReq, UserThemeApi.setUserTheme);

    router.use('/api/userThemes', userThemeRouter);
};

export default themesRoutes;
