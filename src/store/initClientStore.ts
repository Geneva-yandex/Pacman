import configureStore from './configureStore';
import bindActions from '../common/utils/bindActions';
import isServer from '../common/utils/isServer';
import actions from './actions';

export const {store, history} = configureStore({initialStore: !isServer && window.__PRELOADED_STATE__});
if (!isServer && window.__PRELOADED_STATE__) {
    delete window.__PRELOADED_STATE__;
}

export const boundActions = bindActions(actions as any, store);
