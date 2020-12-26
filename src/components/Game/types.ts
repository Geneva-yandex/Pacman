export type mapType = number[][];

export type coordsType = {
    row: number,
    cell: number
};

export type userDirectionType = 'left' | 'right' | 'top' | 'bottom';

export interface IGameState {
    cookies: number,
    pills: number,
    fruits: number,
    lives: number,
    level: number,
    score: number,
    speed: number
}

export type gameInitMethodsType = {
    initCookies: (cookies: number) => void,
    initPills: (pills: number) => void,
};

export interface ICanvasProps extends Omit<IGameState, 'lives' | 'level' | 'score'>, gameInitMethodsType {
    eatPills: () => void
    eatCookies: () => void
}

export interface IComponentProps {
    ctx: CanvasRenderingContext2D | null
}

export type drawMapParams = {
    map: mapType,
    initUser: (position: coordsType) => void,
} & gameInitMethodsType;

export type availableCellsCountParamsType = {
    cell:number,
    row:number,
    isVerticalDirection:boolean,
    isPositiveDirection:boolean
};
