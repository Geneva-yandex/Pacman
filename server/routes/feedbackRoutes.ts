import {Router} from 'express';
import FeedbackAPI from '../api/FeedbackAPI';

const feedbackRoutes = (router: Router) => {
    // eslint-disable-next-line new-cap
    const feedbackRouter: Router = Router();

    feedbackRouter.post('/', FeedbackAPI.create);

    router.use('/feedback', feedbackRouter);
};

export default feedbackRoutes;
