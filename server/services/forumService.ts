import Topic from '../db/postgres/models/Topic';
import Message from '../db/postgres/models/Message';
import {CommentCreateDto, ForumMessageCreateDto} from '../dto';

class ForumService {
    public static getTopics = async () => {
        const allTopics = await Topic.findAll();
        return allTopics;
    };

    public static getTopic = async (id: number) => {
        const topic = await Topic.findOne({
            where: {id},
            include: [Message as any]
        });

        return topic;
    };

    public static getComment = async (id: number) => {
        const comments = await Message.findAll({
            where: {
                topic_id: id
            }
        });

        return comments;
    };

    public static createTopic = async (request: CommentCreateDto) => {
        // @ts-ignore
        const createdTopic = await Topic.create(request);
        return createdTopic;
    };

    public static leaveComment = async (request: ForumMessageCreateDto) => {
        // @ts-ignore
        const createdMessage = await Message.create(request);
        return createdMessage;
    };
}

export default ForumService;
