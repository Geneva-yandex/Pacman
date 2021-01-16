import {GameItemsEnum} from '../../../enums/GameItemsEnum';
import {IComponentProps, CoordsType, DrawMapParams} from '../types';
import {CELL_SIZE} from '../views/Canvas';
import {convertToPixel, getCell, getRow, makeCellCoords} from '../helpers';

export default class Map {
    ctx: CanvasRenderingContext2D | null;

    constructor(props: IComponentProps) {
        this.ctx = props.ctx;
    }

    public drawMap({map, initCookies, initPills, initUser}: DrawMapParams) {
        if (!this.ctx) {
            return;
        }

        const countCookies = this.countItem();
        const countPills = this.countItem();
        let cookies = 0;
        let pills = 0;

        map.forEach((row, rowIndex) => {
            row.forEach((itemCode, cellIndex) => {
                this.drawItem(itemCode, makeCellCoords(rowIndex, cellIndex));

                if (itemCode === GameItemsEnum.Cookie) {
                    cookies = countCookies();
                }

                if (itemCode === GameItemsEnum.Pill) {
                    pills = countPills();
                }

                if (itemCode === GameItemsEnum.Empty) {
                    initUser(makeCellCoords(rowIndex, cellIndex));
                }
            });
        });

        initCookies(cookies);
        initPills(pills);
    }

    private drawItem(itemCode: number, coords: CoordsType) {
        switch (itemCode) {
        case (GameItemsEnum.Wall):
            this.drawWalls(coords);
            break;
        case (GameItemsEnum.Ghost_home):
            this.drawGhostHome(coords);
            break;
        case (GameItemsEnum.Cookie):
            this.drawCookie(coords);
            break;
        case (GameItemsEnum.Pill):
            this.drawPill(coords);
            break;
        }
    }

    public drawWalls(coords: CoordsType) {
        if (!this.ctx) {
            return;
        }

        this.ctx.fillStyle = 'rgba(22, 59, 243, 0.5)';
        const rectCoords = this.getRectCoords(coords);
        this.ctx.fillRect(rectCoords.x, rectCoords.y, rectCoords.width, rectCoords.height);
    }

    public drawGhostHome(coords: CoordsType) {
        if (!this.ctx) {
            return;
        }

        const rectCoords = this.getRectCoords(coords);

        this.ctx.fillStyle = 'rgb(0, 66, 255, 0.2)';
        this.ctx.fillRect(rectCoords.x, rectCoords.y, rectCoords.width, rectCoords.height);
    }

    public drawCookie(coords: CoordsType) {
        if (!this.ctx) {
            return;
        }

        const radius = 2;
        const arcCoords = this.getArcCoords(coords);

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.arc(arcCoords.x, arcCoords.y, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }

    public drawPill(coords: CoordsType) {
        if (!this.ctx) {
            return;
        }

        const radius = 6;
        const arcCoords = this.getArcCoords(coords);

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.arc(arcCoords.x, arcCoords.y, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }

    private getRectCoords(coords: CoordsType) {
        return {
            x: convertToPixel(getCell(coords)),
            y: convertToPixel(getRow(coords)),
            width: CELL_SIZE,
            height: CELL_SIZE
        };
    }

    private getArcCoords(coords: CoordsType) {
        return {
            x: convertToPixel(getCell(coords)) + CELL_SIZE / 2,
            y: convertToPixel(getRow(coords)) + CELL_SIZE / 2
        };
    }

    countItem() {
        let counter = 0;

        return () => {
            return ++counter;
        };
    }
}
