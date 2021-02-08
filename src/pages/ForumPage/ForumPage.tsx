import * as React from 'react';
import bem from 'easy-bem';
import forumData from '../../misc/data/forum-data';
import {ITopic} from '../../types/ForumTypes';
import './ForumPage.scss';
import TopicCard from '../../components/TopicCard';
import TopicForm from './views/TopicForm';
import Meta from '../../components/Meta/Meta';

const b = bem('ForumPage');

export default class ForumPage extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <Meta title={'Forum'}/>
                <div className={'container-fluid'}>
                    <h1>Forum</h1>
                    <div className={b('form-wrap')}>
                        <h2>Create your topic</h2>
                        <TopicForm/>
                    </div>
                    <div className={b('topics-list')}>
                        <h2>Topics</h2>
                        {forumData.map((topic: ITopic) => (
                            <TopicCard
                                topic={topic}
                                key={topic.id}
                                isLink
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
