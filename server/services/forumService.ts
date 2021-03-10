import Topic from '../db/tables/Topic';
import Message from '../db/tables/Message';

interface createRequest {
    title: string;
    description: string;
    user_id: number,
    last_message_txt?: string
}

interface createMessage {
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

    }

    public static getTopic = async (id: number) =>
    {
        const topic = await Topic.findByPk(id);

        return topic;

    }

    public static getComment = async (id: number) =>
    {
        const comments = await Message.findAll({
            where: {
                topic_id: id
            }
        })

        return comments;
    }

    public static createTopic = async (request: createRequest) => {
        // @ts-ignore
        const createdTopic = await Topic.create(request);
        return createdTopic;
    }

    public static leaveComment = async (request: createMessage) => {
        // @ts-ignore
        const createdMessage = await Message.create(request);
        return createdMessage;
    }

}

export default ForumService
