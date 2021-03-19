import * as React from 'react';
import bem from 'easy-bem';
import {Button, Input} from 'components/ui';
import {ForumEntityActions, IForumStore} from '../../../store/forum';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {IStore} from '../../../store/types';

type Dispatch = ThunkDispatch<IForumStore, void, AnyAction>;

interface StateToProps {
    user_id: number
}

interface DispatchToProps {
    createTopic: (topicData: any) => void;
}

type TopicFormProps = StateToProps & DispatchToProps;

const b = bem('TopicForm');
const FORM_ID = 'TopicForm';

class TopicForm extends React.PureComponent<TopicFormProps> {
    state = {
        title: '',
        description: ''
    };

    onControlChange = (event: ChangeEvent) => {
        const target = event.target;
        const value = (target as HTMLInputElement).value;
        const propertyName = (target as HTMLInputElement).name;
        this.setState({
            [propertyName]: value
        });
    };

    createTopics = (event: FormEvent) => {
        event.preventDefault();
        const {title, description} = this.state;
        const user_id = this.props.user_id;
        this.props.createTopic({title, description, user_id});
    };

    render() {
        return (
            <form
                className={b()}
                name={FORM_ID}
                onSubmit={this.createTopics}
            >
                <Input
                    onChange={this.onControlChange}
                    type={'text'}
                    title={'title'}
                    name={'title'}
                />
                <Input
                    onChange={this.onControlChange}
                    type={'text'}
                    title={'description'}
                    name={'description'}
                />
                <Button>Create</Button>
            </form>
        );
    }
}

const mapStateToProps = (state: IStore): StateToProps => ({
    user_id: state.user.item ? state.user.item.id : 0
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    createTopic: (topicData: any) => dispatch(ForumEntityActions.createTopic(topicData))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
