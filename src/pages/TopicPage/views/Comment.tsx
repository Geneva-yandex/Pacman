import * as React from 'react';
import bem from 'easy-bem';
import './Comment.scss';
import {ITopicCommentProps} from '../types';

const b = bem('Comment');

export default class Comment extends React.PureComponent<ITopicCommentProps> {
    render() {
        const {comment} = this.props;

        return (
            <div className={b()}>
                <div
                    className={b('avatar')}
                    style={{
                        backgroundImage: `url(${comment.avatar})`
                    }}
                />
                <div className={b('content')}>
                    <div className={b('user-name')}>
                        {`${comment.firstName} ${comment.secondName}`}
                    </div>
                    <div className={b('message')}>
                        {comment.content}
                    </div>
                </div>
            </div>
        );
    }
}
