import {GhostModeEnum} from '../../common/enums/GhostModeEnum';

export type MapType = number[][];

export type CoordsType = {
    row: number,
    cell: number
};

export type UserDirectionType = 'left' | 'right' | 'top' | 'bottom';

export type UserDirectionTypeType = 'vertical' | 'horizontal';

export interface IGameState {
    cookies: number,
    pills: number,
    fruits: number,
    lives: number,
    level: number,
    score: number,
    speed: number,
    ghostMode: GhostModeEnum,
    showGameOverView: boolean,
    showNextLevelView: boolean,
    showDecreasedLivesView: boolean
}

export type GameInitMethodsType = {
    initCookies: (cookies: number) => void,
    initPills: (pills: number) => void,
};

export interface ICanvasProps extends Omit<IGameState, 'level' | 'score' | 'showGameOverView' | 'showNextLevelView' | 'showDecreasedLivesView'>, GameInitMethodsType {
    eatPills: () => void
    eatCookies: () => void,
    decreaseLives: () => void,
    returnGhostToPreviousMode: () => void,
    ghostModeTimer: ReturnType<typeof setTimeout> | undefined
}

export interface IComponentProps {
    userCtx: CanvasRenderingContext2D,
    ghostCtx: CanvasRenderingContext2D
}

export type DrawMapParams = {
    map: MapType,
    initUser: (position: CoordsType) => void,
    initGhost: (position: CoordsType) => void,
} & GameInitMethodsType;

export type AvailableCellsCountParamsType = {
    cell: number,
    row: number,
    isVerticalDirection: boolean,
    isPositiveDirection: boolean
};

export type GhostCoordsType = {
    coords: CoordsType,
    direction: UserDirectionType
};
