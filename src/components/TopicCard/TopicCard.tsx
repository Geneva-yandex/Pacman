import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import './TopicCard.scss';

import {ITopicCardProps} from './types';
import {ITopicData} from "../../common/types/interfaces";

const b = bem('TopicCard');

export default class TopicCard extends React.PureComponent<ITopicCardProps> {
    static defaultProps = {
        hasDescription: false,
        isLink: false
    };

    render() {
        const {topic, isLink} = this.props;
        const inner = this.renderInner(topic);

        return isLink ?
            (
                <Link
                    to={`/forum/${topic.id}`}
                    className={b({
                        link: true
                    })}
                >
                    {inner}
                </Link>
            ) :
            (
                <div className={b()}>
                    {inner}
                </div>
            );
    }

    renderInner(topic: ITopicData) {
        const {hasDescription} = this.props;

        return (
            <div className={b('inner')}>
                <div
                    className={b('avatar')}
                    style={{
                        backgroundImage: `url(${topic.title})`
                    }}
                />
                <div className={b('content')}>
                    <div className={b('user-name')}>
                        {`${topic.title} ${topic.title}`}
                    </div>
                    <div className={b('topic-title')}>
                        {topic.title}
                    </div>
                    {hasDescription && (
                        <p className={b('topic-description')}>
                            {topic.description}
                        </p>
                    )}
                    <div className={b('comments')}>
                        {/*{topic.comments.length ?
                            `Comments: ${topic.comments.length}` :
                            'No comments'
                        }*/}
                    </div>
                </div>
            </div>
        );
    }
}
