import {Request, Response} from 'express';
import ForumService from '../services/forumService';
import getId from '../services/getIdParam';
import practicumApi from '../services/practicumApi';

/**
 * @typedef {object} ForumMessageCreateDto
 * @property {string} title.required
 * @property {string} description.required
 * @property {number} user_id.required
 * @property {number} message_id.required
 * @property {number} topic_id.required
 */

/**
 * @typedef {object} CommentCreateDto
 * @property {string} title.required
 * @property {string} description.required
 * @property {number} user_id.required
 * @property {number} last_message_txt
 */

class ForumApi {
    /**
     * GET /api/forum/topic/users
     * @summary Возвращает пользователей
     * @tags Forum
     * @return 200 - Запись создана
     */
    public static getUsers = async (_req: Request, res: Response) => {
        const {body} = _req;
        const users = await practicumApi.getUsers(body);
        res.status(200).json(users);
    };

    /**
     * POST /api/forum
     * @summary Добавляет запись форума
     * @tags Forum
     * @param {ForumMessageCreateDto} request.body.required
     * @return 200 - Запись создана
     * @return 400
     */
    public static create = async (req: Request, res: Response) => {
        const {body} = req;
        try {
            let topicData = await ForumService.createTopic(body);
            res.status(200).json(topicData);
        } catch (e) {
            res.status(400).json({error: e});
        }
    };

    /**
     * POST /api/forum/comment
     * @summary Добавляет комментарий
     * @tags Forum
     * @param {CommentCreateDto} request.body.required
     * @return 200 - Комментарий добавлен
     * @return 400
     */
    public static comment = async (req: Request, res: Response) => {
        const {body} = req;

        try {
            let topicComment = await ForumService.leaveComment(body);
            res.status(200).json(topicComment);
        } catch (e) {
            res.status(400).json({error: e});
        }
    };

    /**
     * GET /api/forum
     * @summary Возвращает записи формуа
     * @tags Forum
     * @return 200
     */
    public static getTopics = async (_req: Request, res: Response) => {
        const topics = await ForumService.getTopics();
        res.status(200).json(topics);
    };

    /**
     * GET /api/forum/topic/:id
     * @summary Возвращает комментарии записи формуа
     * @tags Forum
     * @return 200
     * @return 400
     * @return 404 - topic has not been found
     */
    public static getTopicWithComments = async (req: Request, res: Response) => {
        let id = getId(req);

        try {
            const topic = await ForumService.getTopic(id);

            if (topic === null) {
                res.status(404).json({error: 'topic has not been found'});
                return;
            }

            res.status(200).json({topic});
        } catch (e) {
            res.status(400).json({error: e});
        }
    };
}

export default ForumApi;
