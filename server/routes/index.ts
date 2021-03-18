import {Router} from 'express';
import feedbackRoutes from './feedbackRoutes';

// eslint-disable-next-line new-cap
const router: Router = Router();

feedbackRoutes(router);

export default router;
