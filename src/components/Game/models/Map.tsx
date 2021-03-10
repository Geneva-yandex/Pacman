import {GameItemsEnum} from 'common/enums';
import {IComponentProps, CoordsType, DrawMapParams} from '../types';
import {CELL_SIZE} from '../views/Canvas';
import {convertToPixel, getCell, getRow, makeCellCoords} from '../helpers';

export default class Map {
    userCtx: CanvasRenderingContext2D;
    ghostCtx: CanvasRenderingContext2D;
    private isUserInitialized: boolean;
    private isGhostInitialized: boolean;

    constructor(props: IComponentProps) {
        this.userCtx = props.userCtx;
        this.ghostCtx = props.ghostCtx;
        this.isUserInitialized = false;
        this.isGhostInitialized = false;
    }

    public drawMap({map, initCookies, initPills, initUser, initGhost}: DrawMapParams) {
        const countCookies = this.countItem();
        const countPills = this.countItem();
        let cookies = 0;
        let pills = 0;

        map.forEach((row, rowIndex) => {
            row.forEach((itemCode, cellIndex) => {
                const coords = makeCellCoords(rowIndex, cellIndex);

                this.drawItem(itemCode, coords);

                if (itemCode === GameItemsEnum.Cookie) {
                    cookies = countCookies();
                }

                if (itemCode === GameItemsEnum.Pill) {
                    pills = countPills();
                }

                if (itemCode === GameItemsEnum.Empty && !this.isUserInitialized) {
                    initUser(coords);
                    this.isUserInitialized = true;
                }

                if (itemCode === GameItemsEnum.Ghost_home && !this.isGhostInitialized) {
                    initGhost(coords);
                    this.isGhostInitialized = true;
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
        this.userCtx.fillStyle = 'rgba(22, 59, 243, 0.5)';
        const rectCoords = this.getRectCoords(coords);
        this.userCtx.fillRect(rectCoords.x, rectCoords.y, rectCoords.width, rectCoords.height);
    }

    public drawGhostHome(coords: CoordsType) {
        const rectCoords = this.getRectCoords(coords);

        this.userCtx.fillStyle = 'rgb(0, 66, 255, 0.2)';
        this.userCtx.fillRect(rectCoords.x, rectCoords.y, rectCoords.width, rectCoords.height);
    }

    public drawCookie(coords: CoordsType) {
        const radius = 2;
        const arcCoords = this.getArcCoords(coords);

        this.userCtx.beginPath();
        this.userCtx.fillStyle = '#ffffff';
        this.userCtx.arc(arcCoords.x, arcCoords.y, radius, 0, 2 * Math.PI, true);
        this.userCtx.fill();
    }

    public drawPill(coords: CoordsType) {
        const radius = 6;
        const arcCoords = this.getArcCoords(coords);

        this.userCtx.beginPath();
        this.userCtx.fillStyle = '#ffffff';
        this.userCtx.arc(arcCoords.x, arcCoords.y, radius, 0, 2 * Math.PI, true);
        this.userCtx.fill();
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
