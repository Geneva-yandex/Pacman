import configureStore from './configureStore';
import bindActions from '../misc/utils/bindActions';
import actions from './actions';
import isServer from '../misc/utils/isServer';

export const {store, history} = configureStore({initialStore: !isServer && window.__PRELOADED_STATE__});
if (!isServer) {
    delete window[__PRELOADED_STATE__];
}

export const boundActions = bindActions(actions, store);
