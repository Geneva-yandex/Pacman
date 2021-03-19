import {CoordsType, IComponentProps} from '../types';
import {convertToPixel, getCell, getRow} from '../helpers';
import {CELL_SIZE} from '../views/Canvas';
import {GhostModeEnum} from '../../../common/enums/GhostModeEnum';

export default class Ghost {
    ghostCtx: CanvasRenderingContext2D;
    prevCoords: CoordsType | null;

    constructor(props: IComponentProps) {
        this.ghostCtx = props.ghostCtx;
    }

    public draw(ghostPosition: CoordsType, mode?: GhostModeEnum) {
        this.prevCoords = ghostPosition;

        const radius = 10;
        const x = convertToPixel(getCell(ghostPosition)) + CELL_SIZE / 2;
        const y = convertToPixel(getRow(ghostPosition)) + CELL_SIZE / 2;

        this.ghostCtx.beginPath();
        this.ghostCtx.fillStyle = (mode === GhostModeEnum.Frightened) ? '#0073ff' : '#ff0000';
        this.ghostCtx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.ghostCtx.fill();
    }

    public move(userPosition: CoordsType, mode?: GhostModeEnum) {
        if (this.prevCoords) {
            const prevX = convertToPixel(getCell(this.prevCoords));
            const prevY = convertToPixel(getRow(this.prevCoords));

            this.ghostCtx.clearRect(prevX, prevY, CELL_SIZE, CELL_SIZE);
        }

        this.draw(userPosition, mode);
    }
}
