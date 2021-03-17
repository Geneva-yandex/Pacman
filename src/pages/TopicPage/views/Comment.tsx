import * as React from 'react';
import bem from 'easy-bem';
import './Comment.scss';
import {Dispatch, ITopicCommentDispatchToProps, ITopicCommentProps} from '../types';
import {ForumEntityActions} from '../../../store/forum';
import {connect} from 'react-redux';

const b = bem('Comment');

class Comment extends React.PureComponent<ITopicCommentProps> {
    changeComment = () => {
        let commentId = this.props.comment.id;
        this.props.changeCommentId(commentId);
    };

    render() {
        const {comment} = this.props;

        return (
            <div>
                <div className={b()}>
                    <div
                        className={b('avatar')}
                        style={{
                            backgroundImage: `url(${comment.user.avatar})`
                        }}
                    />
                    <div className={b('content')}>
                        <div className={b('user-name')}>
                            {`${comment.user.display_name}`}
                        </div>
                        <div className={b('message')}>
                            {comment.title}
                        </div>
                        <div className={b('message-description')}>
                            {comment.description}
                        </div>
                    </div>
                    {Boolean(this.props.responsable) && (
                        <div onClick={this.changeComment} className={b('respond')}>
                            Respond to this comments
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: Dispatch): ITopicCommentDispatchToProps => ({
    changeCommentId: (id: number) => dispatch(ForumEntityActions.changeResponseId(id))
});

export default connect(null, mapDispatchToProps)(Comment);
