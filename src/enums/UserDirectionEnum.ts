import {UserDirectionType, UserDirectionTypeType} from '../components/Game/types';
import UserDirectionTypeEnum from './UserDirectionTypeEnum';

export default class UserDirectionEnum {
    static LEFT = 'left';
    static RIGHT = 'right';
    static TOP = 'top';
    static BOTTOM = 'bottom';

    static getDirectionType(direction: UserDirectionType):UserDirectionTypeType | undefined {
        const map = {
            [this.LEFT]: UserDirectionTypeEnum.HORIZONTAL,
            [this.RIGHT]: UserDirectionTypeEnum.HORIZONTAL,
            [this.TOP]: UserDirectionTypeEnum.VERTICAL,
            [this.BOTTOM]: UserDirectionTypeEnum.VERTICAL
        };

        return map[direction] as UserDirectionTypeType | undefined;
    }

    static getSign(direction: UserDirectionType):number {
        const map = {
            [this.LEFT]: -1,
            [this.RIGHT]: 1,
            [this.TOP]: -1,
            [this.BOTTOM]: 1
        };

        return map[direction];
    }
}
