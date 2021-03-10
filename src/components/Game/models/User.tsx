import {IComponentProps, CoordsType} from '../types';
import {CELL_SIZE} from '../views/Canvas';
import {convertToPixel, getCell, getRow} from '../helpers';

export default class User {
    userCtx: CanvasRenderingContext2D;
    prevCoords: CoordsType | null;

    constructor(props: IComponentProps) {
        this.userCtx = props.userCtx;
        this.prevCoords = null;
    }

    public draw(userPosition: CoordsType) {
        this.prevCoords = userPosition;

        const radius = 10;
        const x = convertToPixel(getCell(userPosition)) + CELL_SIZE / 2;
        const y = convertToPixel(getRow(userPosition)) + CELL_SIZE / 2;

        this.userCtx.beginPath();
        this.userCtx.fillStyle = '#ffe600';
        this.userCtx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.userCtx.fill();
    }

    public move(userPosition: CoordsType) {
        if (this.prevCoords) {
            const prevX = convertToPixel(getCell(this.prevCoords));
            const prevY = convertToPixel(getRow(this.prevCoords));

            this.userCtx.clearRect(prevX, prevY, CELL_SIZE, CELL_SIZE);
        }

        this.draw(userPosition);
    }
}
