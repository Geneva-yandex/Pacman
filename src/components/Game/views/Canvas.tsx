import * as React from 'react';
import bem from 'easy-bem';
import {UserDirectionEnum, GameItemsEnum, UserDirectionTypeEnum} from 'common/enums';
import {
    CoordsType,
    ICanvasProps,
    MapType,
    UserDirectionType,
    AvailableCellsCountParamsType,
    GhostCoordsType
} from '../types';
import mapData from '../maps/basic';
import Map from '../models/Map';
import User from '../models/User';
import './Canvas.scss';

import {
    convertToPixel,
    getCell,
    getRow,
    makeCellCoords,
    isOutOfReachItem,
    getDirectionSign,
    getDirectionType,
    getDirectionByKeyCode,
    isSuitableValue, copyMap, getNextGhostPosition, makeGhostCoords, getOppositeDirection
} from '../helpers';
import Ghost from '../models/Ghost';

const b = bem('Canvas');

export const CELL_SIZE = 26;
const CANVAS_SIZE = {
    width: convertToPixel(mapData[0].length),
    height: convertToPixel(mapData.length)
};
const DIRECTIONS = [
    UserDirectionEnum.Left,
    UserDirectionEnum.Right,
    UserDirectionEnum.Top,
    UserDirectionEnum.Bottom
];

export default class Canvas extends React.PureComponent<ICanvasProps> {
    userCanvasRef: React.RefObject<HTMLCanvasElement>;
    userCtx: CanvasRenderingContext2D | null;
    userComponent: User;
    userRequestAnimationId: number | null;
    userPosition: CoordsType;
    userDirection: UserDirectionType;
    mapData: MapType;
    mapComponent: Map;
    ghostCtx: CanvasRenderingContext2D | null;
    ghostComponent: Ghost;
    ghostCanvasRef: React.RefObject<HTMLCanvasElement>;
    ghostDirection: UserDirectionType | null;
    ghostRequestAnimationId: number | null;

    constructor(props: ICanvasProps) {
        super(props);

        this.userCanvasRef = React.createRef();
        this.mapData = copyMap(mapData);

        this.userRequestAnimationId = null;
        this.userPosition = makeCellCoords(0, 0);
        this.userDirection = UserDirectionEnum.Right;

        this.ghostCanvasRef = React.createRef();
        this.ghostDirection = null;
        this.ghostRequestAnimationId = null;

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        if (this.userCanvasRef.current && this.ghostCanvasRef.current) {
            this.userCtx = this.userCanvasRef.current.getContext('2d');
            this.ghostCtx = this.ghostCanvasRef.current.getContext('2d');
            this.initComponents();

            window.addEventListener('keydown', this.onKeyDown);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);

        if (this.userRequestAnimationId) {
            cancelAnimationFrame(this.userRequestAnimationId);
        }

        if (this.ghostRequestAnimationId) {
            cancelAnimationFrame(this.ghostRequestAnimationId);
        }
    }

    render() {
        return (
            <div className={b()}>
                <canvas
                    className={b('user-layer')}
                    width={CANVAS_SIZE.width}
                    height={CANVAS_SIZE.height}
                    ref={this.userCanvasRef}
                />
                <canvas
                    className={b('ghost-layer')}
                    width={CANVAS_SIZE.width}
                    height={CANVAS_SIZE.height}
                    ref={this.ghostCanvasRef}
                />
            </div>
        );
    }

    initComponents() {
        const componentProps = {
            userCtx: this.userCtx as CanvasRenderingContext2D,
            ghostCtx: this.ghostCtx as CanvasRenderingContext2D
        };

        this.mapComponent = new Map(componentProps);
        this.userComponent = new User(componentProps);
        this.ghostComponent = new Ghost(componentProps);

        this.mapComponent.drawMap({
            map: this.mapData,
            initCookies: this.props.initCookies,
            initPills: this.props.initPills,
            initUser: userPosition => {
                this.setUserPosition(userPosition);
                this.userComponent?.draw(userPosition);
                this.animateUser(this.userDirection, userPosition);
            },
            initGhost: ghostPosition => {
                this.ghostComponent.draw(ghostPosition);
                this.chaseUser(ghostPosition);
            }
        });
    }

    onKeyDown(e: KeyboardEvent) {
        const newDirection = getDirectionByKeyCode(e.code);
        if (!newDirection) {
            return;
        }

        if (newDirection === this.userDirection) {
            return;
        }

        const currentDirectionType = getDirectionType(this.userDirection);
        const newDirectionType = getDirectionType(newDirection);

        if (currentDirectionType !== newDirectionType) {
            const row = getRow(this.userPosition);
            const cell = getCell(this.userPosition);
            const newDirectionSign = getDirectionSign(newDirection);

            if (!isSuitableValue(currentDirectionType === UserDirectionTypeEnum.Vertical ? row : cell)) {
                return;
            }

            let newRow = Math.round(row);
            let newCell = Math.round(cell);

            if (currentDirectionType === UserDirectionTypeEnum.Vertical) {
                newCell += newDirectionSign;
            } else {
                newRow += newDirectionSign;
            }

            if (isOutOfReachItem(this.mapData[newRow][newCell])) {
                return;
            }
        }

        this.turnDirection(newDirection);
    }

    turnDirection(newDirection: UserDirectionType) {
        this.userDirection = newDirection;
        if (this.userRequestAnimationId) {
            cancelAnimationFrame(this.userRequestAnimationId);
        }

        this.animateUser(newDirection, this.userPosition);
    }

    animateUser(userDirection: UserDirectionType, userPosition: CoordsType) {
        const cell = Math.round(getCell(userPosition));
        const row = Math.round(getRow(userPosition));
        const isVerticalDirection = getDirectionType(userDirection) === UserDirectionTypeEnum.Vertical;
        const sign = getDirectionSign(userDirection);

        const availableCellsCount = this.getAvailableCellsCount({
            cell,
            row,
            isVerticalDirection,
            isPositiveDirection: sign === 1
        });

        if (availableCellsCount === 0) {
            return;
        }

        const duration = availableCellsCount * this.props.speed;
        let start = performance.now();

        const animate = (time: number) => {
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
                this.userRequestAnimationId = requestAnimationFrame(animate);
            }
        };

        this.userRequestAnimationId = requestAnimationFrame(animate);
    }

    chaseUser(ghostPosition: CoordsType) {
        const possibleCoords: GhostCoordsType[] = [];

        const cell = getCell(ghostPosition);
        const row = getRow(ghostPosition);

        DIRECTIONS.forEach(direction => {
            if (direction !== this.ghostDirection) {
                const isVerticalDirection = getDirectionType(direction) === UserDirectionTypeEnum.Vertical;
                const step = getDirectionSign(direction);

                const newCell = !isVerticalDirection ?
                    cell + step :
                    cell;

                const newRow = isVerticalDirection ?
                    row + step :
                    row;

                if (!isOutOfReachItem(this.mapData[newRow][newCell])) {
                    possibleCoords.push(makeGhostCoords(newRow, newCell, direction));
                }
            }
        });

        const nextGhostPosition = getNextGhostPosition(possibleCoords, this.userPosition);

        const start = performance.now();

        const animate = (time: number) => {
            let timeFraction = Math.abs((time - start) / this.props.speed);

            if (timeFraction > 1) {
                timeFraction = 1;
            }

            const newCell = (getCell(nextGhostPosition.coords) - cell) * timeFraction + cell;
            const newRow = (getRow(nextGhostPosition.coords) - row) * timeFraction + row;

            const coords = makeCellCoords(newRow, newCell);
            this.ghostComponent.move(coords);

            if (timeFraction < 1) {
                this.ghostRequestAnimationId = requestAnimationFrame(animate);
            } else {
                this.ghostDirection = getOppositeDirection(nextGhostPosition.direction);
                this.chaseUser(nextGhostPosition.coords);
            }
        };

        this.ghostRequestAnimationId = requestAnimationFrame(animate);
    }

    getAvailableCellsCount(params: AvailableCellsCountParamsType): number {
        const step = params.isPositiveDirection ? 1 : -1;

        let cellsCount = 0;

        let cellIndex = !params.isVerticalDirection ?
            params.cell + step :
            params.cell;

        let rowIndex = params.isVerticalDirection ?
            params.row + step :
            params.row;

        while (!isOutOfReachItem(this.mapData[rowIndex][cellIndex])) {
            ++cellsCount;
            if (params.isVerticalDirection) {
                rowIndex += step;
            } else {
                cellIndex += step;
            }
        }

        return cellsCount;
    }

    setUserPosition(userPosition: CoordsType) {
        this.userPosition = userPosition;
    }

    takeMapItems(direction: UserDirectionType, row: number, cell: number) {
        if (!isSuitableValue(getDirectionType(direction) === UserDirectionTypeEnum.Vertical ? row : cell)) {
            return;
        }

        const roundedRow = Math.round(row);
        const roundedCell = Math.round(cell);
        const mapItem = this.mapData[roundedRow][roundedCell];

        const callbackList: Record<string, () => void> = {
            [GameItemsEnum.Pill]: this.props.eatPills,
            [GameItemsEnum.Cookie]: this.props.eatCookies
        };

        const callback = callbackList[mapItem];
        if (callback) {
            callback();
            this.mapData[roundedRow][roundedCell] = GameItemsEnum.Empty;
        }
    }
}
