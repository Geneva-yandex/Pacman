import {Router} from 'express';
import forumRoutes from './forumRoutes';
import feedbackRoutes from './feedbackRoutes';

const router: Router = Router();

feedbackRoutes(router);
forumRoutes(router);

export default router;
