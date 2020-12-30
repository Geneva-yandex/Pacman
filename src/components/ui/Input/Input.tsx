import * as React from 'react';
import {ChangeEvent, createRef} from 'react';

type OwnProps = {
    className?: string;
    value?: string | number;
    type: string;
    title?: string;
    placeholder?: string;
    name: string;
    ref?: any;
    onChange?: (event: ChangeEvent) => void;
};

type Props = OwnProps;

export default class Input extends React.Component<Props> {
    private _inputRef = createRef<HTMLInputElement>();

    public get inputRef(): HTMLInputElement | null {
        return this._inputRef.current;
    }

    public render() {
        return (
            <div className={this.props.className}>
                <label>
                    {this.props.title && <span>{this.props.title}</span>}
                    <input {...this.props} ref={this._inputRef} />
                </label>
            </div>
        );
    }
}
