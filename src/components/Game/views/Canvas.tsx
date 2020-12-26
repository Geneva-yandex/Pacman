import * as React from 'react';
import bem from 'easy-bem';
import './Canvas.scss';
import {coordsType, ICanvasProps, mapType, userDirectionType, availableCellsCountParamsType} from '../types';
import mapData from '../maps/basic';
import Map from '../components/Map';
import User from '../components/User';
import {convertToPixel, getCell, getRow, makeCellCoords} from '../helpers';
import UserDirectionEnum from '../../../enums/UserDirectionEnum';
import GameItemsEnum from '../../../enums/GameItemsEnum';
import {isSuitableValue} from '../helpers';

const b = bem('Canvas');

export const CELL_SIZE = 26;
const CANVAS_SIZE = {
    width: convertToPixel(mapData[0].length),
    height: convertToPixel(mapData.length)
};

export default class Canvas extends React.PureComponent<ICanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D | null;
    mapData: mapType;
    mapComponent: Map;
    userComponent: User;
    requestAnimationId: number | null;
    userPosition: coordsType;
    userDirection: userDirectionType;

    constructor(props: ICanvasProps) {
        super(props);

        this.canvasRef = React.createRef();
        this.mapData = [...mapData];
        this.requestAnimationId = null;

        this.userPosition = makeCellCoords(0, 0);
        this.userDirection = UserDirectionEnum.RIGHT as 'right';
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            this.ctx = this.canvasRef.current.getContext('2d');
            this.initComponents();

            window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e.code));
        }
    }

    render() {
        return (
            <div className={b()}>
                <canvas
                    width={CANVAS_SIZE.width}
                    height={CANVAS_SIZE.height}
                    ref={this.canvasRef}
                />
            </div>
        );
    }

    initComponents() {
        const componentProps = {
            ctx: this.ctx
        };

        this.mapComponent = new Map(componentProps);
        this.userComponent = new User(componentProps);

        this.mapComponent.drawMap({
            map: this.mapData,
            initCookies: this.props.initCookies,
            initPills: this.props.initPills,
            initUser: userPosition => {
                this.setUserPosition(userPosition);
                this.userComponent?.draw(userPosition);
                this.animateUser(this.userDirection, userPosition);
            }
        });
    }

    onKeyDown(keyCode: string) {
        const newDirection = UserDirectionEnum.getDirectionByKeyCode(keyCode);
        if (!newDirection) {
            return;
        }

        if (newDirection === this.userDirection) {
            return;
        }

        const currentDirectionType = UserDirectionEnum.getDirectionType(this.userDirection);
        const newDirectionType = UserDirectionEnum.getDirectionType(newDirection);

        if (currentDirectionType !== newDirectionType) {
            const row = getRow(this.userPosition);
            const cell = getCell(this.userPosition);
            const isPositiveNewDirection = UserDirectionEnum.isPositiveDirection(newDirection);

            if (!isSuitableValue(currentDirectionType === 'vertical' ? row : cell)) {
                return;
            }

            let newRow = Math.round(row);
            let newCell = Math.round(cell);

            if (currentDirectionType === 'vertical') {
                newCell = isPositiveNewDirection ?
                    newCell + 1 :
                    newCell - 1;
            } else {
                newRow = isPositiveNewDirection ?
                    newRow + 1 :
                    newRow - 1;
            }

            if (GameItemsEnum.isOutOfReachItem(this.mapData[newRow][newCell])) {
                return;
            }
        }

        this.turnDirection(newDirection);
    }

    turnDirection(newDirection: userDirectionType) {
        this.userDirection = newDirection;
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
        }

        this.animateUser(newDirection, this.userPosition);
    }

    animateUser(userDirection: userDirectionType, userPosition:coordsType) {
        const cell = Math.round(getCell(userPosition));
        const row = Math.round(getRow(userPosition));
        const isVerticalDirection = UserDirectionEnum.getDirectionType(userDirection) === 'vertical';
        const isPositiveDirection = UserDirectionEnum.isPositiveDirection(userDirection);

        const availableCellsCount = this.getAvailableCellsCount({
            cell,
            row,
            isVerticalDirection,
            isPositiveDirection
        });

        if (availableCellsCount === 0) {
            return;
        }

        const duration = availableCellsCount * this.props.speed;
        const sign = isPositiveDirection ? 1 : -1;
        let start = performance.now();

        const animate = (time:number) => {
            let timeFraction = Math.abs((time - start) / duration);

            if (timeFraction > 1) {
                timeFraction = 1;
            }

            const newCell = !isVerticalDirection ?
                Math.abs(availableCellsCount * timeFraction * sign + cell) :
                cell;

            const newRow = isVerticalDirection ?
                Math.abs(availableCellsCount * timeFraction * sign + row) :
                row;

            const coords = makeCellCoords(newRow, newCell);
            this.setUserPosition(coords);
            this.userComponent.move(coords);

            this.takeMapItems(userDirection, newRow, newCell);

            if (timeFraction < 1) {
                this.requestAnimationId = requestAnimationFrame(animate);
            }
        };

        this.requestAnimationId = requestAnimationFrame(animate);
    }

    getAvailableCellsCount(params: availableCellsCountParamsType):number {
        const step = params.isPositiveDirection ? 1 : -1;

        let cellsCount = 0;

        let cellIndex = !params.isVerticalDirection ?
            params.cell + step :
            params.cell;

        let rowIndex = params.isVerticalDirection ?
            params.row + step :
            params.row;

        while (!GameItemsEnum.isOutOfReachItem(this.mapData[rowIndex][cellIndex])) {
            ++cellsCount;
            if (params.isVerticalDirection) {
                rowIndex += step;
            } else {
                cellIndex += step;
            }
        }

        return cellsCount;
    }

    setUserPosition(userPosition: coordsType) {
        this.userPosition = userPosition;
    }

    takeMapItems(direction: userDirectionType, row: number, cell: number) {
        if (!isSuitableValue(UserDirectionEnum.getDirectionType(direction) === 'vertical' ? row : cell)) {
            return;
        }

        const roundedRow = Math.round(row);
        const roundedCell = Math.round(cell);
        const mapItem = this.mapData[roundedRow][roundedCell];

        const callbackList = {
            [GameItemsEnum.PILL]: this.props.eatPills,
            [GameItemsEnum.COOKIE]: this.props.eatCookies
        };

        const callback = callbackList[mapItem];
        if (callback) {
            callback();
            this.mapData[roundedRow][roundedCell] = GameItemsEnum.EMPTY;
        }
    }
}
