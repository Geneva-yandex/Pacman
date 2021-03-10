import * as React from 'react';
import bem from 'easy-bem';
import './CommentForm.scss';
import {Button, Input} from 'components/ui';
import {IStore as state} from "../../../store/types";
import {Dispatch} from "../types";
import {ForumEntityActions} from "../../../store/forum";
import {connect} from "react-redux";
import {ICommentCreateData} from "../../../common/types/interfaces";
import {FormEvent} from "react";
import {ChangeEvent} from "react";

const b = bem('CommentForm');
const FORM_ID = 'CommentForm';


interface StateProps {
    activeTopicId: number,
    userId: number,
}

interface DispatchToProps {
    createComment: (commentData: ICommentCreateData) => void;
}

type CommentFormProps = StateProps & DispatchToProps

class CommentForm extends React.PureComponent<CommentFormProps> {
    state = {
        title: '',
        description: '',
        messageId: null,
    }

    onControlChange = (event: ChangeEvent) => {
        const target = event.target;
        const value = (target as HTMLInputElement).value;
        const propertyName = (target as HTMLInputElement).name;
        this.setState({
            [propertyName]: value
        });
    };

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {title, description, messageId} = this.state;
        const userId = this.props.userId;
        const activeTopicId = this.props.activeTopicId;
        this.props.createComment({
            title,
            description,
            user_id: userId,
            topic_id: activeTopicId,
            message_id: messageId
        });
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className={b()}
                name={FORM_ID}
            >
                <label htmlFor={'comment'}>Comment</label>
                <Input
                    onChange={this.onControlChange}
                    type={'text'}
                    title={'title'}
                    name={'title'}
                />
                <textarea
                    onChange={this.onControlChange}
                    id={'comment'}
                    name={'description'}
                />
                <Button>Submit</Button>
            </form>
        );
    }
}

const mapStateToProps = (state: state): StateProps => ({
    activeTopicId: state.forum.activeTopic ? state.forum.activeTopic.id: 0,
    userId: state.user.item ? state.user.item.id : 0
});


const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    createComment: (createComment: ICommentCreateData) => dispatch(ForumEntityActions.leaveComment(createComment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
