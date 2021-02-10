import {precacheAndRoute, matchPrecache} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {setCatchHandler, setDefaultHandler} from 'workbox-routing';

declare var self: WorkerGlobalScope & typeof globalThis & {
    __WB_MANIFEST: any
};

precacheAndRoute(self.__WB_MANIFEST);

setDefaultHandler(new NetworkFirst());

const OFFLINE_URL = '/offline.html';

// @ts-ignore
setCatchHandler(async ({event}) => {
    // @ts-ignore
    if (event.request.destination === 'document') {
        return matchPrecache(OFFLINE_URL);
    }

    return Response.error();
});

const CACHE_NAME = 'cache-user';
registerRoute(
    /https:\/\/ya-praktikum.tech\/api\/v2\/auth\/user/,
    new NetworkFirst({
        cacheName: CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
            })
        ]
    })
);
