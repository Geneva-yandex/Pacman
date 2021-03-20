import {RouteComponentProps} from 'react-router';
import {IComment} from 'common/types/interfaces';
import {IForumStore} from '../../store/forum';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ITopicData} from '../../common/types/interfaces';

export type ITopicPageProps = RouteComponentProps<{topicId: string}> & StateProps & DispatchToProps;

export interface ITopicPageState {
    isLoading: boolean,
    topic: null | ITopicData,
}

export interface ITopicCommentDispatchToProps {
    changeCommentId: (id: number) => void;
}

export type ITopicCommentProps = ITopicCommentUserProps & ITopicCommentDispatchToProps;

export interface ITopicCommentUserProps {
    comment: IComment,
    responsable: boolean
}
export interface StateProps {
    activeTopic: IForumStore['activeTopic'],
    state: unknown
}

export interface DispatchToProps {
    getTopic: (id: number) => void;
}

export type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;
