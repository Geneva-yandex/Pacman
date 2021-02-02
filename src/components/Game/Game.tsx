import * as React from 'react';
import bem from 'easy-bem';
import './Game.scss';
import {IGameState} from './types';
import {IViewProps} from '../../pages/GamePage/types';
import Canvas from './views/Canvas';
import bonuses from './bonuses';
import {GameItemsEnum} from '../../enums/GameItemsEnum';

const b = bem('Game');

export default class Game extends React.PureComponent<IViewProps, IGameState> {
    constructor(props: IViewProps) {
        super(props);

        this.state = {
            cookies: 0,
            pills: 0,
            fruits: 2,
            lives: 3,
            level: 1,
            score: 0,
            speed: 500
        };

        this.initCookies = this.initCookies.bind(this);
        this.initPills = this.initPills.bind(this);
        this.eatPills = this.eatPills.bind(this);
        this.eatCookies = this.eatCookies.bind(this);
    }

    componentDidUpdate(_prevProps: Readonly<IViewProps>, prevState: Readonly<IGameState>) {
        if (prevState.cookies !== 0 && prevState.cookies !== this.state.cookies) {
            const eatenCookies = prevState.cookies - this.state.cookies;
            this.increaseScore(eatenCookies, bonuses[GameItemsEnum.Cookie]);
        }

        if (prevState.pills !== 0 && prevState.pills !== this.state.pills) {
            const eatenPills = prevState.pills - this.state.pills;
            this.increaseScore(eatenPills, bonuses[GameItemsEnum.Pill]);
        }
    }

    render() {
        return (
            <div className={b()}>
                <div className={b('inner')}>
                    <Canvas
                        cookies={this.state.cookies}
                        pills={this.state.pills}
                        fruits={this.state.fruits}
                        initCookies={this.initCookies}
                        initPills={this.initPills}
                        eatPills={this.eatPills}
                        eatCookies={this.eatCookies}
                        speed={this.state.speed}
                    />
                    {this.renderInfo()}
                </div>
            </div>
        );
    }

    renderInfo() {
        return (
            <div className={b('info')}>
                <div className={b('lives')}>
                    {`Lives: ${this.state.lives}`}
                </div>
                <div className={b('score')}>
                    {`Score: ${this.state.score}`}
                </div>
                <div className={b('score')}>
                    {`Speed: ${this.state.speed}`}
                </div>
                <div className={b('level')}>
                    {`Level: ${this.state.level}`}
                </div>
            </div>
        );
    }

    initCookies(cookies: number) {
        this.setState({cookies});
    }

    initPills(pills: number) {
        this.setState({pills});
    }

    eatPills() {
        this.setState(state => ({
            pills: state.pills - 1
        }));
    }

    eatCookies() {
        this.setState(state => ({
            cookies: state.cookies - 1
        }));
    }

    increaseScore(eatenItems: number, bonuses: number) {
        const newScore = eatenItems * bonuses;
        this.setState(state => ({
            score: state.score + newScore
        }));
    }
}
