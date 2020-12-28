import {UserDirectionType} from '../components/Game/types';
import UserDirectionEnum from './UserDirectionEnum';

export default class KeyCodeEnum {
    static ARROW_UP = 'ArrowUp';
    static ARROW_DOWN = 'ArrowDown';
    static ARROW_RIGHT = 'ArrowRight';
    static ARROW_LEFT = 'ArrowLeft';

    static getDirectionByKeyCode(keyCode: string):UserDirectionType | undefined {
        const map:Record<string, string> = {
            [this.ARROW_UP]: UserDirectionEnum.TOP,
            [this.ARROW_DOWN]: UserDirectionEnum.BOTTOM,
            [this.ARROW_RIGHT]: UserDirectionEnum.RIGHT,
            [this.ARROW_LEFT]: UserDirectionEnum.LEFT
        };

        return map[keyCode] as UserDirectionType | undefined;
    }
}
