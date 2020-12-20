import * as React from 'react';
import bem from 'easy-bem';
import {IStateGamePage} from './types';
import './GamePage.scss';
import Start from './views/Start';
import Finish from './views/Finish';
import Game from '../../components/Game';
import {viewType} from './types';

const b = bem('GamePage');

export default class GamePage extends React.PureComponent<{}, IStateGamePage> {
    constructor(props: any) {
        super(props);
        this.state = {
            view: 'start'
        };
    }

    render() {
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    {this.renderView()}
                </div>
            </div>
        );
    }

    renderView() {
        switch (this.state.view) {
        case 'start':
            return <Start changeView={() => this.changeView('game')}/>;
        case 'finish':
            return <Finish changeView={() => this.changeView('game')}/>;
        case 'game':
            return <Game changeView={() => this.changeView('finish')}/>;
        }
    }

    changeView(view: viewType) {
        this.setState({view});
    }
}
