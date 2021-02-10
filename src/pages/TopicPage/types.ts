import {RouteComponentProps} from 'react-router';
import {IComment, ITopic} from 'common/types/ForumTypes';

export interface ITopicPageProps extends RouteComponentProps<{topicId: string}> {
}

export interface ITopicPageState {
    isLoading: boolean,
    topic: null | ITopic
}

export interface ITopicCommentProps {
    comment: IComment
}
