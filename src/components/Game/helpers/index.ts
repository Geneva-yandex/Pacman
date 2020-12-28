import {CELL_SIZE} from '../views/Canvas';
import {СoordsType} from '../types';
import GameItemsEnum from '../../../enums/GameItemsEnum';

export const convertToPixel = (cellsCount: number):number => {
    return cellsCount * CELL_SIZE;
};

export const makeCellCoords = (row: number, cell: number):СoordsType => ({
    row,
    cell
});

export const getRow = (coords: СoordsType) => coords.row;

export const getCell = (coords: СoordsType) => coords.cell;

export const isSuitableValue = (value:number):boolean => {
    const ERROR = 0.2;
    const roundedValue = Math.round(value);
    return (value <= (roundedValue + ERROR) && value >= (roundedValue - ERROR));
};

export const isOutOfReachItem = (itemCode: number): boolean => {
    return [GameItemsEnum.WALL, GameItemsEnum.GHOST_HOME].includes(itemCode);
};

