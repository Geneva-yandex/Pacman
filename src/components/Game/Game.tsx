import * as React from 'react';
import bem from 'easy-bem';
import './Game.scss';
import {IStateGame} from './types';
import {IViewProps} from '../../pages/GamePage/types';

const b = bem('Game');

export default class Game extends React.PureComponent<IViewProps, IStateGame> {
    constructor(props: IViewProps) {
        super(props);

        this.state = {
            cookies: 240,
            pills: 4,
            fruits: 2
        };
    }

    render() {
        return (
            <div className={b()}>
                <button onClick={this.props.changeView}>Stop</button>
            </div>
        );
    }
}
