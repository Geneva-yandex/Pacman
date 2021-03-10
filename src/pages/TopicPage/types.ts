import {RouteComponentProps} from 'react-router';
import {IComment} from 'common/types/ForumTypes';
import {IForumStore} from "../../store/forum";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ITopicData} from "../../common/types/interfaces";

export type ITopicPageProps = RouteComponentProps<{topicId: string}> & StateProps & DispatchToProps

export interface ITopicPageState {
    isLoading: boolean,
    topic: null | ITopicData
}

export interface ITopicCommentProps {
    comment: IComment
}
export interface StateProps {
    activeTopic: IForumStore['activeTopic'],
    state: unknown
}

export interface DispatchToProps {
    getTopic: (id: number) => void;
}

export type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;
