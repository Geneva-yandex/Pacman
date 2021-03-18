import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {action} from 'typesafe-actions';

import ForumApi from '../../api/ForumApi';
import {IForumStore} from './types';
import {IComment, ICommentCreateData, ITopicCreateData, ITopicData} from '../../common/types/interfaces';

export const SET_TOPICS = 'SET_TOPICS';
export const SET_TOPIC = 'SET_TOPIC';
export const CREATE_TOPIC = 'CREATE_TOPIC';
export const COMMENT_TOPIC = 'COMMENT_TOPIC';
export const FAILED_FORUM = 'FAILED_FORUM';
export const PENDING_TOPICS = 'PENDING_TOPICS';
export const CHANGE_RESPONSE = 'CHANGE_RESPONSE';

export const setTopics = (topics: { topics: ITopicData[] }) => action(SET_TOPICS, topics);
export const setTopic = (topic: { activeTopic: IForumStore['activeTopic'] }) => action(SET_TOPIC, topic);
export const createTopic = (topic: ITopicData) => action(CREATE_TOPIC, topic);
export const commentTopic = (comment: IComment) => action(COMMENT_TOPIC, comment);
export const changeResponseId = (responseId: { responseId: number }) => action(CHANGE_RESPONSE, responseId);
export const failedForum = () => action(FAILED_FORUM);
export const pendingForum = () => action(PENDING_TOPICS);

type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;

export class ForumEntityActions {
    static getTopics = () => async (dispatch: Dispatch) => {
        dispatch(pendingForum());
        try {
            const topicsPromise = await ForumApi.get();
            let topics = topicsPromise.data;
            let userIds: number[] = [];
            topics.forEach(topic => {
                if (userIds.indexOf(topic.user_id) === -1) {
                    userIds.push(topic.user_id);
                }
            });
            const users = await ForumApi.getAllUsers(userIds);

            topics = topics.map((topic: ITopicData) => {
                let topicUserId = topic.user_id;

                let user = users.find(user => user.data.id === topicUserId);

                if (user) {
                    topic.user = user.data;
                }

                return topic;
            });
            dispatch(setTopics({
                topics: topics
            }));
        } catch (e) {
            dispatch(failedForum());
        }
    };

    static createTopic = (topicData: ITopicCreateData) => async (dispatch: Dispatch) => {
        try {
            const newTopic = await ForumApi.createTopic(topicData);
            const users = await ForumApi.getAllUsers([newTopic.data.user_id]);
            const user = users[0].data;
            if (newTopic.status === 200) {
                newTopic.data.user = user;
                dispatch(createTopic(newTopic.data));
            } else {
                dispatch(failedForum());
            }
        } catch (e) {
            dispatch(failedForum());
        }
    };

    static getTopic = (id: number) => async (dispatch: Dispatch) => {
        try {
            const topic = await ForumApi.getTopic(id);
            if (topic.status === 200) {
                let activeTopic = topic.data.topic;

                let rawComments: IComment[] = activeTopic.Messages;

                let userIds = [activeTopic.user_id];

                rawComments.forEach((comment: IComment) => {
                    if (userIds.indexOf(comment.user_id) === -1) {
                        userIds.push(comment.user_id);
                    }
                });

                const users = await ForumApi.getAllUsers(userIds);

                activeTopic.user = users[0].data;

                rawComments = rawComments.map((comment: IComment) => {
                    let user = users.find(user => user.data.id === comment.user_id);
                    if (user) {
                        comment.user = user.data;
                    }
                    return comment;
                });

                console.log(rawComments);

                const rootComments = rawComments.filter((comment: IComment) => {
                    return comment.message_id === 0;
                });

                let comments = rootComments.map((comment: IComment) => {
                    let childComments = rawComments.filter((innerComment: IComment) => {
                        return comment.id === innerComment.message_id;
                    });
                    Object.defineProperty(comment, 'comments', {
                        writable: true,
                        configurable: true,
                        enumerable: true,
                        value: childComments
                    });



                    return comment;
                });

                Object.defineProperty(activeTopic, 'comments', {
                    writable: true,
                    configurable: true,
                    enumerable: true,
                    value: comments
                });

                dispatch(setTopic({
                    activeTopic: activeTopic
                }));
            } else {
                dispatch(failedForum());
            }
        } catch (e) {
            console.log(e);
            dispatch(failedForum());
        }
    };

    static leaveComment = (commentData: ICommentCreateData) => async (dispatch: Dispatch) => {
        try {
            const newComment = await ForumApi.createComment(commentData);
            const users = await ForumApi.getAllUsers([newComment.data.user_id]);
            const user = users[0].data;
            if (newComment.status === 200) {
                newComment.data.user = user;
                dispatch(commentTopic(newComment.data));
            }
        } catch (e) {
            dispatch(failedForum());
        }
    };

    static changeResponseId = (responseId: number) => (dispatch: Dispatch) => {
        dispatch(changeResponseId({responseId}));
    };
}
