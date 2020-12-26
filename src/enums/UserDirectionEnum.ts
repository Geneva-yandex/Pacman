import {userDirectionType} from '../components/Game/types';

export default class UserDirectionEnum {
    static LEFT = 'left';
    static RIGHT = 'right';
    static TOP = 'top';
    static BOTTOM = 'bottom';

    static getDirectionByKeyCode(keyCode: string):userDirectionType | undefined {
        const map:Record<string, string> = {
            ArrowUp: this.TOP,
            ArrowDown: this.BOTTOM,
            ArrowRight: this.RIGHT,
            ArrowLeft: this.LEFT
        };

        return map[keyCode] as userDirectionType | undefined;
    }

    static getDirectionType(direction: userDirectionType): 'vertical' | 'horizontal' | null {
        if ([this.TOP, this.BOTTOM].includes(direction)) {
            return 'vertical';
        }

        if ([this.LEFT, this.RIGHT].includes(direction)) {
            return 'horizontal';
        }

        return null;
    }

    static isPositiveDirection(direction: userDirectionType): boolean {
        return [this.BOTTOM, this.RIGHT].includes(direction);
    }
}
