import * as React from 'react';
import bem from 'easy-bem';
import {Button, Input} from 'components/ui';
import {ChangeEvent, FormEvent} from 'react';
import {IFeedbackFormState} from '../types';
import {FeedbackFieldsEnum} from '../../../common/types/FeedbackTypes';
import feedbackApi from 'api/FeedbackApi';
import './FeedbackForm.scss';

const b = bem('FeedbackForm');
const FORM_ID = 'FeedbackForm';

export default class FeedbackForm extends React.PureComponent<{}, IFeedbackFormState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            submitSucceeded: false,
            error: null,
            values: {
                [FeedbackFieldsEnum.Name]: '',
                [FeedbackFieldsEnum.Phone]: '',
                [FeedbackFieldsEnum.Question]: ''
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async onSubmit(e: FormEvent) {
        e.preventDefault();

        const error = this.validate();
        if (error) {
            this.setState({error});
            return;
        }

        try {
            await feedbackApi.sendQuestion(this.state.values);
            this.setState({
                submitSucceeded: true,
                error: null,
                values: {
                    [FeedbackFieldsEnum.Name]: '',
                    [FeedbackFieldsEnum.Phone]: '',
                    [FeedbackFieldsEnum.Question]: ''
                }
            });
        } catch (err) {
            this.setState({error: 'Failed submit, please try again'});
        }
    }

    validate(): boolean | string {
        const incorrectFields: string[] = [];
        Object.entries(this.state.values).forEach(([key, value]) => {
            if (!value.trim()) {
                incorrectFields.push(key);
            }
        });

        return Boolean(incorrectFields.length) && `Fields are required: ${incorrectFields.join(', ')}`;
    }

    onChange(e: ChangeEvent) {
        const {value, name} = e.target as HTMLInputElement;
        this.setState(state => ({
            values: {
                ...state.values,
                [name]: value
            }
        }));
    }

    render() {
        return (
            <form
                className={b()}
                name={FORM_ID}
                onSubmit={this.onSubmit}
            >
                <Input
                    type={'text'}
                    title={FeedbackFieldsEnum.Name}
                    name={FeedbackFieldsEnum.Name}
                    onChange={this.onChange}
                    value={this.state.values[FeedbackFieldsEnum.Name]}
                />
                <Input
                    type={'text'}
                    title={FeedbackFieldsEnum.Phone}
                    name={FeedbackFieldsEnum.Phone}
                    onChange={this.onChange}
                    value={this.state.values[FeedbackFieldsEnum.Phone]}
                />
                <label
                    htmlFor={'question'}
                    className={b('question-label')}
                >
                    {FeedbackFieldsEnum.Question}
                </label>
                <textarea
                    name={FeedbackFieldsEnum.Question}
                    id={'question'}
                    onChange={this.onChange}
                    value={this.state.values[FeedbackFieldsEnum.Question]}
                />
                <Button>Send</Button>
                {this.state.submitSucceeded && (
                    <div className={b('success')}>Your question has been sent :)</div>
                )}
                {this.state.error && (
                    <div className={b('error')}>{this.state.error}</div>
                )}
            </form>
        );
    }
}
