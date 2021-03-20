import {createSelector} from 'reselect';
import {IStore as StateType} from '../types';

const themeSelector = createSelector(
    (state: StateType) => state,
    (state: StateType) => state.theme.theme
);

export default themeSelector;
