import React from 'react';
import {ChangeEvent, createRef} from 'react';
import bem from 'easy-bem';
import './Input.scss';
import classnames from 'classnames';

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

const b = bem('Input');

export default class Input extends React.PureComponent<Props> {
    private _inputRef = createRef<HTMLInputElement>();

    public get inputRef(): HTMLInputElement | null {
        return this._inputRef.current;
    }

    public render() {
        const className = classnames(b(), this.props.className);

        return (
            <div className={className}>
                <label>
                    {this.props.title && <span className={b('label')}>{this.props.title}</span>}
                    <input className={b('control')} {...this.props} ref={this._inputRef} />
                </label>
            </div>
        );
    }
}
