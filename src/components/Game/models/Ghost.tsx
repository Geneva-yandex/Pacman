import {CoordsType, IComponentProps} from '../types';
import {convertToPixel, getCell, getRow} from '../helpers';
import {CELL_SIZE} from '../views/Canvas';

export default class Ghost {
    ctx: CanvasRenderingContext2D;

    constructor(props: IComponentProps) {
        this.ctx = props.ctx;
    }

    public draw(ghostPosition: CoordsType) {
        const radius = 10;
        const x1 = convertToPixel(getCell(ghostPosition));
        const x2 = convertToPixel(getCell(ghostPosition)) + CELL_SIZE;
        const y = convertToPixel(getRow(ghostPosition));

        this.ctx.beginPath();
        this.ctx.fillStyle = '#e540c5';
        this.ctx.arcTo(x1, y, x2, y, radius);
        this.ctx.fill();
    }

    public move(ghostPosition: CoordsType) {
        this.draw(ghostPosition);
    }
}
