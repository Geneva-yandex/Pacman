import * as React from 'react';
import bem from 'easy-bem';
import './CommentForm.scss';
import {Button, Input} from 'components/ui';
import {IStore as state} from '../../../store/types';
import {Dispatch} from '../types';
import {ForumEntityActions} from '../../../store/forum';
import {connect} from 'react-redux';
import {IComment, ICommentCreateData} from '../../../common/types/interfaces';
import {FormEvent} from 'react';
import {ChangeEvent} from 'react';
import Comment from './Comment';

const b = bem('CommentForm');
const FORM_ID = 'CommentForm';

interface StateProps {
    activeTopicId: number,
    userId: number,
    responseId: number,
    activeTopicComments: IComment[] | undefined
}

interface DispatchToProps {
    createComment: (commentData: ICommentCreateData) => void;
    removeResponse: () => void;
}

type CommentFormProps = StateProps & DispatchToProps;

class CommentForm extends React.PureComponent<CommentFormProps> {
    state = {
        title: '',
        description: ''
    };

    componentDidMount() {
        console.log(this.props.activeTopicComments);
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
        const {title, description} = this.state;
        const userId = this.props.userId;
        const activeTopicId = this.props.activeTopicId;
        this.props.createComment({
            title,
            description,
            user_id: userId,
            topic_id: activeTopicId,
            message_id: this.props.responseId
        });
        (e.target as HTMLFormElement).reset();
    };

    noResponse = () => {
        this.props.removeResponse();
    };

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className={b()}
                name={FORM_ID}
            >
                {Boolean(this.props.responseId) && (
                    <div>
                        <p>
                            You are responding to comment with id {this.props.responseId}
                        </p>
                        <br/>
                        <div>
                            <Comment comment={((this.props.activeTopicComments as IComment[]).find((comment: IComment) => comment.id === this.props.responseId) as IComment)}
                                responsable={false}
                            />
                        </div>
                        <br/>

                        <div className={'dont_want_to_respond'} onClick={this.noResponse}>
                            <p>
                                I do not want to response
                            </p>
                        </div>
                        <br/>

                    </div>
                )}
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
    activeTopicId: state.forum.activeTopic ? state.forum.activeTopic.id : 0,
    userId: state.user.item ? state.user.item.id : 0,
    responseId: state.forum.responseId,
    activeTopicComments: state.forum.activeTopic?.comments
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    createComment: (createComment: ICommentCreateData) => dispatch(ForumEntityActions.leaveComment(createComment)),
    removeResponse: () => dispatch(ForumEntityActions.changeResponseId(0))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
