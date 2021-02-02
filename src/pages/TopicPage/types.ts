import {IComment, ITopic} from '../../types/ForumTypes';
import {RouteComponentProps} from 'react-router';

export interface ITopicPageProps extends RouteComponentProps<{topicId: string}> {

}

export interface ITopicPageState {
    isLoading: boolean,
    topic: null | ITopic
}

export interface ITopicCommentProps {
    comment: IComment
}
