import * as React from 'react';
import bem from 'easy-bem';
import './CommentForm.scss';

const b = bem('CommentForm');
const FORM_ID = 'CommentForm';

export default class CommentForm extends React.PureComponent {
    render() {
        return (
            <form
                className={b()}
                name={FORM_ID}
            >
                <label htmlFor={'comment'}>Comment</label>
                <textarea id={'comment'}/>
                <button>Submit</button>
            </form>
        );
    }
}
