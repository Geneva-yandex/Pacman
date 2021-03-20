import {action} from 'typesafe-actions';

export const CHANGE_USER_THEME = 'changeTheme';
export const TOGGLE_DARK_LIGHT = 'toggleDarkLightTheme';

export const toggleDarkLightTheme = () => action(TOGGLE_DARK_LIGHT);
export const setTheme = () => action(CHANGE_USER_THEME);

