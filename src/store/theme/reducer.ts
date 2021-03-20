import {IAction} from '../types';
import {CHANGE_USER_THEME, TOGGLE_DARK_LIGHT} from './actions';
import {createReducer} from 'typesafe-actions';
import {darkTheme, lightTheme} from '../../utils/themes';

export type IThemeState = {
    name: string;
    theme: string;
};

const defaultState: IThemeState = {
    name: 'dark',
    theme: darkTheme
};

const themeReducer = createReducer(defaultState)
    .handleAction(CHANGE_USER_THEME, (state: IThemeState, action: IAction<IThemeState>) => ({
        ...state,
        ...action.payload
    }))
    .handleAction(TOGGLE_DARK_LIGHT, (state: IThemeState) => {
        const {name} = state;

        return {
            ...state,
            name: name === 'dark' ? 'light' : 'dark',
            theme: name === 'dark' ? lightTheme : darkTheme
        };
    });

export default themeReducer;
