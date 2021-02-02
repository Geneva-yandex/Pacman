import React, {ChangeEvent, createRef} from 'react';
import classnames from 'classnames';
import bem from 'easy-bem';
import './Input.scss';

type Props = {
    className?: string;
    value?: string | number;
    type: string;
    title?: string;
    placeholder?: string;
    name: string;
    ref?: any;
    onChange?: (event: ChangeEvent) => void;
};

const b = bem('Input');

export default class Input extends React.PureComponent<Props> {
    private _inputRef = createRef<HTMLInputElement>();

    public get inputRef(): HTMLInputElement | null {
        return this._inputRef.current;
    }

    public render() {
        const className = classnames(b(), this.props.className);

        const inputProps = {...this.props};
        delete inputProps.className;

        return (
            <div className={className}>
                <label>
                    {this.props.title && <span className={b('label')}>{this.props.title}</span>}
                    <input className={b('control')} {...inputProps} ref={this._inputRef} />
                </label>
            </div>
        );
    }
}
