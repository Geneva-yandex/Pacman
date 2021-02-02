import {IComponentProps, CoordsType} from '../types';
import {CELL_SIZE} from '../views/Canvas';
import {convertToPixel, getCell, getRow} from '../helpers';

export default class User {
    ctx: CanvasRenderingContext2D | null;
    prevCoords: CoordsType | null;

    constructor(props: IComponentProps) {
        this.ctx = props.ctx;
        this.prevCoords = null;
    }

    public draw(userPosition: CoordsType) {
        if (!this.ctx) {
            return;
        }

        this.prevCoords = userPosition;

        const radius = 10;
        const x = convertToPixel(getCell(userPosition)) + CELL_SIZE / 2;
        const y = convertToPixel(getRow(userPosition)) + CELL_SIZE / 2;

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffe600';
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }

    public move(userPosition: CoordsType) {
        if (!this.ctx) {
            return;
        }

        if (this.prevCoords) {
            const prevX = convertToPixel(getCell(this.prevCoords));
            const prevY = convertToPixel(getRow(this.prevCoords));

            this.ctx.clearRect(prevX, prevY, CELL_SIZE, CELL_SIZE);
        }

        this.draw(userPosition);
    }
}
