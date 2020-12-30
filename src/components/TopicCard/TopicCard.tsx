import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import './TopicCard.scss';
import {ITopicCardProps} from './types';

const b = bem('TopicCard');

export default class TopicCard extends React.PureComponent<ITopicCardProps> {
    static defaultProps = {
        hasDescription: false
    };

    render() {
        const {topic} = this.props;
        const topicUrl = `/forum/${topic.id}`;

        return (
            <Link
                to={topicUrl}
                className={b()}
            >
                <div
                    className={b('avatar')}
                    style={{
                        backgroundImage: `url(${topic.avatar})`
                    }}
                />
                <div className={b('content')}>
                    <div className={b('user-name')}>
                        {`${topic.firstName} ${topic.secondName}`}
                    </div>
                    <div className={b('topic-title')}>
                        {topic.title}
                    </div>
                    {this.props.hasDescription && (
                        <p className={b('topic-description')}>
                            {topic.description}
                        </p>
                    )}
                    <div className={b('comments')}>
                        {topic.comments.length ?
                            `Comments: ${topic.comments.length}` :
                            'No comments'
                        }
                    </div>
                </div>
            </Link>
        );
    }
}
