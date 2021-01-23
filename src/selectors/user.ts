import {createSelector} from 'reselect';
import {state as stateType} from '../store/types';
const fullNameSelector = createSelector(
    (state: stateType) => {
        if (state.user.item !== null) {
            return state.user.item.first_name;
        }

        return '';
    },
    (state: stateType) => {
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
