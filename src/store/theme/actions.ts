import {action} from 'typesafe-actions';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {IThemeState} from './reducer';
import ThemeApi from '../../api/ThemeApi';

export const CHANGE_USER_THEME = 'changeTheme';
export const TOGGLE_DARK_LIGHT = 'toggleDarkLightTheme';

export const toggleDarkLightTheme = () => action(TOGGLE_DARK_LIGHT);
export const setTheme = () => action(CHANGE_USER_THEME);

type Dispatch = ThunkDispatch<IThemeState, void, AnyAction>;

export class ThemeStateActions {
    static toggleTheme = (theme: string) => async (dispatch: Dispatch) => {
        try {
            await ThemeApi.changeUserTheme(theme);
            dispatch(toggleDarkLightTheme());
        } catch (error) { }
    };
}
