import * as React from 'react';
import bem from 'easy-bem';
import './TopicPage.scss';
import {ForumEntityActions} from '../../store/forum';
import {withRouter} from 'react-router';
import Comment from './views/Comment';
import {IComment} from 'common/types/interfaces';
import TopicCard from 'components/TopicCard';
import CommentForm from './views/CommentForm';
import {ITopicPageProps, ITopicPageState, StateProps, Dispatch, DispatchToProps} from './types';
import Meta from '../../components/Meta/Meta';
import {IStore as state} from '../../store/types';
import {connect} from 'react-redux';

const b = bem('TopicPage');

class TopicPage extends React.Component<ITopicPageProps, ITopicPageState> {
    constructor(props: ITopicPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            topic: null
        };
    }

    componentDidMount() {
        const topicId = Number(this.props.match?.params?.topicId);
        this.props.getTopic(topicId);
        setTimeout(() => {
            console.log(this.props);
        }, 1000);
    }

    render() {
        const {activeTopic} = this.props;
        if (!activeTopic) {
            return 'The topic is not found';
        }

        return (
            <div className={b()}>
                <Meta title={activeTopic.title}/>
                <div className={'container-fluid'}>
                    <TopicCard
                        topic={activeTopic}
                        hasDescription
                    />
                    <div className={b('form-wrap')}>
                        <h2>Leave your comment</h2>
                        <CommentForm/>
                    </div>
                    {Boolean(activeTopic.comments.length) && (
                        <div className={b('comments-list')}>
                            <h2>Comments</h2>
                            <br/><br/>
                            {activeTopic.comments.map((comment: IComment) => (
                                <div key={comment.id}>
                                    <div>
                                        <Comment
                                            comment={comment}
                                            key={comment.id}
                                            responsable={true}
                                        />
                                    </div>
                                    <div className='inner-comments-wrapper'>
                                        {Boolean(comment.comments) && (
                                            <div className='inner-comments'>
                                                {
                                                    comment.comments.map((innerComment: IComment) => (
                                                        <Comment
                                                            comment={innerComment}
                                                            key={innerComment.id}
                                                            responsable={false}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: state): StateProps => ({
    activeTopic: state.forum.activeTopic,
    state: state.forum
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    getTopic: (id: number) => dispatch(ForumEntityActions.getTopic(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicPage));
