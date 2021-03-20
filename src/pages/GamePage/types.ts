export type ViewType = 'start' | 'game' | 'finish';
import {IUser} from '../../common/types/interfaces';

export interface IStateGamePage {
    view: ViewType
}

export interface IViewProps {
    user?: IUser;
    changeView: () => void
}
