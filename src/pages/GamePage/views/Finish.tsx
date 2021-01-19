import * as React from 'react';
import bem from 'easy-bem';
import {IViewProps} from '../types';
import './Finish.scss';

const b = bem('Finish');

export default class Finish extends React.PureComponent<IViewProps> {
    render() {
        return (
            <div className={b()}>
                <div className={b('inner')}>
                    <button onClick={this.props.changeView}>Play again</button>
                    <button>Leader board</button>
                </div>
            </div>
        );
    }
}
