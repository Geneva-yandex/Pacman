import * as React from 'react';
import bem from 'easy-bem';
import {IViewProps} from '../types';
import './Start.scss';
import {Button} from '../../../components/ui';

const b = bem('Start');

export default class Start extends React.PureComponent<IViewProps> {
    render() {
        return (
            <div className={b()}>
                <Button onClick={this.props.changeView}>Play</Button>
            </div>
        );
    }
}
