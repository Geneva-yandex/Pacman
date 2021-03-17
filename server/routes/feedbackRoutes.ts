import {Router, Request, Response} from 'express';
import FeedbackAPI from '../api/FeedbackAPI';

const feedbackRoutes = (router: Router) => {
    // eslint-disable-next-line new-cap
    const feedbackRouter: Router = Router();

    feedbackRouter.post('/', FeedbackAPI.create);

    feedbackRouter.get('/', (_: Request, res: Response) => res.json({ ping: 'pong' })); 

    router.use('/feedback', feedbackRouter);
};

export default feedbackRoutes;
