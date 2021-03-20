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

        const headRadius = 10;
        const legRadius = 2.5;

        const cell = getCell(ghostPosition);
        const row = getRow(ghostPosition);

        const xArc = convertToPixel(cell) + CELL_SIZE / 2;
        const y = convertToPixel(row) + CELL_SIZE / 2;
        const xRect = convertToPixel(cell) + (CELL_SIZE - headRadius * 2) / 2;
        const xArcLeg_1 = convertToPixel(cell) + CELL_SIZE / 2 - headRadius / 2;
        const xArcLeg_2 = convertToPixel(cell) + CELL_SIZE / 2 + headRadius / 2;
        const yArcLeg = convertToPixel(row) + CELL_SIZE / 2 + headRadius;

        this.ghostCtx.beginPath();
        this.ghostCtx.fillStyle = (mode === GhostModeEnum.Frightened) ? '#0073ff' : '#ff0000';
        this.ghostCtx.arc(xArc, y, headRadius, 0, 2 * Math.PI, true);
        this.ghostCtx.fillRect(xRect, y, headRadius * 2, headRadius);
        this.ghostCtx.fill();
        this.ghostCtx.beginPath();
        this.ghostCtx.fillStyle = '#171717';
        this.ghostCtx.arc(xArcLeg_1, yArcLeg, legRadius, 0, 2 * Math.PI, true);
        this.ghostCtx.arc(xArcLeg_2, yArcLeg, legRadius, 0, 2 * Math.PI, true);
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
