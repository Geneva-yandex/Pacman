import {createReducer} from 'typesafe-actions';
import {
    SET_TOPICS,
    SET_TOPIC,
    CREATE_TOPIC,
    COMMENT_TOPIC,
    FAILED_FORUM,
    PENDING_TOPICS
} from './actions';

import {IAction} from '../types';

import {ForumStatusEnum, IForumStore} from "./types";
import {IComment, ITopicData} from "../../common/types/interfaces";


const defaultState: IForumStore = {
    topics: null,
    activeTopic: null
}

const forumReducer = createReducer(defaultState)
    .handleAction(SET_TOPIC, (state: IForumStore, action: IAction<IForumStore>) => ({
        ...state,
        ...action.payload,
        status: ForumStatusEnum.Success
    }))
    .handleAction(PENDING_TOPICS, (state: IForumStore) => ({
        ...state,
        status: ForumStatusEnum.Pending
    }))
    .handleAction(SET_TOPICS, (state: IForumStore, action: IAction<IForumStore>) => ({
        ...state,
        ...action.payload,
        status: ForumStatusEnum.Success
    }))
    .handleAction(CREATE_TOPIC, (state: IForumStore, action: IAction<ITopicData>) => {
        if (action.payload) {
            if (state.topics !== null) {
                state.topics.push(action.payload);
            } else {
                state.topics = [action.payload];
            }
        }
        return {
            ...state,
            status: ForumStatusEnum.Success
        }
    })
    .handleAction(COMMENT_TOPIC, (state: IForumStore, action: IAction<IComment>) => {
        if (action.payload) {
            if (state.activeTopic !== null) {
                if (state.activeTopic.comments !== null) {
                    state.activeTopic.comments.push(action.payload);
                } else {
                    state.activeTopic.comments = [action.payload]
                }
            }

        }
        return {
            ...state,
            ...action.payload,
            status: ForumStatusEnum.Success
        }
    })
    .handleAction(FAILED_FORUM, (state: IForumStore) => ({
        ...state,
        status: ForumStatusEnum.Failed
    }))


export default forumReducer
