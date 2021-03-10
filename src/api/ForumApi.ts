import axios, {AxiosResponse} from "axios";
import {ITopicData} from "../common/types/interfaces";

interface topicData {
    title: string,
    description: string
}

interface commentData {
    title: string,
    description: string,
    user_id: number,
    topic_id: number,
    message_id: number | null,
}


class ForumApi {
    private url = 'http://localhost:9001';
    private forumApiUrl = '/api/forum/';

    public get(): Promise<AxiosResponse<ITopicData[]>> {
        return axios
            .get(this._url(''));
    }

    public getTopic = (id: number) => {
        return axios
            .get(this._url(`topic/${id}`))
    }

    public createTopic = (topicData: topicData) => {
        return axios
            .post(this._url(''), topicData)
    }

    public createComment = (commentData: commentData) => {
        return axios
            .post(this._url('comment'), commentData)
    }

    public _url = (url: string) => {
        return `${this.url + this.forumApiUrl + url}`;
    }
}

export default new ForumApi();
