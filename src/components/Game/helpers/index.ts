import {GameItemsEnum, UserDirectionTypeEnum, UserDirectionEnum, KeyCodeEnum} from 'common/enums';
import {
    CoordsType,
    GhostCoordsType,
    UserDirectionType,
    UserDirectionTypeType
} from '../types';
import {CELL_SIZE} from '../views/Canvas';

export const convertToPixel = (cellsCount: number): number => {
    return cellsCount * CELL_SIZE;
};

export const makeCellCoords = (row: number, cell: number): CoordsType => ({
    row,
    cell
});

export const getRow = (coords: CoordsType) => coords.row;

export const getCell = (coords: CoordsType) => coords.cell;

export const increaseSpeed = (currentSpeed: number, initialSpeed: number) => {
    return currentSpeed - initialSpeed * 0.05;
};

export const decreaseSpeed = (currentSpeed: number, initialSpeed: number) => {
    return currentSpeed + initialSpeed * 0.5;
};

export const isSuitableValue = (value: number): boolean => {
    const ERROR = 0.2;
    const roundedValue = Math.round(value);
    return (value <= (roundedValue + ERROR) && value >= (roundedValue - ERROR));
};

export const isOutOfReachItem = (itemCode: number): boolean => {
    return [GameItemsEnum.Wall, GameItemsEnum.Ghost_home].includes(itemCode);
};

export const getDirectionType = (direction: UserDirectionType): UserDirectionTypeType | undefined => {
    const map = {
        [UserDirectionEnum.Left]: UserDirectionTypeEnum.Horizontal,
        [UserDirectionEnum.Right]: UserDirectionTypeEnum.Horizontal,
        [UserDirectionEnum.Top]: UserDirectionTypeEnum.Vertical,
        [UserDirectionEnum.Bottom]: UserDirectionTypeEnum.Vertical
    };

    return map[direction];
};

export const getDirectionSign = (direction: UserDirectionType): number => {
    const map = {
        [UserDirectionEnum.Left]: -1,
        [UserDirectionEnum.Right]: 1,
        [UserDirectionEnum.Top]: -1,
        [UserDirectionEnum.Bottom]: 1
    };

    return map[direction];
};

export const getDirectionByKeyCode = (keyCode: string): UserDirectionType | undefined => {
    const map: Record<string, string> = {
        [KeyCodeEnum.Arrow_up]: UserDirectionEnum.Top,
        [KeyCodeEnum.Arrow_down]: UserDirectionEnum.Bottom,
        [KeyCodeEnum.Arrow_right]: UserDirectionEnum.Right,
        [KeyCodeEnum.Arrow_left]: UserDirectionEnum.Left
    };

    return map[keyCode] as UserDirectionType | undefined;
};

export const getOppositeDirection = (direction: UserDirectionType): UserDirectionType => {
    const map = {
        [UserDirectionEnum.Left]: UserDirectionEnum.Right,
        [UserDirectionEnum.Right]: UserDirectionEnum.Left,
        [UserDirectionEnum.Top]: UserDirectionEnum.Bottom,
        [UserDirectionEnum.Bottom]: UserDirectionEnum.Top
    };

    return map[direction];
};

export const copyMap = (arr: any[]): any[] => {
    return arr.map(item => {
        if (Array.isArray(item)) {
            return copyMap(item);
        }

        return item;
    });
};

export const makeGhostCoords = (row: number, cell: number, direction: UserDirectionType): GhostCoordsType => ({
    coords: makeCellCoords(row, cell),
    direction
});

export const getNextGhostPosition = (possibleCoords: GhostCoordsType[], userCoords: CoordsType): GhostCoordsType => {
    const hypotenuses = possibleCoords.map(item => {
        const cellsDiff = Math.abs(Math.ceil(getCell(userCoords)) - getCell(item.coords));
        const rowsDiff = Math.abs(Math.ceil(getRow(userCoords)) - getRow(item.coords));
        return Math.hypot(cellsDiff, rowsDiff);
    });

    const index = hypotenuses.indexOf(Math.min(...hypotenuses));
    return possibleCoords[index];
};

export const checkBump = (userPosition: CoordsType, ghostPosition: CoordsType): boolean => {
    return (Math.abs(getCell(userPosition) - getCell(ghostPosition)) +
        Math.abs(getRow(userPosition) - getRow(ghostPosition))) < 0.9;
};
