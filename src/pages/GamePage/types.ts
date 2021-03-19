export type ViewType = 'start' | 'game' | 'finish';

export interface IStateGamePage {
    view: ViewType
}

export interface IViewProps {
    changeView: () => void
}
