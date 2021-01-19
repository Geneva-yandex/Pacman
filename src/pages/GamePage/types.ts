import * as React from 'react';

export type ViewType = 'start' | 'game' | 'finish';

export interface IStateGamePage {
    view: ViewType
}

export interface IViewProps {
    changeView: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
