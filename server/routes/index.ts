import {Router} from 'express';
import forumRoutes from './forumRoutes';
import feedbackRoutes from './feedbackRoutes';
import themesRoutes from './themesRoutes';
import userThemeRoutes from './userThemeRoutes';

const router: Router = Router();

feedbackRoutes(router);
forumRoutes(router);
themesRoutes(router);
userThemeRoutes(router);

export default router;
