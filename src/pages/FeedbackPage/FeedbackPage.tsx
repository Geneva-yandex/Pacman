import React, {PureComponent} from 'react';
import bem from 'easy-bem';
import './FeedbackPage.scss';
import Meta from 'components/Meta/Meta';
import FeedbackForm from './views/FeedbackForm';

const b = bem('FeedbackPage');

export default class FeedbackPage extends PureComponent {
    render() {
        return (
            <div className={b()}>
                <Meta title={'Feedback'}/>
                <div className={'container-fluid'}>
                    <h1>Feedback</h1>
                    <FeedbackForm/>
                </div>
            </div>
        );
    }
}
