import * as React from 'react';
import bem from 'easy-bem';
import {IStateGamePage} from './types';
import Start from './views/Start';
import Finish from './views/Finish';
import Game from '../../components/Game';
import {ViewType} from './types';
import {GamePageViewEnum} from '../../enums/GamePageViewEnum';

const b = bem('GamePage');

export default class GamePage extends React.PureComponent<{}, IStateGamePage> {
    constructor(props: {}) {
        super(props);
        this.state = {
            view: GamePageViewEnum.Start
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
        case GamePageViewEnum.Start:
            return <Start changeView={() => this.changeView(GamePageViewEnum.Game)}/>;
        case GamePageViewEnum.Finish:
            return <Finish changeView={() => this.changeView(GamePageViewEnum.Game)}/>;
        case GamePageViewEnum.Game:
            return <Game changeView={() => this.changeView(GamePageViewEnum.Finish)}/>;
        }
    }

    changeView(view: ViewType) {
        this.setState({view});
    }
}
