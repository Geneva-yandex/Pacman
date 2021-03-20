import {IComponentProps, CoordsType, UserDirectionType} from '../types';
import {CELL_SIZE} from '../views/Canvas';
import {convertToPixel, getCell, getRow} from '../helpers';
import {UserDirectionEnum} from '../../../common/enums';

export default class User {
    userCtx: CanvasRenderingContext2D;
    prevCoords: CoordsType | null;

    constructor(props: IComponentProps) {
        this.userCtx = props.userCtx;
        this.prevCoords = null;
    }

    public draw(userPosition: CoordsType, userDirection: UserDirectionType) {
        this.prevCoords = userPosition;

        const radius = 10;
        const x = convertToPixel(getCell(userPosition)) + CELL_SIZE / 2;
        const y = convertToPixel(getRow(userPosition)) + CELL_SIZE / 2;

        this.userCtx.beginPath();
        this.userCtx.fillStyle = '#ffe600';
        this.userCtx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.userCtx.fill();
        this.userCtx.beginPath();
        this.userCtx.fillStyle = '#171717';
        this.userCtx.moveTo(x, y);

        if (userDirection === UserDirectionEnum.Right) {
            this.userCtx.lineTo(x + CELL_SIZE / 2, y - 4);
            this.userCtx.lineTo(x + CELL_SIZE / 2, y + 4);
        } else if (userDirection === UserDirectionEnum.Left) {
            this.userCtx.lineTo(x - CELL_SIZE / 2, y - 4);
            this.userCtx.lineTo(x - CELL_SIZE / 2, y + 4);
        } else if (userDirection === UserDirectionEnum.Top) {
            this.userCtx.lineTo(x - 4, y - CELL_SIZE / 2);
            this.userCtx.lineTo(x + 4, y - CELL_SIZE / 2);
        } else if (userDirection === UserDirectionEnum.Bottom) {
            this.userCtx.lineTo(x - 4, y + CELL_SIZE / 2);
            this.userCtx.lineTo(x + 4, y + CELL_SIZE / 2);
        }

        this.userCtx.lineTo(x, y);

        this.userCtx.fill();
    }

    public move(userPosition: CoordsType, userDirection: UserDirectionType) {
        if (this.prevCoords) {
            const prevX = convertToPixel(getCell(this.prevCoords));
            const prevY = convertToPixel(getRow(this.prevCoords));

            this.userCtx.clearRect(prevX, prevY, CELL_SIZE, CELL_SIZE);
        }

        this.draw(userPosition, userDirection);
    }
}
