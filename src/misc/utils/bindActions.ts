import {bindActionCreators} from 'redux';

const bindActions = (actions: any, store: any): any => {
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

