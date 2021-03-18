import {GameItemsEnum, UserDirectionTypeEnum, UserDirectionEnum, KeyCodeEnum} from '../../../common/enums';
import {CoordsType, UserDirectionType, UserDirectionTypeType} from '../types';
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

