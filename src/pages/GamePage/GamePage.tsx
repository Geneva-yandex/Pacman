import * as React from 'react';
import bem from 'easy-bem';
import {IStateGamePage} from './types';
import './GamePage.scss';
import Start from './views/Start';
import Finish from './views/Finish';
import Game from '../../components/Game';
import {ViewType} from './types';
import GamePageViewEnum from '../../enums/GamePageViewEnum';

const b = bem('GamePage');

export default class GamePage extends React.PureComponent<{}, IStateGamePage> {
    constructor(props: any) {
        super(props);
        this.state = {
            view: GamePageViewEnum.START as 'start'
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
        case GamePageViewEnum.START:
            return <Start changeView={() => this.changeView(GamePageViewEnum.GAME as 'game')}/>;
        case GamePageViewEnum.FINISH:
            return <Finish changeView={() => this.changeView(GamePageViewEnum.GAME as 'game')}/>;
        case GamePageViewEnum.GAME:
            return <Game changeView={() => this.changeView(GamePageViewEnum.FINISH as 'finish')}/>;
        }
    }

    changeView(view: ViewType) {
        this.setState({view});
    }
}
