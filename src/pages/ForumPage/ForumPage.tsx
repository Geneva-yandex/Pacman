import React, {Component} from 'react';
import bem from 'easy-bem';
import './ForumPage.scss';


import TopicCard from 'components/TopicCard';
import Meta from 'components/Meta/Meta';
import TopicForm from './views/TopicForm';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {IStore as state} from '../../store/types'
import {IForumStore} from "../../store/forum";
import {ForumEntityActions} from '../../store/forum'
import {ITopicData} from "../../common/types/interfaces";

const b = bem('ForumPage');

interface StateProps {
    forumTopics: IForumStore
}

interface DispatchToProps{
    getTopics: () => void,

}

type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;

type ForumPageProps = DispatchToProps & StateProps

class ForumPage extends Component<ForumPageProps> {

    componentDidMount(): void {
        this.props.getTopics();
    }

    render() {
        let { topics } = this.props.forumTopics;

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
                        {topics ? topics.map((topic: ITopicData) => (
                            <TopicCard
                                topic={topic}
                                key={topic.id}
                                isLink
                            />
                        )) : null}
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state: state): StateProps => ({
    forumTopics: state.forum
});


const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    getTopics: () => dispatch(ForumEntityActions.getTopics())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage);
