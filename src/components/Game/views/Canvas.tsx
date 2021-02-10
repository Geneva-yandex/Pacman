import * as React from 'react';
import bem from 'easy-bem';
import {UserDirectionEnum, GameItemsEnum, UserDirectionTypeEnum} from 'common/enums';
import {CoordsType, ICanvasProps, MapType, UserDirectionType, AvailableCellsCountParamsType} from '../types';
import mapData from '../maps/basic';
import Map from '../models/Map';
import User from '../models/User';

import {
    convertToPixel,
    getCell,
    getRow,
    makeCellCoords,
    isOutOfReachItem,
    getDirectionSign,
    getDirectionType,
    getDirectionByKeyCode,
    isSuitableValue
} from '../helpers';

const b = bem('Canvas');

export const CELL_SIZE = 26;
const CANVAS_SIZE = {
    width: convertToPixel(mapData[0].length),
    height: convertToPixel(mapData.length)
};

export default class Canvas extends React.PureComponent<ICanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D | null;
    mapData: MapType;
    mapComponent: Map;
    userComponent: User;
    requestAnimationId: number | null;
    userPosition: CoordsType;
    userDirection: UserDirectionType;

    constructor(props: ICanvasProps) {
        super(props);

        this.canvasRef = React.createRef();
        this.mapData = [...mapData];
        this.requestAnimationId = null;

        this.userPosition = makeCellCoords(0, 0);
        this.userDirection = UserDirectionEnum.Right;
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            this.ctx = this.canvasRef.current.getContext('2d');
            this.initComponents();

            window.addEventListener('keydown', this.onKeyDown);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
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
            ctx: this.ctx as CanvasRenderingContext2D
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
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
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
                this.requestAnimationId = requestAnimationFrame(animate);
            }
        };

        this.requestAnimationId = requestAnimationFrame(animate);
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
