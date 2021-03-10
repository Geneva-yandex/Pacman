import * as React from 'react';
import bem from 'easy-bem';
import {Button, Input} from 'components/ui';

const b = bem('TopicForm');
const FORM_ID = 'TopicForm';

export default class TopicForm extends React.PureComponent {
    render() {
        return (
            <form
                className={b()}
                name={FORM_ID}
            >
                <Input
                    type={'text'}
                    title={'title'}
                    name={'title'}
                />
                <Input
                    type={'text'}
                    title={'description'}
                    name={'description'}
                />
                <Button>Create</Button>
            </form>
        );
    }
}
