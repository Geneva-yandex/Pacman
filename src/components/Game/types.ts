export type MapType = number[][];

export type СoordsType = {
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
    speed: number
}

export type GameInitMethodsType = {
    initCookies: (cookies: number) => void,
    initPills: (pills: number) => void,
};

export interface ICanvasProps extends Omit<IGameState, 'lives' | 'level' | 'score'>, GameInitMethodsType {
    eatPills: () => void
    eatCookies: () => void
}

export interface IComponentProps {
    ctx: CanvasRenderingContext2D | null
}

export type DrawMapParams = {
    map: MapType,
    initUser: (position: СoordsType) => void,
} & GameInitMethodsType;

export type AvailableCellsCountParamsType = {
    cell:number,
    row:number,
    isVerticalDirection:boolean,
    isPositiveDirection:boolean
};
