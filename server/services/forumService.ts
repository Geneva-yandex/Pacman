import Topic from '../db/postgres/models/Topic';
import Message from '../db/postgres/models/Message';

interface CreateRequest {
    title: string;
    description: string;
    user_id: number,
    last_message_txt?: string
}

interface CreateMessage {
    title: string,
    description: string,
    user_id: number,
    message_id: number,
    topic_id: number,
}

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

    public static createTopic = async (request: CreateRequest) => {
        // @ts-ignore
        const createdTopic = await Topic.create(request);
        return createdTopic;
    };

    public static leaveComment = async (request: CreateMessage) => {
        // @ts-ignore
        const createdMessage = await Message.create(request);
        return createdMessage;
    };
}

export default ForumService;
