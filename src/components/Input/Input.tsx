import * as React from 'react';
import {ChangeEvent} from 'react';

type OwnProps = {
    className?: string;
    value?: string | number;
    type: string;
    title: string;
    placeholder?: string;
    name: string;
    onChange?: (event: ChangeEvent) => void;
};

type Props = OwnProps;

export default class Input extends React.Component<Props> {
    public render() {
        return (
            <div className={this.props.className}>
                <label>
                    <span>{this.props.title}</span>
                    <input {...this.props} />
                </label>
            </div>
        );
    }
}
