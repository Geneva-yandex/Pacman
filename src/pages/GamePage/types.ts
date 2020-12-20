import * as React from 'react';

export type viewType = 'start' | 'game' | 'finish';

export interface IStateGamePage {
    view: viewType
}

export interface IViewProps {
    changeView: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
