import * as React from 'react';
import bem from 'easy-bem';
import './Game.scss';
import {GameItemsEnum} from 'common/enums';
import {IGameState} from './types';
import {IViewProps} from 'pages/GamePage/types';
import Canvas from './views/Canvas';
import bonuses from './bonuses';
import {GhostModeEnum} from '../../common/enums/GhostModeEnum';
import {increaseSpeed} from './helpers';

const b = bem('Game');

export const INITIAL_SPEED = 400;

export default class Game extends React.PureComponent<IViewProps, IGameState> {
    scatterGhostModeCounter: number;
    timers: {
        ghostMode?: ReturnType<typeof setTimeout>;
        gameOverView?: ReturnType<typeof setTimeout>;
        nextLevelView?: ReturnType<typeof setTimeout>;
        decreasedLivesView?: ReturnType<typeof setTimeout>;
    };

    prevGhostModeMode: GhostModeEnum;

    constructor(props: IViewProps) {
        super(props);

        this.state = this.getInitialState();

        this.scatterGhostModeCounter = 0;
        this.timers = {};

        this.initCookies = this.initCookies.bind(this);
        this.initPills = this.initPills.bind(this);
        this.eatPills = this.eatPills.bind(this);
        this.eatCookies = this.eatCookies.bind(this);
        this.decreaseLives = this.decreaseLives.bind(this);
        this.returnGhostToPreviousMode = this.returnGhostToPreviousMode.bind(this);
    }

    getInitialState(params: Partial<IGameState> = {}): IGameState {
        return {
            cookies: 0,
            pills: 0,
            fruits: 2,
            lives: 3,
            level: 1,
            score: 0,
            speed: INITIAL_SPEED,
            ghostMode: GhostModeEnum.Scatter,
            showNextLevelView: false,
            showGameOverView: false,
            showDecreasedLivesView: false,
            ...params
        };
    }

    componentDidMount() {
        this.setScatterGhostMode();
    }

    componentDidUpdate(_prevProps: Readonly<IViewProps>, prevState: Readonly<IGameState>) {
        if (prevState.cookies !== 0 && prevState.cookies !== this.state.cookies) {
            const eatenCookies = prevState.cookies - this.state.cookies;
            this.increaseScore(eatenCookies, bonuses[GameItemsEnum.Cookie]);
        }

        if (prevState.pills !== 0 && prevState.pills !== this.state.pills) {
            const eatenPills = prevState.pills - this.state.pills;
            this.increaseScore(eatenPills, bonuses[GameItemsEnum.Pill]);
            this.setFrightenedGhostMode();
        }

        const isLevelPassed = (prevState.cookies !== 0 || prevState.pills !== 0) &&
            this.state.cookies === 0 && this.state.pills === 0;

        if (isLevelPassed) {
            this.setNextLevel();
        }
    }

    componentWillUnmount() {
        Object.values(this.timers).forEach(timer => {
            clearTimeout(timer as ReturnType<typeof setTimeout>);
        });
    }

    render() {
        return (
            <div className={b()}>
                <div className={b('inner')}>
                    {!(this.state.showGameOverView || this.state.showNextLevelView) && (
                        <>
                            <Canvas
                                cookies={this.state.cookies}
                                pills={this.state.pills}
                                fruits={this.state.fruits}
                                initCookies={this.initCookies}
                                initPills={this.initPills}
                                eatPills={this.eatPills}
                                eatCookies={this.eatCookies}
                                speed={this.state.speed}
                                ghostMode={this.state.ghostMode}
                                decreaseLives={this.decreaseLives}
                                lives={this.state.lives}
                                returnGhostToPreviousMode={this.returnGhostToPreviousMode}
                                ghostModeTimer={this.timers.ghostMode}
                            />
                            {this.renderInfo()}
                            {this.state.showDecreasedLivesView && (
                                <div className={b('decreased-lives')}/>
                            )}
                        </>
                    )}
                    {this.state.showGameOverView && this.renderGameOverView()}
                    {this.state.showNextLevelView && this.renderNextLevelView()}
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

    renderGameOverView() {
        return (
            <div className={b('game-over')}>
                Game Over
            </div>
        );
    }

    renderNextLevelView() {
        return (
            <div className={b('next-level-wrap')}>
                <div className={b('next-level')}>
                    {`${this.state.level} level`}
                </div>
                <div className={b('next-level-congratulations')}>
                    Congratulations!
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

    decreaseLives() {
        if (this.state.lives === 1) {
            this.setState({
                showGameOverView: true
            });

            setTimeout(this.props.changeView, 2000);
            return;
        }

        this.setState(state => ({
            lives: state.lives - 1,
            showDecreasedLivesView: true
        }));

        this.timers.decreasedLivesView = setTimeout(() => this.setState({
            showDecreasedLivesView: false
        }), 1000);
    }

    setNextLevel() {
        if (this.timers.ghostMode) {
            clearTimeout(this.timers.ghostMode);
        }

        this.scatterGhostModeCounter = 0;

        this.setState(state => this.getInitialState({
            speed: increaseSpeed(state.speed, INITIAL_SPEED),
            level: state.level + 1,
            lives: state.lives,
            score: state.score,
            showNextLevelView: true
        }));

        this.timers.nextLevelView = setTimeout(() => {
            this.setState({showNextLevelView: false});
            this.setScatterGhostMode();
        }, 2000);
    }

    setScatterGhostMode() {
        this.scatterGhostModeCounter += 1;

        if (this.state.ghostMode !== GhostModeEnum.Scatter) {
            this.setState({
                ghostMode: GhostModeEnum.Scatter
            });
        }

        this.timers.ghostMode = setTimeout(() => this.setChaseGhostMode(), 7000);
    }

    setChaseGhostMode() {
        this.setState({
            ghostMode: GhostModeEnum.Chase
        });

        if (this.scatterGhostModeCounter < 4) {
            this.timers.ghostMode = setTimeout(() => this.setScatterGhostMode(), 20000);
        }
    }

    setFrightenedGhostMode() {
        this.prevGhostModeMode = this.state.ghostMode;

        if (this.timers.ghostMode) {
            clearTimeout(this.timers.ghostMode);
        }

        this.setState({
            ghostMode: GhostModeEnum.Frightened
        });

        this.timers.ghostMode = setTimeout(this.returnGhostToPreviousMode, 7000);
    }

    returnGhostToPreviousMode() {
        if (this.prevGhostModeMode === GhostModeEnum.Chase) {
            this.setChaseGhostMode();
        } else {
            this.setScatterGhostMode();
        }
    }
}
