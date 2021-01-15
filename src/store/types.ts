export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}
