import * as React from 'react';
import bem from 'easy-bem';
import {IViewProps} from '../types';
import {Button} from '../../../components/ui';

const b = bem('Finish');

export default class Finish extends React.PureComponent<IViewProps> {
    render() {
        return (
            <div className={b()}>
                <div className={b('inner')}>
                    <Button onClick={this.props.changeView}>Play again</Button>
                    <Button>Leader board</Button>
                </div>
            </div>
        );
    }
}
