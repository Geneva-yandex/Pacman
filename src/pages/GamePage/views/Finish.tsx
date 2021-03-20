import * as React from 'react';
import bem from 'easy-bem';
import {Button} from 'components/ui';
import {IViewProps} from '../types';
import './Finish.scss';

const b = bem('Finish');

export default class Finish extends React.PureComponent<IViewProps> {
    render() {
        return (
            <div className={b()}>
                <Button onClick={this.props.changeView}>Play again</Button>
            </div>
        );
    }
}
