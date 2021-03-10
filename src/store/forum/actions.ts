import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {action} from 'typesafe-actions';

import ForumApi from '../../api/ForumApi';
import {IForumStore} from './types';
import {IComment, ICommentCreateData, ITopicCreateData, ITopicData} from "../../common/types/interfaces";

export const SET_TOPICS = 'SET_TOPICS';
export const SET_TOPIC = 'SET_TOPIC';
export const CREATE_TOPIC = 'CREATE_TOPIC';
export const COMMENT_TOPIC = 'COMMENT_TOPIC';
export const FAILED_FORUM = 'FAILED_FORUM';
export const PENDING_TOPICS = 'PENDING_TOPICS';

export const setTopics = (topics: { topics: ITopicData[] }) => action(SET_TOPICS, topics);
export const setTopic = (topic: { activeTopic: IForumStore['activeTopic']}) => action(SET_TOPIC, topic);
export const createTopic = (topic: ITopicData) => action(CREATE_TOPIC, topic);
export const commentTopic = (comment: IComment) => action(COMMENT_TOPIC, comment);
export const failedForum = () => action(FAILED_FORUM);
export const pendingForum = () => action(PENDING_TOPICS);


type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;

export class ForumEntityActions {
    static getTopics = () => async (dispatch: Dispatch) => {
        dispatch(pendingForum());
        try {
            const topicsPromise = await ForumApi.get();
            const topics = topicsPromise.data;
            dispatch(setTopics({
                topics: topics
            }))
        } catch (e) {
            dispatch(failedForum())
        }
    }
    static createTopic = (topicData: ITopicCreateData) => async (dispatch: Dispatch) => {
        try {
            const newTopic = await ForumApi.createTopic(topicData);
            if (newTopic.status === 200) {
                dispatch(createTopic(newTopic.data));
            } else {
                dispatch(failedForum());
            }

        } catch (e) {
            dispatch(failedForum());
        }
    }

    static getTopic = (id: number) => async (dispatch: Dispatch) => {
        console.log('get topic');
        try {
            const topic = await ForumApi.getTopic(id);
            console.log(topic);
            if (topic.status == 200) {
                dispatch(setTopic({
                    activeTopic: topic.data,
                }))
            } else {
                dispatch(failedForum());
            }
        } catch (e) {
            dispatch(failedForum());
        }
    }

    static leaveComment = (commentData: ICommentCreateData) => async (dispatch: Dispatch) => {
        try {
            const newComment = await ForumApi.createComment(commentData);
            if (newComment.status == 200) {
                dispatch(commentTopic(newComment.data))
            }
        } catch (e) {
          dispatch(failedForum());
        }
    }

}
