import * as React from 'react';
import bem from 'easy-bem';
import './TopicPage.scss';
import {withRouter} from 'react-router';
import forumData from '../../misc/data/forum-data';
import {IComment, ITopic} from '../../types/ForumTypes';
import TopicCard from '../../components/TopicCard';
import CommentForm from './views/CommentForm';
import Comment from './views/Comment';
import {ITopicPageProps, ITopicPageState} from './types';
import Meta from '../../components/Meta/Meta';

const b = bem('TopicPage');

class TopicPage extends React.PureComponent<ITopicPageProps, ITopicPageState> {
    constructor(props: ITopicPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            topic: null
        };
    }

    componentDidMount() {
        const topicId = this.props.match?.params?.topicId;
        const topic = forumData.find((topic: ITopic) => topic.id === Number(topicId));
        this.setState({
            topic: topic || null,
            isLoading: false
        });
    }

    render() {
        const {topic, isLoading} = this.state;

        if (isLoading) {
            return 'Loading...';
        }

        if (!topic) {
            return 'The topic is not found';
        }

        return (
            <div className={b()}>
                <Meta title={topic.title}/>
                <div className={'container-fluid'}>
                    <TopicCard
                        topic={topic}
                        hasDescription
                    />
                    <div className={b('form-wrap')}>
                        <h2>Leave your comment</h2>
                        <CommentForm/>
                    </div>
                    {Boolean(topic.comments.length) && (
                        <div className={b('comments-list')}>
                            <h2>Comments</h2>
                            {topic.comments.map((comment: IComment) => (
                                <Comment
                                    comment={comment}
                                    key={comment.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(TopicPage);
