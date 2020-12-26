import {CELL_SIZE} from '../views/Canvas';
import {coordsType} from '../types';

export const convertToPixel = (cellsCount: number):number => {
    return cellsCount * CELL_SIZE;
};

export const makeCellCoords = (row: number, cell: number):coordsType => ({
    row,
    cell
});

export const getRow = (coords: coordsType) => coords.row;

export const getCell = (coords: coordsType) => coords.cell;

export const isSuitableValue = (value:number):boolean => {
    const ERROR = 0.2;
    const roundedValue = Math.round(value);
    return (value <= (roundedValue + ERROR) && value >= (roundedValue - ERROR));
};
