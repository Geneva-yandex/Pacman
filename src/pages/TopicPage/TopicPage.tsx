import * as React from 'react';
import bem from 'easy-bem';
import './TopicPage.scss';
import {ForumEntityActions} from '../../store/forum'
import {withRouter} from 'react-router';

/*
import forumData from 'common/data/forum-data';
import {IComment} from 'common/types/ForumTypes';
*/
import TopicCard from 'components/TopicCard';


import CommentForm from './views/CommentForm';
import {ITopicPageProps, ITopicPageState, StateProps, Dispatch, DispatchToProps} from './types';
import Meta from '../../components/Meta/Meta';
import {IStore as state} from "../../store/types";
import {connect} from "react-redux";


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
        const topicId = +(this.props.match?.params?.topicId);
        this.props.getTopic(topicId);

        this.setState({
            topic: this.props.activeTopic,
            isLoading: false
        });
        console.log(this.props);

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
                    {/* {Boolean(topic.comments.length) && (
                        <div className={b('comments-list')}>
                            <h2>Comments</h2>
                            {topic.comments.map((comment: IComment) => (
                                <Comment
                                    comment={comment}
                                    key={comment.id}
                                />
                            ))}
                        </div>
                    )}*/}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicPage));
