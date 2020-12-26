
export default class GameItemsEnum {
    static EMPTY = 0;
    static WALL = 1;
    static COOKIE = 2;
    static PILL = 3;
    static FRUIT = 4;
    static GHOST_HOME = 5;

    static isOutOfReachItem(itemCode: number): boolean {
        return [this.WALL, this.GHOST_HOME].includes(itemCode);
    }
}
