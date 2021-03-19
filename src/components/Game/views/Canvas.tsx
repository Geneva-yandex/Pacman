import * as React from 'react';
import bem from 'easy-bem';
import {GameItemsEnum, UserDirectionEnum, UserDirectionTypeEnum} from 'common/enums';
import {
    AvailableCellsCountParamsType,
    CoordsType,
    GhostCoordsType,
    ICanvasProps,
    MapType,
    UserDirectionType
} from '../types';
import mapData from '../maps/basic';
import Map from '../models/Map';
import User from '../models/User';
import './Canvas.scss';

import {
    checkBump,
    convertToPixel,
    copyMap, decreaseSpeed,
    getCell,
    getDirectionByKeyCode,
    getDirectionSign,
    getDirectionType,
    getNextGhostPosition,
    getOppositeDirection,
    getRow,
    increaseSpeed,
    isOutOfReachItem,
    isSuitableValue,
    makeCellCoords,
    makeGhostCoords
} from '../helpers';
import Ghost from '../models/Ghost';
import {GhostModeEnum} from '../../../common/enums/GhostModeEnum';
import {INITIAL_SPEED} from '../Game';

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
const GHOST_TARGET_COORDS = makeCellCoords(0, 0);

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
    initialGhostPosition: CoordsType;
    initialUserPosition: CoordsType;
    resetTimerId: ReturnType<typeof setTimeout>;
    ghostPosition: CoordsType;
    bump: boolean;
    needChangeDirection: boolean;

    constructor(props: ICanvasProps) {
        super(props);

        this.userCanvasRef = React.createRef();
        this.mapData = copyMap(mapData);

        this.userRequestAnimationId = null;
        this.userPosition = makeCellCoords(0, 0);
        this.userDirection = UserDirectionEnum.Right;

        this.ghostCanvasRef = React.createRef();
        this.ghostRequestAnimationId = null;
        this.ghostDirection = null;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.initUser = this.initUser.bind(this);
        this.initGhost = this.initGhost.bind(this);
    }

    componentDidMount() {
        if (this.userCanvasRef.current && this.ghostCanvasRef.current) {
            this.userCtx = this.userCanvasRef.current.getContext('2d');
            this.ghostCtx = this.ghostCanvasRef.current.getContext('2d');
            this.initComponents();

            window.addEventListener('keydown', this.onKeyDown);
        }
    }

    componentDidUpdate(prevProps: Readonly<ICanvasProps>) {
        if (prevProps.ghostMode === GhostModeEnum.Chase && this.props.ghostMode !== GhostModeEnum.Chase && this.ghostDirection) {
            this.needChangeDirection = true;
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

        if (this.resetTimerId) {
            clearTimeout(this.resetTimerId);
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
            initUser: this.initUser,
            initGhost: this.initGhost
        });
    }

    initUser(userPosition: CoordsType, needResetOnly: boolean = false) {
        this.initialUserPosition = userPosition;
        this.setUserPosition(userPosition);
        this.userDirection = UserDirectionEnum.Right;

        if (!needResetOnly) {
            this.userComponent.draw(userPosition);
        }

        this.animateUser(this.userDirection, userPosition);
    }

    initGhost(ghostPosition: CoordsType, needResetOnly: boolean = false) {
        this.initialGhostPosition = ghostPosition;
        this.setGhostPosition(ghostPosition);
        this.ghostDirection = null;

        if (!needResetOnly) {
            this.ghostComponent.draw(ghostPosition);
        }

        this.animateGhost(ghostPosition);
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

            if (timeFraction < 1 && !this.bump) {
                this.userRequestAnimationId = requestAnimationFrame(animate);
            }
        };

        this.userRequestAnimationId = requestAnimationFrame(animate);
    }

    animateGhost(ghostPosition: CoordsType) {
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

                const mapItem = this.mapData[newRow][newCell];

                if (!isOutOfReachItem(mapItem)) {
                    possibleCoords.push(makeGhostCoords(newRow, newCell, direction));
                }
            }
        });

        const targetCoords = this.props.ghostMode === GhostModeEnum.Chase ?
            this.userPosition :
            GHOST_TARGET_COORDS;

        const nextGhostPosition = getNextGhostPosition(possibleCoords, targetCoords);

        const start = performance.now();
        const speed = this.getGhostSpeedByMode();

        const animate = (time: number) => {
            let timeFraction = Math.abs((time - start) / speed);

            if (timeFraction > 1) {
                timeFraction = 1;
            }

            const newCell = (getCell(nextGhostPosition.coords) - cell) * timeFraction + cell;
            const newRow = (getRow(nextGhostPosition.coords) - row) * timeFraction + row;

            const coords = makeCellCoords(newRow, newCell);
            this.setGhostPosition(coords);
            this.ghostComponent.move(coords, this.props.ghostMode);

            if (checkBump(this.userPosition, coords)) {
                if (this.props.ghostMode !== GhostModeEnum.Frightened) {
                    this.bump = true;
                    this.resetGhostAndUserPosition();
                    this.props.decreaseLives();
                } else {
                    this.resetGhostAndUserPosition(true);
                }

                return;
            }

            if (timeFraction < 1) {
                this.ghostRequestAnimationId = requestAnimationFrame(animate);
            } else {
                this.ghostDirection = this.needChangeDirection ?
                    nextGhostPosition.direction :
                    getOppositeDirection(nextGhostPosition.direction);
                this.needChangeDirection = false;
                this.animateGhost(nextGhostPosition.coords);
            }
        };

        this.ghostRequestAnimationId = requestAnimationFrame(animate);
    }

    getGhostSpeedByMode() {
        switch (this.props.ghostMode) {
        case GhostModeEnum.Chase:
            return increaseSpeed(this.props.speed, INITIAL_SPEED);
        case GhostModeEnum.Frightened:
            return decreaseSpeed(this.props.speed, INITIAL_SPEED);
        default:
            return this.props.speed;
        }
    }

    resetGhostAndUserPosition(resetGhostOnly?: boolean) {
        if (this.userRequestAnimationId && !resetGhostOnly) {
            cancelAnimationFrame(this.userRequestAnimationId);
        }

        if (this.ghostRequestAnimationId) {
            cancelAnimationFrame(this.ghostRequestAnimationId);
        }

        if (this.props.lives !== 1 || resetGhostOnly) {
            this.resetTimerId = setTimeout(() => {
                this.bump = false;
                if (!resetGhostOnly) {
                    this.initUser(this.initialUserPosition, true);
                } else {
                    if (this.props.ghostModeTimer) {
                        clearTimeout(this.props.ghostModeTimer);
                    }

                    this.props.returnGhostToPreviousMode();
                }

                this.initGhost(this.initialGhostPosition, true);
            }, resetGhostOnly ? 2500 : 1500);
        }
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

    setGhostPosition(ghostPosition: CoordsType) {
        this.ghostPosition = ghostPosition;
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
