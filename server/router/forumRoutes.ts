import {Router} from "express";
import ForumAPI from '../controllers/forumApi'

export const forumRoutes = (router: Router) => {
    const forumRoutes: Router = Router();

    forumRoutes
        .post('/',  ForumAPI.create)
        .post('/comment',  ForumAPI.comment)
        .get('/',  ForumAPI.getTopics)
        .get('/topic/:id', ForumAPI.getTopicWithComments)

    router.use('/api/forum', forumRoutes);
};
``
