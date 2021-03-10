import {ITopicData} from "../../common/types/interfaces";

export interface IForumStore {
    activeTopic: ITopicData | null,
    topics: ITopicData[] | null
}

export enum ForumStatusEnum {
    Pending = 'pending',
    Success = 'success',
    Failed = 'failed',
}
