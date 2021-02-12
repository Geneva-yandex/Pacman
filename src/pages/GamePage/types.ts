import * as React from 'react';
import {IUser} from '../../types/interfaces';

export type ViewType = 'start' | 'game' | 'finish';

export interface IStateGamePage {
    view: ViewType
}

export interface IViewProps {
    changeView: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    user?: IUser;
}
