import {Router} from 'express';
import FeedbackAPI from '../controllers/FeedbackAPI';

const feedbackRoutes = (router: Router) => {
    const feedbackRouter: Router = Router();

    feedbackRouter.post('/', FeedbackAPI.create);

    router.use('/api/feedback', feedbackRouter);
};

export default feedbackRoutes;
