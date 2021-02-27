import {createSelector} from 'reselect';
import {IStore as StateType} from '../types';
const fullNameSelector = createSelector(
    (state: StateType) => {
        if (state.user.item !== null) {
            return state.user.item.first_name;
        }

        return '';
    },
    (state: StateType) => {
        if (state.user.item !== null) {
            return state.user.item.second_name;
        }

        return '';
    },
    (firstName: string, secondName: string) => {
        return `${firstName} ${secondName}`;
    }
);
export default fullNameSelector;
