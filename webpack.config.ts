import getClientConfig from './webpack/client.config';
import getServerConfig from './webpack/server.config';

export default (env: any) => {
    return [
        getServerConfig(env),
        getClientConfig(env)
    ];
};
