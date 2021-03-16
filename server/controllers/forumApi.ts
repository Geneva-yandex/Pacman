import { Request, Response } from 'express';
import ForumService from '../services/forumService';
import getId from '../services/getIdParam';



class ForumApi{

    public static getUsers = async (req: Request, res: Response) => {
        console.log(req);
        const users = await ForumService.getUsers([1, 2, 3, 4, 5]);
        res.status(200).json(users);
    }

    public static create = async (req : Request, res: Response) =>
    {
        const {body} = req;
        try {
            let topicData = await ForumService.createTopic(body);
            res.status(200).json(topicData);
        } catch (e) {
            res.status(400).json({"error": e});
        }

    };

    public static comment = async (req: Request, res: Response) =>
    {
        const {body} = req;

        try {
            let topicComment = await ForumService.leaveComment(body);
            res.status(200).json(topicComment);
        } catch (e) {
            res.status(400).json({"error": e})
        }
    };

    public static getTopics = async (req : Request, res: Response) =>
    {
        console.log(req);
        const topics = await ForumService.getTopics();
        res.status(200).json(topics);
    }

    public static getTopicWithComments = async (req: Request, res: Response) =>
    {
        let id = getId(req);

        try {

            const topic = await ForumService.getTopic(id);

            if (topic == null) {
                res.status(404,).json( {"error": "topic has not been found"});
                return;
            }
            res.status(200).json({topic});

        } catch (e) {
            res.status(400).json( {"error" : e} )
        }

    }
}

export default ForumApi;
