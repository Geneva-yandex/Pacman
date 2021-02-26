import {bindActionCreators} from 'redux';
import {Store} from 'redux';
import {IAction} from '../../store/types';

type ActionsObjType = Record<string, () => IAction | ActionsObjType>;

const bindActions = (actions: ActionsObjType, store: Store): any => {
    return Object.keys(actions).reduce((result, key) => {
        const subObj = actions[key];

        return {
            ...result,
            [key]: typeof subObj === 'function' ?
                bindActionCreators(subObj, store.dispatch) :
                bindActions(subObj, store)
        };
    }, {});
};

export default bindActions;

